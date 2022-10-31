const allCards = document.querySelectorAll('.card');
var cards = document.querySelectorAll('.cardEasy');
var notCards = document.querySelectorAll('.cardNotEasy');

document.querySelector(".select").addEventListener("change", function(){
    allCards.forEach(card => card.classList.remove('notCard'));
    let difficulty = this.value;

    if (difficulty === "easy") {
        cards = document.querySelectorAll('.cardEasy');
        notCards = document.querySelectorAll('.cardNotEasy');
    } else if (difficulty === "medium") {
        cards = document.querySelectorAll('.cardMedium');
        notCards = document.querySelectorAll('.cardNotMedium');
    } else if (difficulty === "hard") {
        cards = document.querySelectorAll('.cardHard');
        notCards = document.querySelectorAll('.cardNotHard');
    }

    console.log(difficulty);

    startGame();
})

const flippedCards = [];
const victoryScreen = document.querySelector('.victoryScreen');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();

    checkForWin();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function checkForWin() {
    if (flippedCards.length === cards.length) {
        setTimeout(() => {
            victoryScreen.classList.add('gameWon');
        }, 900);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    flippedCards.push(firstCard);
    flippedCards.push(secondCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 900);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

function startGame() {
    notCards.forEach(notCard => notCard.classList.add('notCard'));
    shuffle();
    cards.forEach(card => card.addEventListener('click', flipCard));
}

startGame();