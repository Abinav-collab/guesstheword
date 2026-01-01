const words = [
    "apple", "grape", "mango", "peach", "pears", "lemon", "melon",
    "olive", "plum", "quirk", "rover", "spark", "stone", "toast",
    "trend", "vault", "wrist", "yacht", "zesty", "bacon", "bread",
    "chair", "dance", "earth", "frost", "ghost", "haste", "igloo",
    "jolly", "knife", "light", "might", "nymph", "ocean"
];
let secretWord = "";
let currentAttempt = 0;
const maxAttempts = 5;

const gridContainer = document.getElementById('grid-container');
const messageContainer = document.getElementById('message-container');
const newWordButton = document.getElementById('new-word-button');

function initializeGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    currentAttempt = 0;
    gridContainer.innerHTML = '';
    messageContainer.textContent = '';
    currentGuess = '';

    for (let i = 0; i < maxAttempts * 5; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        gridContainer.appendChild(cell);
    }

    document.removeEventListener('keydown', handleKeyPress);
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
        cells[baseIndex + i].classList.remove('correct', 'present', 'absent');
    }
}

function checkGuess() {
    const guess = currentGuess;
    const cells = gridContainer.children;
    const baseIndex = currentAttempt * 5;
    const secretWordLetters = secretWord.split('');

    // First pass for correct letters (green)
    for (let i = 0; i < 5; i++) {
        const cell = cells[baseIndex + i];
        if (guess[i] === secretWord[i]) {
            cell.classList.add('correct');
            secretWordLetters[i] = null; // Mark this letter as "used"
        }
    }

    // Second pass for present (yellow) and absent (red) letters
    for (let i = 0; i < 5; i++) {
        const cell = cells[baseIndex + i];
        // Skip already correct letters
        if (cell.classList.contains('correct')) continue;

        const letterIndex = secretWordLetters.indexOf(guess[i]);
        if (letterIndex !== -1) {
            cell.classList.add('present');
            secretWordLetters[letterIndex] = null; // Mark this letter as "used"
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

newWordButton.addEventListener('click', initializeGame);

initializeGame();
