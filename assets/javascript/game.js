var alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

var word = '';

var wordArray = [];

var blankSpacesArray = [];

var createWord = prompt('Player One: Enter a word for Player Two to guess.');
// console.log(createWord);

var wordArray = createWord.split('');
// console.log(wordArray);

// console.log(wordArray.length);
// wordArray = ["l", "a", "p", "t", "o", "p"]
for (var i = 0; i < wordArray.length; i++) {
  blankSpacesArray.push('_');
  blankSpacesArray.push(' ');
}

var blankSpaces = blankSpacesArray.join('');

var wins = 0;

var guessedLettersArray = [];

var remainingGuesses = 6;

document.onkeyup = function(event) {
  var userGuess = event.key;

  if (alphabet.includes(userGuess)) {
    guessedLettersArray.push(userGuess);

    var remainingGuesses = 6 - guessedLettersArray.length;

    if (remainingGuesses <= 0) {
      alert('You lost the game. Refresh the page to play again!');
      return;
    }

    var guessedLettersString = guessedLettersArray.join(' ');

    if (wordArray.includes(userGuess)) {
      var correctLetterIndex = wordArray.indexOf(userGuess);
      blankSpacesArray.splice(correctLetterIndex, 1);
      blankSpacesArray.push(userGuess);
    }

    document.querySelector('#hangman-game').innerHTML =
      '<br>' +
      '<h2>Word to guess: ' +
      blankSpaces +
      '</h2>' +
      '<br>' +
      '<p>Wins: ' +
      wins +
      '</p>' +
      '<br>' +
      '<p>Remaining Guesses: ' +
      remainingGuesses +
      '</p>' +
      '<br>' +
      '<p>Letters Guessed: ' +
      guessedLettersString +
      '</p>';
  } else {
    alert('Something is broken');
  }
};
