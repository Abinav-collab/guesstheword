const words = ["apple", "grape", "mango", "peach", "pears"];
let secretWord = "";
let currentAttempt = 0;
const maxAttempts = 5;

const gridContainer = document.getElementById('grid-container');
const messageContainer = document.getElementById('message-container');

function initializeGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    currentAttempt = 0;
    gridContainer.innerHTML = '';
    messageContainer.textContent = '';

    for (let i = 0; i < maxAttempts * 5; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        gridContainer.appendChild(cell);
    }

    document.addEventListener('keydown', handleKeyPress);
}

let currentGuess = '';

function handleKeyPress(event) {
    if (currentAttempt >= maxAttempts) return;

    const letter = event.key.toLowerCase();

    if (letter.length === 1 && letter >= 'a' && letter <= 'z' && currentGuess.length < 5) {
        currentGuess += letter;
        updateGrid();
    } else if (event.key === 'Backspace' && currentGuess.length > 0) {
        currentGuess = currentGuess.slice(0, -1);
        updateGrid();
    } else if (event.key === 'Enter' && currentGuess.length === 5) {
        checkGuess();
    }
}

function updateGrid() {
    const cells = gridContainer.children;
    const baseIndex = currentAttempt * 5;

    for (let i = 0; i < 5; i++) {
        cells[baseIndex + i].textContent = currentGuess[i] || '';
    }
}

function checkGuess() {
    const guess = currentGuess;
    const cells = gridContainer.children;
    const baseIndex = currentAttempt * 5;

    for (let i = 0; i < 5; i++) {
        const cell = cells[baseIndex + i];
        if (guess[i] === secretWord[i]) {
            cell.classList.add('correct');
        } else if (secretWord.includes(guess[i])) {
            cell.classList.add('present');
        } else {
            cell.classList.add('absent');
        }
    }

    if (guess === secretWord) {
        messageContainer.textContent = 'You guessed the word!';
        document.removeEventListener('keydown', handleKeyPress);
        return;
    }

    currentAttempt++;
    currentGuess = '';

    if (currentAttempt >= maxAttempts) {
        messageContainer.textContent = `Game Over! The word was "${secretWord}".`;
        document.removeEventListener('keydown', handleKeyPress);
    }
}

initializeGame();
