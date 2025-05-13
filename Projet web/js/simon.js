const pseudo = localStorage.getItem("pseudo") || "inconnu";
document.getElementById("pseudo-affiche").textContent = `Joueur : ${pseudo}`;

let scores = JSON.parse(localStorage.getItem("scores") || "{}");
if (!scores.simon) scores.simon = {};
let best = scores.simon[pseudo] || 0;
document.getElementById("meilleur-score").textContent = `🥇 Meilleur score : ${best}`;

const grille = document.getElementById("grille-simon");
const info = document.getElementById("info");
const scoreAff = document.getElementById("score");

let sequence = [];
let joueur = [];
let nbCases = 36;
let attente = false;
let score = 0;

for (let i = 0; i < nbCases; i++) {
  const div = document.createElement("div");
  div.classList.add("case-simon");
  div.dataset.index = i;
  div.addEventListener("click", () => handleClick(i));
  grille.appendChild(div);
}

function clignoter(index, erreur = false) {
  const el = document.querySelector(`.case-simon[data-index='${index}']`);
  el.classList.add(erreur ? "error" : "active");
  setTimeout(() => el.classList.remove("active", "error"), 500);
}

function jouerSequence() {
  attente = true;
  joueur = [];
  let i = 0;
  info.textContent = "Regarde la séquence...";
  const interval = setInterval(() => {
    if (i >= sequence.length) {
      clearInterval(interval);
      attente = false;
      info.textContent = "À toi de jouer !";
      return;
    }
    clignoter(sequence[i]);
    i++;
  }, 600);
}

function ajouterEtJouer() {
  const rand = Math.floor(Math.random() * nbCases);
  sequence.push(rand);
  jouerSequence();
}

function handleClick(index) {
  if (attente) return;
  joueur.push(index);
  clignoter(index);

  const pos = joueur.length - 1;
  if (index !== sequence[pos]) {
    clignoter(index, true);
    info.textContent = "❌ Raté ! Séquence perdue.";
    score = 0;
    sequence = [];
    joueur = [];
    setTimeout(ajouterEtJouer, 1500);
    return;
  }

  if (joueur.length === sequence.length) {
    score++;
    scoreAff.textContent = `Score : ${score}`;
    if (score > best) {
      scores.simon[pseudo] = score;
      localStorage.setItem("scores", JSON.stringify(scores));
      document.getElementById("meilleur-score").textContent = `🥇 Nouveau record : ${score}`;
    }
    setTimeout(ajouterEtJouer, 1000);
  }
}

ajouterEtJouer();
