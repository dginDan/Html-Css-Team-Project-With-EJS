const boutonBartenderEn = document.getElementById('boutonBartenderEn');
const boutonMysteryManEn = document.getElementById('boutonMysteryManEn');
const bartenderDialogue = document.getElementById('bartenderDialogue');
const mysteryManDialogue = document.getElementById('mysteryManDialogue');

const bartenderDialoguesEn = [
    "Bartender: Whaddaya want, scumbucket?",
    "Bartender: Go buy potions if you need extra bonuses",
    "Bartender: The stronger the weapon, the higher the damage output! ...Obviously.",
    "Bartender: There's a rumor that a king slime can bring riches...",
    "Bartender: I've said enough. Go away if you're not gonna drink!",
    "Bartender: You're wasting my time! Go play with horses or something!",
    "Bartender: LEAVE ME ALONE",
    "Bartender: AAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!!!!"
];

const mysteryManDialoguesEn = [
    "Mysterious Man: I am the mysterious man!",
    "Mysterious Man: Very mysterious!!",
    "Mysterious Man: ...",
    "Mysterious Man: ...",
    "Mysterious Man: I've completed my function, now leave me alone"
];

let indexDialogueBartenderEn = 0;
//On click du bouton, on affiche le text et commence le dialogue. On incrémente la position dans le tableau avec indexDialogue += 1
boutonBartenderEn.addEventListener('click', ()=> {
    const prochainDialogue = bartenderDialoguesEn[indexDialogueBartenderEn];
    bartenderDialogue.textContent = prochainDialogue;
    indexDialogueBartenderEn += 1;
    bartenderDialogue.classList.add('bartenderTextPadding');
    bartenderDialogue.classList.remove('hiddenBartender');
    if (indexDialogueBartenderEn > bartenderDialoguesEn.length){
        bartenderDialogue.classList.remove('bartenderTextPadding');
    }
});

//initialization du dialogue à la position 0 du tableau
let indexDialogueMysteryManEn = 0;
//On click du bouton, on affiche le text et commence le dialogue. On incrémente la position dans le tableau avec indexDialogue += 1
boutonMysteryManEn.addEventListener('click', ()=>{
    const prochainDialogue = mysteryManDialoguesEn[indexDialogueMysteryManEn];
    mysteryManDialogue.textContent = prochainDialogue;
    indexDialogueMysteryManEn += 1;
    mysteryManDialogue.classList.add('mysteryManTextPadding');
    mysteryManDialogue.classList.remove('hiddenMysteryMan');
    if (indexDialogueMysteryManEn > mysteryManDialoguesEn.length){
        mysteryManDialogue.classList.remove('mysteryManTextPadding');
    }
})