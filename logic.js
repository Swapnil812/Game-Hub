



function showSection(pageId) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('page3').style.display = 'none';
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page4').style.display = 'none';
    document.getElementById(pageId).style.display = 'flex';
}

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedIndex] !== "" || !gameActive) return;

    gameState[clickedIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    if (checkWin()) {
        statusText.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== "")) {
        statusText.innerText = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerText = `Player ${currentPlayer}'s turn`;
    }
};

const checkWin = () => {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            drawWinningLine(a, b, c);
            return true;
        }
    }
    return false;
};

const drawWinningLine = (a, b, c) => {
    const winningLine = document.getElementById('winning-line');
    const cellA = cells[a].getBoundingClientRect();
    const cellB = cells[b].getBoundingClientRect();
    const cellC = cells[c].getBoundingClientRect();
    const angle = Math.atan2(cellC.top - cellA.top, cellC.left - cellA.left) * 180 / Math.PI;
    const distance = Math.sqrt((cellC.left - cellA.left) ** 2 + (cellC.top - cellA.top) ** 2);

    winningLine.style.width = `${distance}px`;
    winningLine.style.transform = `rotate(${angle}deg)`;
    winningLine.style.left = `${cellA.left + cellA.width / 2}px`;
    winningLine.style.top = `${cellA.top + cellA.height / 2}px`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.innerText = "Player X's turn";
    cells.forEach(cell => cell.innerText = "");
    document.getElementById('winning-line').style.width = '0';
});





const gameBoard = document.getElementById("gameBoard");
const restartBtn2 = document.getElementById('restart2');
const cardSymbols = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍", "🥝", "🍉","🧠","🤡"];
let cardArray = [...cardSymbols, ...cardSymbols]; 
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
for (let i = array.length-1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}

function createCards() {
gameBoard.innerHTML = '';
shuffle(cardArray);
cardArray.forEach(symbol => {
const cardm = document.createElement("div");
cardm.classList.add("cardm");
cardm.innerHTML = `<div class="content">${symbol}</div>`;
cardm.addEventListener("click", () => flipCard(cardm));
gameBoard.appendChild(cardm);
});
}


function flipCard(cardm) {
if (flippedCards.length < 2 && !cardm.classList.contains("flipped")) {
cardm.classList.add("flipped");
cardm.querySelector(".content").style.display = "block";
flippedCards.push(cardm);

if (flippedCards.length === 2) {
    checkMatch();
}
}
}


function checkMatch() {
const [card1, card2] = flippedCards;
if (card1.innerHTML === card2.innerHTML) {
matchedPairs++;
flippedCards = [];
if (matchedPairs === cardSymbols.length) {
    setTimeout(() => alert("Congratulations! You've won!"), 300);
}
} else {
setTimeout(() => {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.querySelector(".content").style.display = "none";
    card2.querySelector(".content").style.display = "none";
    flippedCards = [];
}, 1000);
}
}


restartBtn2.addEventListener('click', () => {
flippedCards = [];
matchedPairs = 0;
createCards();
});


createCards();



function playGame(playerChoice) {
const choices = ["rock", "paper", "scissors"];
const computerChoice = choices[Math.floor(Math.random() * 3)];
const resultDisplay = document.getElementById("outcome");

const images = {
rock:"rock.png",
paper: "paper.png",
scissors: "sci.png"
};

document.getElementById("player-choice").innerHTML = `Your Choice: <img class="gt" src="${images[playerChoice]}" alt="${playerChoice}" style="height: 60px;">`;
document.getElementById("computer-choice").innerHTML = `Computer's Choice: <img class="gt" src="${images[computerChoice]}" alt="${computerChoice}" style="height: 60px;">`;

let result;

if (playerChoice === computerChoice) {
result = "It's a draw🤯";
} else if (
(playerChoice === "rock" && computerChoice === "scissors") ||
(playerChoice === "scissors" && computerChoice === "paper") ||
(playerChoice === "paper" && computerChoice === "rock")
) {
result = "You win🏆";
} else {
result = "You lose🤡";
}

resultDisplay.textContent = `Result: ${result}`;
}


const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const box = 20;
    let snake = [{ x: 200, y: 200 }];
    food = { 
        x: Math.floor(Math.random() * (canvas.width / box)) * box, 
        y: Math.floor(Math.random() * (canvas.height / box)) * box 
      };
      
    let direction = 'RIGHT';
    let score = 0;

    document.addEventListener('keydown', changeDirection);

    function changeDirection(event) {
      if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
      else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
      else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
      else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    }

    function draw() {
      ctx.fillStyle = ' #1a9ec6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'red';
      ctx.fillRect(food.x, food.y, box, box);

      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(segment.x, segment.y, box, box);
      });

      let head = { ...snake[0] };

      if (direction === 'UP') head.y -= box;
      if (direction === 'DOWN') head.y += box;
      if (direction === 'LEFT') head.x -= box;
      if (direction === 'RIGHT') head.x += box;

if (head.x < 0) head.x = canvas.width - box;
else if (head.x >= canvas.width) head.x = 0;
if (head.y < 0) head.y = canvas.height - box;
else if (head.y >= canvas.height) head.y = 0;


      if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
      } else {
        snake.pop();
      }

      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        if (document.getElementById('page4').style.display === 'none') {
            return;
        }
        
        else{

            alert(`Game Over! Your Score: ${score}`);
        }
        snake = [{ x: 200, y: 200 }];
        score = 0;
        direction = 'RIGHT';
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
        return;
      }

      snake.unshift(head);
      ctx.font = '30px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText(`Score: ${score}`, 10, 40);

    }

    setInterval(draw, 150);