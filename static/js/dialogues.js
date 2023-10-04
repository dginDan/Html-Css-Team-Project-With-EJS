//Setup des dialogues avec les NPCs
const boutonBartender = document.getElementById('boutonBartender');
const bartenderDialogue = document.getElementById('bartenderDialogue');
const boutonMysteryMan = document.getElementById('boutonMysteryMan');
const mysteryManDialogue = document.getElementById('mysteryManDialogue');


const bartenderDialogues = [
    "Bartender: Une tite bière mon Pierre?",
    "Bartender: Si tu vas magasiner des potions, tu peux récupérer des points de vie!",
    "Bartender: Plus ton arme vaut cher, plus t'es puissant! ...Naturellement",
    "Bartender: Il y a une rumeur qu'un trésor incroyable peut être obtenu lors d'une victoire contre un Roi Slime...",
    "Bartender: C'est tout... J'ai tout dis. Scram!",
    "Bartender: Arrête de me faire perdre mon temps, j'ai du travail à faire et d'la bière à servir!",
    "Bartender: SCRAM!",
    "Bartender: AAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!!!!"
];

const mysteryManDialogues = [
    "Mysterious Man: Je suis l'homme mystérieux!",
    "Mysterious Man: Très mystérieux!",
    "Mysterious Man: ...",
    "Mysterious Man: ...",
    "Mysterious Man: J'ai exercé mes fonctions! Laisse moi tranquille!"
];


//initialization du dialogue à la position 0 du tableau
let indexDialogueBartender = 0;
//On click du bouton, on affiche le text et commence le dialogue. On incrémente la position dans le tableau avec indexDialogue += 1
boutonBartender.addEventListener('click', ()=> {
    const prochainDialogue = bartenderDialogues[indexDialogueBartender];

    bartenderDialogue.textContent = prochainDialogue;
    indexDialogueBartender += 1;
    bartenderDialogue.classList.remove('hiddenBartender');
});


//initialization du dialogue à la position 0 du tableau
let indexDialogueMysteryMan = 0;
//On click du bouton, on affiche le text et commence le dialogue. On incrémente la position dans le tableau avec indexDialogue += 1
boutonMysteryMan.addEventListener('click', ()=>{
    const prochainDialogue = mysteryManDialogues[indexDialogueMysteryMan];

    mysteryManDialogue.textContent = prochainDialogue;
    indexDialogueMysteryMan += 1;
    mysteryManDialogue.classList.remove('hiddenMysteryMan');
})