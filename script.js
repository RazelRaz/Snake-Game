const play_board = document.querySelector('.play_board');

//food
let foodX;
let foodY;
// Snake head
let snakeX = 5;
let snakeY = 10;

let velocityX = 0;
let velocityY = 0;


//3. change direction on pressing key
const changeDirection = (e) => {
    //changing velocity value based on press
    if(e.key === 'ArrowUp'){
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === 'ArrowDown'){
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === 'ArrowLeft'){
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === 'ArrowRight'){
        velocityX = 1;
        velocityY = 0;
    }
    // initGame();
}

//2. change snake food position randomly
const changeFoodPosition = () => {
    //passing a random 0 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

//1. snake head and food
const initGame = () => {
    let htmlMarkUp = `<div class='food' style='grid-area: ${foodY} / ${foodX}'></div>`;

    //updating the snake's head position based on the current velocity
    snakeX = snakeX + velocityX;
    snakeY = snakeY + velocityY;

    htmlMarkUp += `<div class='head' style='grid-area: ${snakeY} / ${snakeX}'></div>`;
    play_board.innerHTML = htmlMarkUp;
}

changeFoodPosition();
// initGame();

//snake head will move 125 miliseconds
setInterval(initGame, 125)
//adding addEventListener for key work
document.addEventListener('keydown', changeDirection);