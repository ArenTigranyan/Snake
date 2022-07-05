import {
  equalPositions,
  snakeBody,
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
} from './snake.js';

import { update as updateFood, draw as drawFood } from './food.js';

let lastRenderTime;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {
  if (gameOver) return alert('you lose');
  const secondsSInceLastRender = (currentTime - lastRenderTime) / 1000;
  window.requestAnimationFrame(main);
  if (secondsSInceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;
  console.log('render');
  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid() || headOnTail();
}

function outsideGrid() {
  for (let i = 0; i < snakeBody.length; i++) {
    let xPos = snakeBody[i].x;
    let yPos = snakeBody[i].y;
    if (xPos > 21 || xPos < 1 || yPos > 21 || yPos < 1) return true;
  }
  return false;
}

function headOnTail() {
  for (let i = 1; i < snakeBody.length; i++) {
    if (equalPositions(snakeBody[0], snakeBody[i])) return true;
  }
  return false;
}
