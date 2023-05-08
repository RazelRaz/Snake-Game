const play_board = document.querySelector('.play_board');

//food
let foodX;
let foodY;
// Snake head
let snakeX = 5;
let snakeY = 10;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

let gameOver = false;
let setIntervalId;


const handleGameOver = () => {
    //clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press Ok to reply");
    location.reload();
} 


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

    //if game over, return  the handle game over function
    if(gameOver) return handleGameOver();

    let htmlMarkUp = `<div class='food' style='grid-area: ${foodY} / ${foodX}'></div>`;

    //change food position after snakes eats it && // checkig if the snake hit the food
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        // snake body sagment after eats it
        snakeBody.push([foodX, foodY]); //pushing food position to snake body array
        // console.log(snakeBody);
        
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        //shifting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY] //setting first element of snake body to current snake position

    //updating the snake's head position based on the current velocity
    snakeX = snakeX + velocityX;
    snakeY = snakeY + velocityY;

    //checking the snakes head position based on the wall, if so setting game over true
    //show the game over alert when the snake collides with the wall
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        //adding a div for each part of the snake's body 
        htmlMarkUp += `<div class='head' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;
    }
    play_board.innerHTML = htmlMarkUp;
}

changeFoodPosition();
// initGame();

//snake head will move 125 miliseconds
setIntervalId = setInterval(initGame, 125)
//adding addEventListener for key work
document.addEventListener('keydown', changeDirection);