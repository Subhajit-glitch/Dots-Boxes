# DOTS // BOXES

A futuristic, fully playable browser adaptation of the classic **Dots and Boxes** strategy game. Connect adjacent nodes, complete sectors, and outscore your opponent.

![DOTS // BOXES interface](https://img.shields.io/badge/STATUS-ONLINE-55e9ff?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-5.7-3178c6?style=for-the-badge)
![Vite](https://img.shields.io/badge/VITE-6-646cff?style=for-the-badge)

## Features

- Complete Dots and Boxes rules engine with strict move validation
- Player vs Player local mode
- Player vs Computer mode with four difficulty levels: **Easy, Medium, Hard, and Master**
- Strategic AI: captures, safe moves, chain awareness, and search-based decision making
- Responsive SVG game board with mouse and touch controls
- Real-time score, turn, move count, game timer, and move history
- Box capture chains keep the current player's turn, as in the original game
- Settings for board size, difficulty, player names, sound, animations, glow, and themes
- Local statistics: wins, losses, draws, win rate, best score, streaks, and play time
- Pause, restart, fullscreen, sound toggle, and PvP undo controls
- Persistent settings and statistics via `localStorage`

## How to Play

1. Select a glowing edge between two adjacent dots.
2. When your edge completes the fourth side of a box, you claim that box.
3. Capturing one or more boxes gives you another turn.
4. When every box has been claimed, the player with the highest score wins.

## Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer

### Install and start

```bash
git clone https://github.com/Subhajit-glitch/Dots-Boxes.git
cd Dots-Boxes
npm install
npm run dev
```

Open the local URL Vite displays, normally `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

## AI Difficulty

| Level | Behavior |
| --- | --- |
| Easy | Mostly random legal moves with occasional captures. |
| Medium | Takes immediate boxes and favors safe edges. |
| Hard | Evaluates chains and looks ahead to reduce opponent opportunities. |
| Master | Uses minimax-style search, alpha-beta pruning, and memoization on manageable boards. |

## Project Structure

```text
src/
├── engine.ts   # Authoritative rules, board state, moves, scoring, and winners
├── ai.ts       # Difficulty strategies and search-based AI
├── main.ts     # UI rendering, input handling, settings, statistics, and sound
├── style.css   # Futuristic responsive interface
└── fixes.css   # Stable locked-edge styling during timer refreshes
```

## Technology

- TypeScript
- Vite
- SVG rendering
- Web Audio API for lightweight optional sound effects
- Browser `localStorage` for preferences and statistics

## License

This project currently has no license. Add one before reusing or distributing it under specific terms.
