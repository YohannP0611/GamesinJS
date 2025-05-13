const pseudo = localStorage.getItem("pseudo") || "inconnu";
document.getElementById("pseudo-affiche").textContent = `Joueur : ${pseudo}`;

let scores = JSON.parse(localStorage.getItem("scores") || "{}");
if (!scores["game2048"]) scores["game2048"] = {};
let best = scores["game2048"][pseudo] || 0;
document.getElementById("meilleur-score").textContent = `🥇 Meilleur score : ${best}`;

const grille = document.getElementById("grille-2048");
let score = 0;
let cases = [];

function creerGrille() {
  score = 0;
  cases = Array(4).fill().map(() => Array(4).fill(0));
  ajouterNouvelleCase();
  ajouterNouvelleCase();
  afficherGrille();
  document.getElementById("score").textContent = `Score : 0`;
}

function ajouterNouvelleCase() {
  let vides = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (cases[i][j] === 0) vides.push({ i, j });
    }
  }
  if (vides.length === 0) return;
  const choix = vides[Math.floor(Math.random() * vides.length)];
  cases[choix.i][choix.j] = Math.random() < 0.9 ? 2 : 4;
}

function afficherGrille() {
  grille.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const val = cases[i][j];
      const div = document.createElement("div");
      div.classList.add("case-2048");
      if (val !== 0) {
        div.textContent = val;
        div.setAttribute("data-val", val);
      }
      grille.appendChild(div);
    }
  }
  document.getElementById("score").textContent = `Score : ${score}`;
}

function fusionnerLigne(ligne) {
  ligne = ligne.filter(v => v !== 0);
  for (let i = 0; i < ligne.length - 1; i++) {
    if (ligne[i] === ligne[i + 1]) {
      ligne[i] *= 2;
      score += ligne[i];
      ligne[i + 1] = 0;
    }
  }
  return ligne.filter(v => v !== 0);
}

function bouger(direction) {
  let moved = false;

  for (let i = 0; i < 4; i++) {
    let ligne;
    if (direction === "gauche") {
      ligne = fusionnerLigne(cases[i]);
      while (ligne.length < 4) ligne.push(0);
      if (!arraysEqual(cases[i], ligne)) moved = true;
      cases[i] = ligne;
    } else if (direction === "droite") {
      ligne = fusionnerLigne(cases[i].slice().reverse());
      while (ligne.length < 4) ligne.push(0);
      ligne.reverse();
      if (!arraysEqual(cases[i], ligne)) moved = true;
      cases[i] = ligne;
    } else if (direction === "haut" || direction === "bas") {
      let colonne = [];
      for (let j = 0; j < 4; j++) colonne.push(cases[j][i]);
      if (direction === "bas") colonne.reverse();
      colonne = fusionnerLigne(colonne);
      while (colonne.length < 4) colonne.push(0);
      if (direction === "bas") colonne.reverse();
      for (let j = 0; j < 4; j++) {
        if (cases[j][i] !== colonne[j]) moved = true;
        cases[j][i] = colonne[j];
      }
    }
  }

  if (moved) {
    ajouterNouvelleCase();
    afficherGrille();
    if (score > best) {
      best = score;
      scores["game2048"][pseudo] = best;
      localStorage.setItem("scores", JSON.stringify(scores));
      document.getElementById("meilleur-score").textContent = `🥇 Nouveau record : ${best}`;
    }
    if (jeuFini()) {
      document.getElementById("score").textContent += " — Partie terminée";
      setTimeout(creerGrille, 1500);
    }
  }
}

function jeuFini() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (cases[i][j] === 0) return false;
      if (j < 3 && cases[i][j] === cases[i][j + 1]) return false;
      if (i < 3 && cases[i][j] === cases[i + 1][j]) return false;
    }
  }
  return true;
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") bouger("gauche");
  else if (e.key === "ArrowRight") bouger("droite");
  else if (e.key === "ArrowUp") bouger("haut");
  else if (e.key === "ArrowDown") bouger("bas");
});

creerGrille();
