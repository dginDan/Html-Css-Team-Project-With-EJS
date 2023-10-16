document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  const continueButton = document.querySelector("#continueButton");

  // Désactive le bouton Continuer initialement
  continueButton.disabled = true;

  form.addEventListener("input", function() {
    const nom = form.querySelector("input[name='nom']").value;
    const email = form.querySelector("input[name='email']").value;
    const password = form.querySelector("input[name='password']").value;
    const password2 = form.querySelector("input[name='password2']").value;
    const image = form.querySelector("input[type='file']").files.length;

    const emailValid = email.includes("@") && email.includes(".");

    let errors = [];

    if (!nom || !email || !password || !password2 || !image) {
        errors.push('Remplir toutes les cases du formulaire');
    }
    if (!emailValid) {
      errors.push('Email invalide');
  }
    if (password !== password2) {
        errors.push('Les mots de passe ne correspondent pas');
    }
    if (password.length < 6) {
        errors.push('Le mot de passe doit avoir au moins 6 caractères');
    }

    if (errors.length === 0) {
        continueButton.disabled = false;
    } else {
        continueButton.disabled = true;
    }
});
    // Cliquez sur le bouton "Continuer" pour passer à l'étape de sélection de classe
    document.querySelector(".btn.btn-primary.btn-block").addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(".card.card-body").style.display = "none";
      document.querySelector("#classChoice").style.display = "block";
    });
  
    // Événement de survol pour les cartes de classe
    const classCards = document.querySelectorAll(".class-card");
    classCards.forEach(card => {
      card.addEventListener("mouseover", function() {
        this.classList.add("hover");
      });
      card.addEventListener("mouseout", function() {
        this.classList.remove("hover");
      });
      card.addEventListener("click", function() {
        classCards.forEach(c => c.classList.remove("selected"));
        this.classList.add("selected");
      });
    });
  
    // Confirmer le choix de classe et soumettre le formulaire
    document.querySelector("#confirmClass").addEventListener("click", function() {
      const selectedClass = document.querySelector(".class-card.selected").id;
      // Ajoutez la classe sélectionnée au formulaire sous forme de champ caché avant de soumettre
      const form = document.querySelector("form");
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "characterClass";
      input.value = selectedClass;
      form.appendChild(input);
      form.submit();
    });
  });
  