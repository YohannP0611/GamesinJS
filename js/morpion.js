const pseudo = localStorage.getItem("pseudo") || "inconnu";
document.getElementById("pseudo-affiche").textContent = `Joueur : ${pseudo}`;

const grille = document.getElementById("grille-morpion");
const etat = document.getElementById("etat-jeu");

let cases = Array(9).fill("");
let joueur = "🟦";
let ordi = "🟥";
let bloque = false;

function dessinerGrille() {
  grille.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const c = document.createElement("div");
    c.classList.add("case-ttt");
    c.dataset.index = i;
    c.textContent = cases[i];
    c.onclick = () => jouer(i);
    grille.appendChild(c);
  }
}

function jouer(index) {
  if (cases[index] || bloque) return;

  cases[index] = joueur;
  dessinerGrille();

  if (verifierGagnant(joueur)) {
    etat.textContent = "🎉 Tu as gagné !";
    bloque = true;
    setTimeout(reinit, 2000);
    return;
  }

  if (cases.every(c => c)) {
    etat.textContent = "🤝 Égalité.";
    bloque = true;
    setTimeout(reinit, 2000);
    return;
  }

  bloque = true; // on bloque les clics du joueur

  setTimeout(() => {
    jouerOrdi();
  }, 500);
}

function jouerOrdi() {
  let coup = trouverCoupGagnant(ordi);
  if (coup !== null) {
    cases[coup] = ordi;
    return finTour();
  }

  coup = trouverCoupGagnant(joueur);
  if (coup !== null) {
    cases[coup] = ordi;
    return finTour();
  }

  if (cases[4] === "") {
    cases[4] = ordi;
    return finTour();
  }

  let vides = cases.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  if (vides.length === 0) return;
  let choix = vides[Math.floor(Math.random() * vides.length)];
  cases[choix] = ordi;
  finTour();
}

function trouverCoupGagnant(symbole) {
  const lignes = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let ligne of lignes) {
    const [a, b, c] = ligne;
    const valeurs = [cases[a], cases[b], cases[c]];
    const vides = ligne.filter(i => cases[i] === "");
    const nbSymbole = valeurs.filter(v => v === symbole).length;

    if (nbSymbole === 2 && vides.length === 1) {
      return vides[0];
    }
  }
  return null;
}

function finTour() {
  dessinerGrille();
  if (verifierGagnant(ordi)) {
    etat.textContent = "💀 L'ordi a gagné !";
    bloque = true;
    setTimeout(reinit, 2000);
  } else if (cases.every(c => c)) {
    etat.textContent = "🤝 Égalité.";
    bloque = true;
    setTimeout(reinit, 2000);
  } else {
    bloque = false; // maintenant le joueur peut rejouer
  }
}

function verifierGagnant(symbole) {
  const lignes = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return lignes.some(combi => combi.every(i => cases[i] === symbole));
}

function reinit() {
  cases = Array(9).fill("");
  bloque = false;
  etat.textContent = "";
  dessinerGrille();
}

dessinerGrille();
