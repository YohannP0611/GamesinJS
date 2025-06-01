const pseudo = localStorage.getItem("pseudo") || "inconnu";
document.getElementById("pseudo-affiche").textContent = `Joueur : ${pseudo}`;

let scores = JSON.parse(localStorage.getItem("scores") || "{}");
if (!scores["reflex-trap"]) scores["reflex-trap"] = {};
if (!scores["reflex-trap"][pseudo]) scores["reflex-trap"][pseudo] = null;

let best = scores["reflex-trap"][pseudo];
document.getElementById("best-time").textContent = best !== null
  ? `🥇 Meilleur score : ${best} ms`
  : "🥇 Meilleur score : ---";

let zone = document.getElementById("zone");
let etat = "gris";
let debutVert = 0;
let timerID = null;

function lancerCycle() {
  etat = "gris";
  zone.className = "zone gris";

  const attenteAvantChangement = Math.random() * 3000 + 1500;
  timerID = setTimeout(() => {
    const estVert = Math.random() < 0.4;

    if (estVert) {
      etat = "vert";
      zone.className = "zone vert";
      debutVert = Date.now();
    } else {
      etat = "rouge";
      zone.className = "zone rouge";
      setTimeout(() => {
        lancerCycle();
      }, 1500);
    }
  }, attenteAvantChangement);
}

function handleClick() {
  if (etat !== "vert") return;

  const reaction = Date.now() - debutVert;
  document.getElementById("last-time").textContent = `⏱ Temps de réaction : ${reaction} ms`;

  if (best === null || reaction < best) {
    best = reaction;
    scores["reflex-trap"][pseudo] = best;
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  document.getElementById("best-time").textContent = `🥇 Meilleur score : ${best} ms`;

  etat = "gris";
  zone.className = "zone gris";
  setTimeout(lancerCycle, 1000);
}

window.onload = lancerCycle;
