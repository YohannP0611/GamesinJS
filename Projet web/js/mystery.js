const pseudo = localStorage.getItem("pseudo") || "inconnu";
document.getElementById("pseudo-affiche").textContent = `Joueur : ${pseudo}`;

let scores = JSON.parse(localStorage.getItem("scores") || "{}");
if (!scores.mystery) scores.mystery = {};
let best = scores.mystery[pseudo] || null;
if (best !== null) {
  document.getElementById("meilleur-score").textContent = `🥇 Meilleur score : ${best} tentatives`;
}

let secret = Math.floor(Math.random() * 100) + 1;
let tentatives = 0;

function tester() {
  const saisie = parseInt(document.getElementById("guess").value);
  if (isNaN(saisie) || saisie < 1 || saisie > 100) return;

  tentatives++;
  document.getElementById("tentatives").textContent = `Tentatives : ${tentatives}`;

  if (saisie < secret) {
    document.getElementById("feedback").textContent = "🔽 Trop petit !";
  } else if (saisie > secret) {
    document.getElementById("feedback").textContent = "🔼 Trop grand !";
  } else {
    document.getElementById("feedback").textContent = `🎉 Bravo ! Le nombre était ${secret}`;

    if (best === null || tentatives < best) {
      best = tentatives;
      scores.mystery[pseudo] = best;
      localStorage.setItem("scores", JSON.stringify(scores));
      document.getElementById("meilleur-score").textContent = `🥇 Nouveau record : ${best} tentatives`;
    }

    secret = Math.floor(Math.random() * 100) + 1;
    tentatives = 0;
    document.getElementById("tentatives").textContent = `Tentatives : 0`;
  }

  document.getElementById("guess").value = "";
}
