const words = ["javascript", "html", "css", "react", "node"];
let selectedWord = "";
let guessedWord = [];

const wordDisplay = document.getElementById("word-display");
const letterButtons = document.getElementById("letter-buttons");
const resetButton = document.getElementById("reset-button");

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill("_");
    updateWordDisplay();
    createLetterButtons();
}

function updateWordDisplay() {
    wordDisplay.textContent = guessedWord.join(" ");
}

function createLetterButtons() {
    letterButtons.innerHTML = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (const letter of alphabet) {
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleGuess(letter));
        letterButtons.appendChild(button);
    }
}

function handleGuess(letter) {
    let correctGuess = false;
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            guessedWord[i] = letter;
            correctGuess = true;
        }
    }
    updateWordDisplay();

    if (guessedWord.join("") === selectedWord) {
        setTimeout(() => {
            alert("You guessed the word!");
            startGame();
        }, 200);
    }
}

resetButton.addEventListener("click", startGame);

startGame();