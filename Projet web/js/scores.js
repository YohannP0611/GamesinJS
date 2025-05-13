const scores = JSON.parse(localStorage.getItem("scores") || "{}");
const pseudo = localStorage.getItem("pseudo") || "inconnu";
const tbody = document.querySelector("#table-scores tbody");
document.getElementById("pseudo-affiche").textContent = `Scores de : ${pseudo}`;

const jeux = [
  "pfc", "quiz", "simon", "reflex", "click10",
  "reflex-trap", "mystery", "game2048", "snake", "tictactoe"
];

const nomsAffiches = {
  pfc: "Pierre-Feuille-Ciseaux",
  quiz: "Quiz JS",
  simon: "Simon 32",
  reflex: "Réflexes",
  click10: "Clics en 10s",
  "reflex-trap": "Réflexes + Pièges",
  mystery: "Nombre mystère",
  game2048: "2048",
  snake: "Snake",
  tictactoe: "Tic-Tac-Toe"
};

jeux.forEach(jeu => {
  const score = scores[jeu]?.[pseudo];
  if (score !== undefined) {
    const row = document.createElement("tr");
    const tdJeu = document.createElement("td");
    const tdScore = document.createElement("td");
    tdJeu.textContent = nomsAffiches[jeu];
    tdScore.textContent = score;
    row.appendChild(tdJeu);
    row.appendChild(tdScore);
    tbody.appendChild(row);
  }
});

function resetScores() {
  if (confirm("Supprimer tous vos scores ?")) {
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");
    for (let jeu in scores) {
      delete scores[jeu][pseudo];
    }
    localStorage.setItem("scores", JSON.stringify(scores));
    location.reload();
  }
}
