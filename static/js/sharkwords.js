const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry', 'orange', 'apple', 'banana', 'pineapple', 'kiwi',
  'peach', 'pecan', 'eggplant', 'durian', 'peanut', 'chocolate'
];


let numWrong = 0;


// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  for (const letter of word) {
    $('#word-container').append(`<div class="letter-box ${letter}"></div>`);
  }
};


// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  for (const letter of ALPHABET) {
    $('#letter-buttons').append(`<button>${letter}</button>`);
  }
};


// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  $(buttonEl).attr("disabled", "true");
};


// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  const letterEl = $(`div.${letter}`);

  if (letterEl[0] === undefined) {
    return false;
  }
  else {
    return true;
  }
};


// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  const letterEl = $(`div.${letter}`);

  letterEl.html(`${letter}`);
};


// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  // Increment number of wrong guesses
  numWrong += 1;
  $('img').attr("src", `/static/images/guess${numWrong}.png`);

  if (numWrong === 5) {
    $('button').attr("disabled", "true");
    $('a#play-again').show();
  }
};


// Reset game state. Called before restarting the game.
//
const resetGame = () => {
  numWrong = 0;
  $('img').attr("src", "/static/images/guess0.png");
  $('a#play-again').hide();

  $('section#word-container').empty();
  $('section#letter-buttons').empty();
};


// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  $('button').on('click', (evt) => {
    const clickedBtn = $(evt.target);
    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html();

    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
    } else {
      handleWrongGuess(letter);
    }
  });

  $('#play-again').on('click', () => {
    resetGame();
    startGame();
  });
})();
