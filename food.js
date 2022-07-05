import { onSnake, expandSnake } from './snake.js';

let food = getRandomFootPosition();
const EXPANSION_RATE = 1;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFootPosition();
  }
}

export function draw() {
  let foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  document.getElementById('game-board').append(foodElement);
}

function getRandomFootPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}

function randomGridPosition() {
  return {
    x: Math.ceil(Math.random() * 21),
    y: Math.ceil(Math.random() * 21),
  };
}
