const play_board = document.querySelector('.play_board');
const scoreElement = document.querySelector('.score');
const high_score_Element = document.querySelector('.high_score');
const controls = document.querySelectorAll('.controls i');
const popup = document.getElementById('popup');

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

let score = 0;

// Pause game flag
let paused = false;

//getting high score from localStorage
let highScore = localStorage.getItem("high_score") || 0;
high_score_Element.innerText = `High Score: ${highScore}`;


const handleGameOver = () => {
    //clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press Ok to re-start game.");
    location.reload();
}

const togglePause = () => {
    paused = !paused;
    if (paused) {
      clearInterval(setIntervalId);
      popup.style.display = 'block';
    } else {
      setIntervalId = setInterval(initGame, 125);
      popup.style.display = 'none';
    }
  }


//3. change direction on pressing key
const changeDirection = (e) => {
    if (e.key === 'ArrowUp' && velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    } else if (e.key === 'ArrowDown' && velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (e.key === 'ArrowLeft' && velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    } else if (e.key === 'ArrowRight' && velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    } else if (e.key === ' ') {
      if (!gameOver) {
        togglePause();
      }
    }
  }

//2. change snake food position randomly
const changeFoodPosition = () => {
    //passing a random 0 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}


//Controls for small devices
controls.forEach((key) => {
    //Calling changeDirection on each key click and passing key dataset value as an object
    key.addEventListener('click', () => changeDirection({key: key.dataset.key }));
    // console.log({key: key.dataset.key });
})


//1. snake head and food
const initGame = () => {

    //if game over, return  the handle game over function
    if(gameOver) return handleGameOver();

    let htmlMarkUp = `<div class='food' style='grid-area: ${foodY} / ${foodX}'></div>`;

    // checkig if the snake hit the food
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        // snake body sagment after eats it
        snakeBody.push([foodX, foodY]); //pushing food position to snake body array
        // console.log(snakeBody);
        score++; //increment score by 1

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high_score', highScore );
        scoreElement.innerText = `Score: ${score}`;
        high_score_Element.innerText = `High Score: ${highScore}`;
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
        //checking if the snake head hit the body, if so set gameOver true
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    play_board.innerHTML = htmlMarkUp;
}

changeFoodPosition();
// initGame();

//snake head will move 125 miliseconds
setIntervalId = setInterval(initGame, 125)
//adding addEventListener for key work
document.addEventListener('keydown', changeDirection);