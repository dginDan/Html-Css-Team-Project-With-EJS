//Setup des dialogues avec les NPCs
const boutonBartenderFr = document.getElementById('boutonBartenderFr');
const boutonMysteryManFr = document.getElementById('boutonMysteryManFr');
const bartenderDialogue = document.getElementById('bartenderDialogue');
const mysteryManDialogue = document.getElementById('mysteryManDialogue');




const bartenderDialoguesFr = [
    "Bartender: Une tite bière mon Pierre?",
    "Bartender: Si tu vas magasiner des potions, tu peux récupérer des points de vie!",
    "Bartender: Plus ton arme vaut cher, plus t'es puissant! ...Naturellement",
    "Bartender: Il y a une rumeur qu'un trésor incroyable peut être obtenu lors d'une victoire contre un Roi Slime...",
    "Bartender: C'est tout... J'ai tout dis. Scram!",
    "Bartender: Arrête de me faire perdre mon temps, j'ai du travail à faire et d'la bière à servir!",
    "Bartender: SCRAM!",
    "Bartender: AAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!!!!"
];

const mysteryManDialoguesFr = [
    "Mysterious Man: Je suis l'homme mystérieux!",
    "Mysterious Man: Très mystérieux!",
    "Mysterious Man: ...",
    "Mysterious Man: ...",
    "Mysterious Man: J'ai exercé mes fonctions! Laisse moi tranquille!"
];




//initialization du dialogue à la position 0 du tableau
let indexDialogueBartenderFr = 0;
//On click du bouton, on affiche le text et commence le dialogue. On incrémente la position dans le tableau avec indexDialogue += 1
boutonBartenderFr.addEventListener('click', ()=> {
    const prochainDialogue = bartenderDialoguesFr[indexDialogueBartenderFr];
    bartenderDialogue.textContent = prochainDialogue;
    indexDialogueBartenderFr += 1;
    bartenderDialogue.classList.add('bartenderTextPadding');
    bartenderDialogue.classList.remove('hiddenBartender');
    if (indexDialogueBartenderFr > bartenderDialoguesFr.length){
        bartenderDialogue.classList.remove('bartenderTextPadding');
    }
});

//initialization du dialogue à la position 0 du tableau
let indexDialogueMysteryManFr = 0;
//On click du bouton, on affiche le text et commence le dialogue. On incrémente la position dans le tableau avec indexDialogue += 1
boutonMysteryManFr.addEventListener('click', ()=>{
    const prochainDialogue = mysteryManDialoguesFr[indexDialogueMysteryManFr];
    mysteryManDialogue.textContent = prochainDialogue;
    indexDialogueMysteryManFr += 1;
    mysteryManDialogue.classList.add('mysteryManTextPadding');
    mysteryManDialogue.classList.remove('hiddenMysteryMan');
    if (indexDialogueMysteryManFr > mysteryManDialoguesFr.length){
        mysteryManDialogue.classList.remove('mysteryManTextPadding');
    }
});



