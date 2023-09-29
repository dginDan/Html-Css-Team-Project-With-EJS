document.addEventListener("DOMContentLoaded", function() {
    const continueButton = document.getElementById("continueButton");
    const chosenClassInput = document.getElementById("chosenClass");

    // Ajoute des écouteurs d'événements click aux boutons de classe
    document.querySelectorAll('.class-button').forEach((button) => {
        button.addEventListener('click', function(e) {
            // Gère la classe CSS pour montrer la sélection
            selectClass(e.target.id);

            // Définit la classe choisie dans l'input caché
            const chosenClass = e.target.id;
            chosenClassInput.value = chosenClass;
        });
    });

    // Empêche la soumission du formulaire si aucune classe n'est choisie
    continueButton.addEventListener('click', function(event) {
        if (!chosenClassInput.value) {
            alert("Veuillez choisir une classe avant de continuer.");
            event.preventDefault();
        }
    });

    // Fonction pour gérer la classe CSS lors de la sélection d'un bouton
    function selectClass(selectedClass) {
        // Retire la classe 'class-button-selected' de tous les boutons
        document.querySelectorAll('.class-button').forEach(function(button) {
            button.classList.remove('class-button-selected');
        });

        // Ajoute la classe 'class-button-selected' au bouton cliqué
        document.getElementById(selectedClass).classList.add('class-button-selected');
    }
});
