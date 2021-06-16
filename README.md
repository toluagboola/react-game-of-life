# Conway's Game of Life in React

![Game board](https://github.com/toluagboola/react-game-of-life/blob/master/game-of-life.png)

This is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.

Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent.

There are several rules that govern the game:

- Any live cell with fewer than two live neighbours dies, as if by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Setup

- Clone this repo to your machine
- cd into the project directory and run `npm install`, then `npm start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
