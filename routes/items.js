const express = require('express');
const {isAuthentified} = require('../config/auth');
const Items = require('../models/Items');
const Usagers = require('../models/Usagers');


const router = express.Router();

// Affichage de la page Shop
router.get('/shop', isAuthentified, (requete, reponse) => {
    const userLanguage = requete.session.userLanguage || 'fr';
    const categorie = requete.query.categorie;
    const user = requete.user;
    let query = {};

    if (categorie) {
        query.categorie = categorie;
    }

    Items.find(query).exec()
        .then(items => {
            // Si le panier est vide, affiche simplement la boutique
            if (!requete.session.cart || requete.session.cart.items.length === 0) {
                return Promise.resolve({ items: items, cart: null });
            }

            // Sinon récupérez les détails de chaque item dans le panier
            const itemDetailsPromises = requete.session.cart.items.map(cartItem => {
                return Items.findById(cartItem.itemId).then(item => {
                    cartItem.nom = item.nom;
                    cartItem.prix = item.prix;
                    return cartItem;
                });
            });

            return Promise.all(itemDetailsPromises).then(cartItems => {
                return { items: items, cart: { items: cartItems, total: requete.session.cart.total } };
            });
        })
        .then(data => {
            reponse.render('shop', {
                items: data.items,
                user: user,
                cart: data.cart,
                'translations': reponse.locals.translations[userLanguage],
                'error': requete.query.error
            });
        })
        .catch(err => {
            console.error(err);
            reponse.status(500).send('Erreur lors de la récupération des articles.');
        });
});

router.post('/ajouter-au-panier/:id', isAuthentified, (requete, reponse) => {
    const itemId = requete.params.id;

    // initialise le panier s'il n'existe pas dans la session
    if(!requete.session.cart) {
        requete.session.cart = {
            items: [],
            total: 0
        };
    }

    // Trouve l'item en fonction de l'ID
    Items.findById(itemId)
        .then(item => {
            if(!item) {
                console.error("Article non trouvé pour l'ID:", itemId);
                throw new Error('Article non trouvé');
            }

            // Vérifie si l'item est déjà dans le panier
            const existingItem = requete.session.cart.items.find(i => i.itemId.toString() === itemId);

            if(existingItem) {
                // Augmente simplement la quantité si l'item est déjà dans le panier
                existingItem.quantite += 1;
            } else {
                // Sinon, ajoute un nouvel élément au panier
                requete.session.cart.items.push({
                    itemId: itemId,
                    quantite: 1,
                    nom: item.nom, 
                    prix: item.prix
                });
            }

            // Mets à jour le total du panier
            requete.session.cart.total += item.prix;

            // Sauvegarde le panier dans la session
            requete.session.save(err => {
                if(err) {
                    console.error("Erreur lors de la sauvegarde de la session:", err);
                    return reponse.status(500).send('Erreur lors de la sauvegarde du panier.');
                }
                reponse.redirect('/items/shop');
            });
        })
        .catch(err => {
            console.error(err);
            reponse.status(500).send(err.message);
        });
});

router.post('/acheter-panier', isAuthentified, (requete, reponse) => {
    // Obtenir le panier de la session
    const cart = requete.session.cart;
    if (!cart || cart.items.length === 0) {
        return reponse.redirect('/shop');
    }

    Usagers.findById(requete.user._id)
    .then(user => {
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        // Vérifie si le joueur a suffisamment de gold pour tous les items du panier
        if (user.gold < cart.total) {
            throw new Error('Solde en gold insuffisant');
        }

        // Déduis le coût total des items du solde du joueur
        user.gold -= cart.total;

        // Pour chaque items du panier
        cart.items.forEach(cartItem => {
            // Vérifie si l'item est déjà dans l'inventaire du joueur
            const indexItem = user.inventaire.findIndex(i => i.item && i.item.toString() === cartItem.itemId);

            if (indexItem !== -1) {
                // L'item est déjà dans l'inventaire du joueur, augmente la quantité
                user.inventaire[indexItem].quantite += cartItem.quantite;
            } else {
                // Ajoute le nouvel item à l'inventaire du joueur
                user.inventaire.push({ item: cartItem.itemId, quantite: cartItem.quantite });
            }
        });

        return user.save();
    })
    .then(() => {
        // Réinitialise le panier dans la session après l'achat réussi
        requete.session.cart = { items: [], total: 0 };
        return reponse.redirect('/inventaire');
    })
    .catch(err => {
        console.error(err);
        if (err.message === 'Solde en gold insuffisant') {
            return reponse.redirect('/items/shop?error=gold_insuffisant');
        }
        return reponse.status(500).send(err.message);
    });
});

router.post('/supprimer-du-panier/:id', (requete, reponse) => {
    const itemId = requete.params.id;
    const cart = requete.session.cart;

    const itemIndex = cart.items.findIndex(i => i.itemId === itemId);

    if (itemIndex !== -1) {
        const item = cart.items[itemIndex];
        
        if (item.quantite > 1) {
            item.quantite -= 1;  // Diminue la quantité
            cart.total -= item.prix;  // Met à jour le total
        } else {
            cart.items.splice(itemIndex, 1);  // Supprime l'article du panier si la quantité est 1
            cart.total -= item.prix;  // Met à jour le total
        }

        // Sauvegarde le panier modifié dans la session
        requete.session.cart = cart;
        requete.session.save(err => {
            if (err) {
                console.error("Erreur lors de la sauvegarde de la session:", err);
                return reponse.status(500).send('Erreur lors de la sauvegarde du panier.');
            }
            reponse.redirect('/items/shop');
        });
    } else {
        reponse.redirect('/items/shop');
    }
});

router.post('/supprimer/:id', isAuthentified, (requete, reponse) => {
    const itemId = requete.params.id;

    Usagers.findOne({ email: requete.session.passport.user })
    .then(user => {
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        // Trouve l'item dans l'inventaire du joueur
        const itemEntry = user.inventaire.find(entry => entry.item.toString() === itemId);
        
        if (itemEntry) {
            // Si la quantité est à 1, retire directement l'item de l'inventaire
            if (itemEntry.quantite === 1) {
                const index = user.inventaire.indexOf(itemEntry);
                user.inventaire.splice(index, 1);
            } else {
                // Sinon, réduis simplement la quantité de 1
                itemEntry.quantite -= 1;
            }

            return user.save();
        }
        throw new Error('Item non trouvé dans l\'inventaire');
    })
    .then(() => {
        reponse.redirect('/inventaire');
    })
    .catch(err => {
        console.error(err);
        reponse.status(500).send(err.message);
    });
});

module.exports = router;