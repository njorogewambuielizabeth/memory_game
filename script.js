
// added new styles

const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedCards = [];
let movesCounter = 0;
let timer = 0;
let timerInterval;
let isGameActive = false;

cards.forEach(card => {
  card.addEventListener('click', flipCard);
});

document.getElementById('reset-button').addEventListener('click', resetGame);

function flipCard() {
  if (isGameActive && flippedCards.length < 2 && !this.classList.contains('flipped') && !matchedCards.includes(this)) {
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkForMatch();
      incrementMovesCounter();
    }
  }
}

function checkForMatch() {
  const card1 = flippedCards[0].getAttribute('data-card');
  const card2 = flippedCards[1].getAttribute('data-card');

  if (card1 === card2) {
    matchedCards.push(flippedCards[0], flippedCards[1]);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      stopTimer();
      setTimeout(() => {
        alert(`Congratulations! You matched all the cards in ${timer} seconds with ${movesCounter} moves.`);
        resetGame();
      }, 500);
    }
  } else {
    setTimeout(() => {
      flippedCards.forEach(card => card.classList.remove('flipped'));
      flippedCards = [];
    }, 1000);
  }
}

function incrementMovesCounter() {
  movesCounter++;
  document.getElementById('moves-counter').textContent = movesCounter;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById('timer').textContent = timer;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetGame() {
  cards.forEach(card => {
    card.classList.remove('flipped');
  });

  flippedCards = [];
  matchedCards = [];
  movesCounter = 0;
  timer = 0;
  isGameActive = false;

  document.getElementById('moves-counter').textContent = movesCounter;
  document.getElementById('timer').textContent = timer;

  stopTimer();
}

// Start the game when the page loads
window.addEventListener('load', () => {
  resetGame();
  isGameActive = true;
  startTimer();
});
