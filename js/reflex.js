let peutCliquer = false;
let debutTemps;
let pseudo = localStorage.getItem("pseudo") || "inconnu";
let timerID = null;

let scores = JSON.parse(localStorage.getItem("scores") || "{}");
if (!scores.reflex) scores.reflex = {};
if (!scores.reflex[pseudo]) scores.reflex[pseudo] = null;

let best = scores.reflex[pseudo];

document.getElementById("pseudo-affiche").textContent = `Joueur : ${pseudo}`;
document.getElementById("record").textContent = best !== null
  ? `🥇 Meilleur score : ${best} ms`
  : "🥇 Meilleur score : ---";

function setVert() {
  document.getElementById("zone").classList.remove("rouge");
  document.getElementById("zone").classList.add("vert");
  document.getElementById("instructions").textContent = "Clique !";
  debutTemps = Date.now();
  peutCliquer = true;
}

function lancerJeu() {
  peutCliquer = false;
  clearTimeout(timerID);
  document.getElementById("zone").classList.remove("vert");
  document.getElementById("zone").classList.add("rouge");
  document.getElementById("instructions").textContent = "Prépare-toi...";
  document.getElementById("resultat").textContent = "";
  let delai = Math.random() * 3000 + 2000;
  timerID = setTimeout(() => {
    setVert();
  }, delai);
}

function handleClick() {
  if (!peutCliquer && document.getElementById("zone").classList.contains("rouge")) {
    document.getElementById("instructions").textContent = "⛔ Faux départ ! Attends le vert...";
    document.getElementById("resultat").textContent = "";
    setTimeout(lancerJeu, 2000);
    return;
  }

  if (peutCliquer && document.getElementById("zone").classList.contains("vert")) {
    let tempsReaction = Date.now() - debutTemps;
    document.getElementById("resultat").textContent = `⏱ Temps de réaction : ${tempsReaction} ms`;
    peutCliquer = false;

    if (scores.reflex[pseudo] === null || tempsReaction < scores.reflex[pseudo]) {
      scores.reflex[pseudo] = tempsReaction;
      best = tempsReaction;
      localStorage.setItem("scores", JSON.stringify(scores));
    }

    document.getElementById("record").textContent = `🥇 Meilleur score : ${best} ms`;
    setTimeout(lancerJeu, 2500);
  }
}

window.onload = lancerJeu;
