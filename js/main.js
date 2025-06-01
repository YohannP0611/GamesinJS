function savePseudo() {
  const pseudo = document.getElementById('pseudo-input').value.trim();
  const message = document.getElementById('message');

  if (pseudo === "") {
    message.textContent = "⚠️ Veuillez entrer un pseudo.";
    return;
  }

  localStorage.setItem("pseudo", pseudo);
  afficherBienvenue(pseudo);
}

function afficherBienvenue(pseudo) {
  document.getElementById("pseudo-form").style.display = "none";
  document.getElementById("jeux").style.display = "block";
  document.getElementById("message-bienvenue").textContent = `Bienvenue, ${pseudo} ! Choisissez un jeu.`;
}

window.onload = () => {
  const pseudo = localStorage.getItem("pseudo");
  if (pseudo) {
    afficherBienvenue(pseudo);
  }
};
