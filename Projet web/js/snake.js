const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");
const box = 20;
const width = canvas.width / box;
const height = canvas.height / box;

const pseudo = localStorage.getItem("pseudo") || "inconnu";
document.getElementById("pseudo-affiche").textContent = `Joueur : ${pseudo}`;

let scores = JSON.parse(localStorage.getItem("scores") || "{}");
if (!scores.snake) scores.snake = {};
let best = scores.snake[pseudo] || 0;
document.getElementById("meilleur-score").textContent = `🥇 Meilleur score : ${best}`;

let direction = "RIGHT";
let snake;
let food;
let score;
let gameInterval;

function initGame() {
  direction = "RIGHT";
  snake = [{ x: 10, y: 10 }];
  food = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height)
  };
  score = 0;
  document.getElementById("score").textContent = `Score : ${score}`;
}

function changerDirection(e) {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#4caf50" : "#81c784";
    ctx.fillRect(snake[i].x * box, snake[i].y * box, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * box, food.y * box, box, box);

  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "LEFT") head.x--;
  if (direction === "RIGHT") head.x++;
  if (direction === "UP") head.y--;
  if (direction === "DOWN") head.y++;

  if (
    head.x < 0 || head.x >= width ||
    head.y < 0 || head.y >= height ||
    collision(head, snake)
  ) {
    gameOver();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = `Score : ${score}`;
    food = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function collision(tete, corps) {
  for (let i = 0; i < corps.length; i++) {
    if (tete.x === corps[i].x && tete.y === corps[i].y) return true;
  }
  return false;
}

function gameOver() {
  clearInterval(gameInterval);

  if (score > best) {
    best = score;
    scores.snake[pseudo] = best;
    localStorage.setItem("scores", JSON.stringify(scores));
    document.getElementById("meilleur-score").textContent = `🥇 Nouveau record : ${best}`;
  }

  setTimeout(() => {
    initGame();
    gameInterval = setInterval(draw, 150);
  }, 1000);
}

document.addEventListener("keydown", changerDirection);

initGame();
gameInterval = setInterval(draw, 150);
