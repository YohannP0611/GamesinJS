const pseudo = localStorage.getItem("pseudo") || "inconnu";
document.getElementById("pseudo-affiche").textContent = `Joueur : ${pseudo}`;

let scores = JSON.parse(localStorage.getItem("scores") || "{}");
if (!scores.click10) scores.click10 = {};
let best = scores.click10[pseudo] || 0;
document.getElementById("meilleur-score").textContent = `🥇 Meilleur score : ${best} clics`;

let temps = 10;
let score = 0;
let jeuEnCours = false;
let intervalID = null;

function gererClic() {
  if (!jeuEnCours) {
    lancerChrono();
    jeuEnCours = true;
  }
  score++;
  document.getElementById("score").textContent = `Score : ${score}`;
}

function lancerChrono() {
  intervalID = setInterval(() => {
    temps--;
    document.getElementById("timer").textContent = `Temps restant : ${temps} s`;

    if (temps === 0) {
      clearInterval(intervalID);
      jeuEnCours = false;
      document.getElementById("info").textContent = "⏱ Temps écoulé !";

      if (score > best) {
        scores.click10[pseudo] = score;
        localStorage.setItem("scores", JSON.stringify(scores));
        document.getElementById("meilleur-score").textContent = `🥇 Nouveau record : ${score} clics`;
      }

      document.getElementById("zone-clic").disabled = true;
      setTimeout(() => location.reload(), 3000);
    }
  }, 1000);
}
