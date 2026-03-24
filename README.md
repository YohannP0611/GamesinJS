# 🎮 Mini Jeux JS

A collection of mini-games built with vanilla HTML, CSS, and JavaScript.  
Created by **Valentin DUBRULLE** & **Yohann POUILLIEUTE** — Efrei Paris (2025).

---

## 🕹️ Games

| Game | Description |
|------|-------------|
| **Pierre Feuille Ciseaux** | Classic Rock Paper Scissors against the computer |
| **Quiz JS** | JavaScript knowledge quiz |
| **Simon 32** | Memory game — repeat the colour sequence |
| **Réflexes** | Click the target as fast as possible |
| **Clics en 10s** | Click as many times as you can in 10 seconds |
| **Réflexes + Pièges** | Reflex game with trap colours to avoid |
| **Nombre Mystère** | Guess the mystery number |
| **2048** | Slide tiles to reach the 2048 tile |
| **Snake** | Classic Snake game |
| **Morpion** | Tic-Tac-Toe (two players) |

A **Scoreboard** page lets you view and reset your saved scores.

---

## 🚀 Getting Started

No build step or server is required — the project runs entirely in the browser.

1. Clone the repository:
   ```bash
   git clone https://github.com/YohannP0611/GamesinJS.git
   ```
2. Open `index.html` in your browser.
3. Enter a pseudo (nickname) to unlock the game menu.

---

## 🗂️ Project Structure

```
GamesinJS/
├── index.html          # Home page & game menu
├── pfc.html            # Rock Paper Scissors
├── quiz.html           # Quiz
├── simon.html          # Simon
├── reflex.html         # Reflexes
├── click10.html        # Clicks in 10 s
├── reflex-trap.html    # Reflexes + Traps
├── mystery.html        # Mystery Number
├── game2048.html       # 2048
├── snake.html          # Snake
├── morpion.html        # Tic-Tac-Toe
├── scores.html         # Scoreboard
├── css/
│   └── style.css       # Global stylesheet
├── js/
│   ├── main.js         # Pseudo management & home page logic
│   ├── pfc.js
│   ├── quiz.js
│   ├── simon.js
│   ├── reflex.js
│   ├── click10.js
│   ├── reflex-trap.js
│   ├── mystery.js
│   ├── game2048.js
│   ├── snake.js
│   ├── morpion.js
│   └── scores.js
└── img/                # Game thumbnail images
```

---

## 💾 Scores

Scores are stored in the browser's **localStorage**, so they persist across sessions without any back-end.  
You can view or reset them at any time from the **Scores** page.

---

## 🛠️ Technologies

- HTML5
- CSS3 (custom neon theme, Google Fonts — Orbitron)
- Vanilla JavaScript (ES6+)
- localStorage for score persistence
