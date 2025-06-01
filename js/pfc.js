const pseudo = localStorage.getItem("pseudo") || "inconnu";
document.getElementById("pseudo-affiche").textContent = `Joueur : ${pseudo}`;

let score = 0;
let scores = JSON.parse(localStorage.getItem("scores") || "{}");
if (!scores.pfc) scores.pfc = {};

if (!scores.pfc[pseudo]) {
  scores.pfc[pseudo] = 0;
}
document.getElementById("meilleur-score").textContent = `🥇 Meilleur score : ${scores.pfc[pseudo]}`;

function jouer(joueur) {
  const options = ["pierre", "feuille", "ciseaux"];
  const ordi = options[Math.floor(Math.random() * 3)];

  document.getElementById("choix-ordi").textContent = `L'ordi a choisi : ${ordi}`;

  if (joueur === ordi) {
    document.getElementById("resultat").textContent = "Égalité !";
  } else if (
    (joueur === "pierre" && ordi === "ciseaux") ||
    (joueur === "feuille" && ordi === "pierre") ||
    (joueur === "ciseaux" && ordi === "feuille")
  ) {
    document.getElementById("resultat").textContent = "✅ Gagné !";
    score++;
  } else {
    document.getElementById("resultat").textContent = "❌ Perdu !";
    score = 0;
  }

  document.getElementById("score-actuel").textContent = `Score actuel : ${score}`;

  if (score > scores.pfc[pseudo]) {
    scores.pfc[pseudo] = score;
    document.getElementById("meilleur-score").textContent = `🥇 Nouveau record ! Score : ${score}`;
    localStorage.setItem("scores", JSON.stringify(scores));
  }
}
