const pseudo = localStorage.getItem("pseudo") || "inconnu";
document.getElementById("pseudo-affiche").textContent = `Joueur : ${pseudo}`;

let questions = [
  {
    q: "Combien font 2 + 2 ?",
    options: ["4", "22", "Poisson"],
    answer: "4"
  },
  {
    q: "Quelle est la capitale de l’Internet ?",
    options: ["Google", "Wi-Fi", "C'est une question piège"],
    answer: "C'est une question piège"
  },
  {
    q: "Quel est l’animal le plus rapide au monde ?",
    options: ["Le guépard", "Le pigeon de Paris à midi", "Flash McQueen"],
    answer: "Flash McQueen"
  },
  {
    q: "Si tu as 0 pommes et que tu en manges une, tu as ?",
    options: ["Des problèmes", "Faim", "Une pomme imaginaire"],
    answer: "Des problèmes"
  },
  {
    q: "Pourquoi la vie ?",
    options: ["42", "Parce que", "On sait pas"],
    answer: "42"
  }
];


let index = 0;
let score = 0;

let scores = JSON.parse(localStorage.getItem("scores") || "{}");
if (!scores.quiz) scores.quiz = {};
if (!scores.quiz[pseudo]) scores.quiz[pseudo] = 0;
document.getElementById("meilleur-score").textContent = `🥇 Meilleur score : ${scores.quiz[pseudo]}/5`;

function afficherQuestion() {
  if (index >= questions.length) {
    document.getElementById("question").textContent = `Quiz terminé ! Score : ${score}/5`;
    document.getElementById("choix").innerHTML = "";
    document.getElementById("resultat").textContent = "";

    if (score > scores.quiz[pseudo]) {
      scores.quiz[pseudo] = score;
      localStorage.setItem("scores", JSON.stringify(scores));
      document.getElementById("meilleur-score").textContent = `🥇 Nouveau record : ${score}/5`;
    }
    return;
  }

  const q = questions[index];
  document.getElementById("question").textContent = q.q;
  const choix = document.getElementById("choix");
  choix.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => verifierReponse(option);
    choix.appendChild(btn);
  });
}

function verifierReponse(reponse) {
  const bonne = questions[index].answer;
  document.getElementById("resultat").textContent = reponse === bonne ? "✅ Bonne réponse" : `❌ Mauvaise réponse (Bonne : ${bonne})`;
  if (reponse === bonne) score++;
  index++;
  setTimeout(afficherQuestion, 1000);
}

window.onload = afficherQuestion;
