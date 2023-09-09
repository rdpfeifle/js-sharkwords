const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const WORDS = [
  "strawberry",
  "orange",
  "apple",
  "banana",
  "pineapple",
  "kiwi",
  "peach",
  "pecan",
  "eggplant",
  "durian",
  "peanut",
  "chocolate",
];

const guessImages = [
  "/static/images/guess0.png",
  "/static/images/guess1.png",
  "/static/images/guess2.png",
  "/static/images/guess3.png",
  "/static/images/guess4.png",
  "/static/images/guess5.png",
];

const wordContainer = document.getElementById("word-container");
const letterButtons = document.getElementById("letter-buttons");

let numWrong = 0;

/**
 * Create a div for each letter in word.
 * Then, append each div to the wordContainer.
 */
const createDivsForChars = (word) => {
  let letterDivs = [];

  for (const letter of word) {
    const letterDiv = document.createElement("div");
    letterDiv.className = `letter-box ${letter}`;
    letterDivs.push(letterDiv);
  }

  for (const div of letterDivs) {
    wordContainer.append(div);
  }
};

/**
 * Generate a button for each letter in the alphabet
 * and append to the letterButtons section.
 */
const generateLetterButtons = () => {
  for (const letter of ALPHABET) {
    letterButtons.insertAdjacentHTML("beforeend", `<button>${letter}</button>`);
  }
};

/**
 * Set the `disabled` property of `buttonEl` to true.
 * @param {*} buttonEl is an `HTMLElement` object
 */
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// Disable all buttons
const disableAllButtons = () => {
  for (const button of document.querySelectorAll("button")) {
    button.disabled = true;
  }
};

// This function should return `true` if `letter` is in the word
const isLetterInWord = (letter, word) => word.includes(letter);

// Called when `letter` is in word. Update contents of divs with `letter`.
const handleCorrectGuess = (letter, word, button) => {
  if (isLetterInWord(letter, word)) {
    const selectAllLetters = document.querySelectorAll(`.letter-box.${letter}`);

    for (const div of selectAllLetters) {
      div.innerHTML += letter;
      disableLetterButton(button);
    }
  }
};

let currentImgIndex = 0;

// Called when `letter` is not in word.
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.
const handleWrongGuess = (letter, word, button) => {
  if (!isLetterInWord(letter, word)) {
    const imageElement = document.querySelector("img");

    if (numWrong < 5) {
      numWrong += 1;

      // point to the next image
      currentImgIndex = (currentImgIndex + 1) % guessImages.length;
      imageElement.src = guessImages[currentImgIndex];
      disableLetterButton(button);
    }
    if (numWrong === 5) {
      imageElement.src = guessImages[currentImgIndex];
      disableAllButtons();
      document.getElementById("play-again").style.display = "block";
    }
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = "/sharkwords";
};

(function startGame() {
  /**
   * Randomly selects a word from the WORDS array by generating a random
   * index between 0 and the array's length.
   */
  const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];

  console.log("Random word:", randomWord);
  createDivsForChars(randomWord);

  generateLetterButtons();

  for (const button of document.querySelectorAll("button")) {
    // add an event handler to handle clicking on a letter button
    button.addEventListener("click", () => {
      handleCorrectGuess(button.textContent, randomWord, button);
      handleWrongGuess(button.textContent, randomWord, button);
    });
  }
  // add an event handler to handle clicking on the Play Again button
})();
