** Fournier Allan
** Projet Final web server avec Pilon Alain 
** 04/09/2023


--------------- énoncé --------------


Ce travail pratique compte pour 30 points de la note finale du cours. Ce travail est à remettre dans Moodle. La date de remise est indiquée dans Moodle. 
Section I : (5 points) Création du projet dans gitHub et Atlas
Commencez par créer un projet privé dans gitHub que vous devez nommer en suivant ces règles : « WEB2_FAM_PFI » où FAM sont les 3 premières lettres de votre nom de famille. Par exemple, pour moi mon projet se nomme WEB2_PIL_PFI.
Ajoutez un fichier README.md pour décrire le projet. Inscrivez un titre et votre nom ensuite vous pouvez copier-coller l’énoncé du travail comme description. Vous devez ajouter un fichier dans votre git pour ignorer les fichiers se trouvant dans les dossiers : « node_modules ». Ajoutez tous les fichiers nécessaires au bon fonctionnement de votre projet dans git et ensuite publiez le tout dans votre projet gitHub (en faisant un push, vous devriez tester que votre projet est bien publié en faisant un git clone dans un autre dossier sur votre ordinateur). Une fois votre travail terminé vous devrez le publier sur un serveur Web gratuit, je vous donnerai les détails un peu plus tard dans le cours.
Assurez-vous de mettre les commentaires appropriés (qui décrivent vos actions) dans tous vos fichiers Node JS. (il n’est pas nécessaire de mettre des commentaires dans les fichiers vues .ejs).
Dans Moodle vous allez me remettre le présent fichier qui va contenir ces informations :
⦁	La commande GitHub afin de « cloner » votre dossier comme ceci : 
git clone https://login:tokenPrivé@github.com/alain-clg/WEB2_PIL_PFI.git
vous devez remplacer login par votre id GitHub et tokenPrivé par votre propre token valide pour au moins 30 jours, par exemple :
git clone https://alain-clg:ghp_EbUOdXCBf6tDY3R@github.com/alain-clg/WEB2_PIL_PFI.git
⦁	URL du site publié comme ceci: https://blablabla.herokuapp.com/
Il sera important dans votre remise de remettre le présent fichier ET un dossier compressé contenant tout votre projet (soit tous les fichiers nécessaires à l’exécution du projet, excluant le dossier node_modules). Ce fichier Word ne doit pas être compressé avec les autres. 
Votre fichier principal pour que je puisse démarrer votre projet doit se nommer « pfi.js » (c’est lui qui sera exécuté lorsque j’utiliserai la commande npm run dev, vous devez modifier votre section scripts du fichier package.json en conséquence). 
Vous devez, ensuite, utilisez une base de données MongoDB dans Atlas que vous allez nommer « web2_PFI ». Ajoutez une collection nommée « usagers ». La collection usagers va contenir les données de connexion des utilisateurs (nom, login, pwd, date inscription) et vous lui ajouterez deux informations (roles qui est un tableau de chaînes de caractères et fichierImage qui est une chaîne de caractères qui correspond au nom du fichier image correspondant à cet usager). Ajoutez une collection nommée « livres » qui va contenir les informations habituelles (que nous avons vu dans le cours précédent, c’est-à-dire, titre, description, auteur, nbPages, edition, langue, prix, url de l’image du livre, etc).

Section II : (25 points) Projet nodeJS d’application Web transactionnelle
Pour cette partie, vous devrez faire un programme en vous servant des fichiers et exemples que j’ai fait pendant le cours. Il s’agit d’écrire un programme qui démarre un serveur Web afin de réaliser une application complète de gestion de notre collection de livres et d’usagers.

Votre serveur Web doit écouter sur le port 8000 et afficher la page d’accueil permettant de se connecter au programme. La page d’accueil redirige le lecteur sur la page d’identification de l’usager (la page login). Une fois identifié, il faut afficher le menu du site (la page d’accueil), qui permet à l’usager soit de gérer des utilisateurs (dans la BD) ou de gérer ou d’afficher la collection de livres ou encore de se déconnecter (logout) (la page d’accueil affiche 3 choix). Aucune page Web ne doit s’afficher (autre que login) tant que l’usager ne s’est pas identifié correctement avec un mot de passe valide. Voici la page d’accueil à reproduire :

 

Dans ce travail nous allons ajouter la notion de rôles et nous allons accepter trois rôles distincts, soit ‘normal’, ‘admin’ et ‘gestion’. Tous les utilisateurs auront au moins le rôle normal qui est automatiquement ajouté lors de la création. Vous devez modifier les pages de gestions des usagers afin d’y inclure cette nouvelle donnée, les rôles (dans des checkbox). De plus, nous allons inclure une image qui peut être téléversée dans le profil de chaque usager. Il faut permettre d’ajouter et de modifier le rôle et l’image de profil en plus des autres informations des usagers.

La gestion des usagers n’est disponible qu’aux utilisateurs possédant le rôle ‘admin’. Toutes les pages de la section gestion des usagers ne doivent être accessibles qu’aux utilisateurs possédant ce rôle. 

Pour ce qui est du 2e choix du menu « Affichage/Gestion des livres », il permet d’afficher le contenu de la collection livres pour tous les utilisateurs (dans une liste). Les options de gestion des livres ne seront accessibles qu’aux usagers qui possèdent le rôle ‘gestion’. Il faudra donc afficher les livres à tout le monde et permettre de modifier le contenu seulement si l’utilisateur possède le rôle ‘gestion’ (ajout, suppression, modification). Il faut aussi afficher dans une balise img le contenu de url_image de la collection livres. Vous n’avez pas à valider que le fichier image est disponible sur l’URL (juste l’afficher). Vous devriez l’afficher en miniature sur la liste des livres et en plus gros lors de l’affichage des détails. (il faut permettre de changer l’URL lors de la modification d’un livre). Attention, les images des livres ne sont pas enregistrées dans votre application, il s’agit seulement d’un URL.

L’affichage et la conception des pages de gestion des usagers (de même que pour les livres) est laissé à votre discrétion. Vous devez permettre l’affichage, l’ajout, la modification et la suppression des usagers. J’imagine très bien une liste des usagers avec des boutons pour modifier et supprimer (avec confirmation). Utilisez votre imagination, bootstrap et « fontawesome » pour afficher d’élégants boutons. Lors de la modification d’un usager, il faut permettre de modifier le nom, le courriel et les rôles directement, alors que pour modifier l’image et le mot de passe il faut cliquer sur un bouton (un pour l’image et l’autre pour le mot de passe) qui ouvre une nouvelle page spécifiquement pour soit l’image ou soit le mot de passe.

Naturellement la section route est le point central de votre application Web, car tout se décide dans cette section. Voici les routes que vous devriez avoir :
⦁	GET « /usagers/login » pour la page de connexion (authentification)
⦁	GET de la page d’accueil qui va accepter « / » ou « /index » ou encore « /index.html »
⦁	GET « /usagers/logout » pour déconnecter l’usager
⦁	GET « /usagers/menu » (afin d’afficher une liste des usagers)
⦁	GET « /usagers/editer » (afin d’afficher un usager pour le modifier)
⦁	GET « /usagers/editerImage » (afin de remplacer l’image de profil d’un usager)
⦁	GET « /usagers/editerPWD » (afin de modifier le mot de passe d’un usager)
⦁	GET « /usagers/ajouter » (afin d’afficher un usager pour l’ajouter dans la BD)
⦁	GET « /usagers/supprimer » (afin d’afficher un usager pour confirmer la suppression)
⦁	GET de la page des livres « /livres/ » (afin d’afficher la liste des livres)
⦁	GET « /livres/editer » (afin d’afficher un livre pour le modifier)
⦁	GET « /livres/ajouter » (afin d’afficher un livre pour l’ajouter dans la BD)
⦁	GET « /livres/supprimer » (afin d’afficher un livre pour confirmer la suppression)
⦁	Sans oublier les routes POST envoyer à partir des différents formulaires

Aucune de ces pages (sauf login) ne devraient être accessibles si l’utilisateur n’est pas authentifié. Les sections qui se ressemblent d’une page à l’autre devraient se retrouver dans un « layout partiel » (comme par exemple, l’affichage d’un usager pour l’ajout ou encore pour le modifier). Vous pouvez ajouter d’autres routes selon vos besoins, mais les routes identifiées ci-dessus sont obligatoires.

Votre application doit être facile à utiliser et vous devez soigner la présentation. Lors de la remise du travail vous devrez faire une présentation de l’exécution de votre travail au professeur. De façon à ce que je puisse me connecter à votre application vous devez me créer un utilisateur dans votre BD qui se nomme ‘Alain Pilon’ et utilise un email ‘alain@gmail.com’ et mot de passe ‘alain9’ (et possède les privilèges : admin, normal et gestion).
