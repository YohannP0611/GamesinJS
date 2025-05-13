let peutCliquer = false;
let debutTemps;
let pseudo = localStorage.getItem("pseudo") || "inconnu";
let timerID = null;

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
  document.getElementById("record").textContent = "";
  let delai = Math.random() * 3000 + 2000;
  timerID = setTimeout(() => {
    setVert();
  }, delai);
}

function handleClick() {
  if (!peutCliquer && document.getElementById("zone").classList.contains("rouge")) {
    document.getElementById("instructions").textContent = "⛔ Faux départ ! Attends le vert...";
    document.getElementById("resultat").textContent = "";
    document.getElementById("record").textContent = "";
    setTimeout(lancerJeu, 2000);
    return;
  }

  if (peutCliquer && document.getElementById("zone").classList.contains("vert")) {
    let tempsReaction = Date.now() - debutTemps;
    document.getElementById("resultat").textContent = `⏱ Temps de réaction : ${tempsReaction} ms`;
    peutCliquer = false;
    let scores = JSON.parse(localStorage.getItem("scores") || "{}");
    if (!scores.reflex) scores.reflex = {};
    if (!scores.reflex[pseudo] || tempsReaction < scores.reflex[pseudo]) {
      scores.reflex[pseudo] = tempsReaction;
      document.getElementById("record").textContent = "🥇 Nouveau record !";
    } else {
      document.getElementById("record").textContent = `🏆 Meilleur score : ${scores.reflex[pseudo]} ms`;
    }
    localStorage.setItem("scores", JSON.stringify(scores));
    setTimeout(lancerJeu, 2500);
  }
}

window.onload = lancerJeu;
