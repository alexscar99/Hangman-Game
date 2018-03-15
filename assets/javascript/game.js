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

var wordArray = [];

var blankSpacesArray = [];

var createWord = prompt('Player One: Enter a word for Player Two to guess.');

var wordArray = createWord.split('');

for (var i = 0; i < wordArray.length; i++) {
  blankSpacesArray.push('_');
  blankSpacesArray.push(' ');
}

var word = blankSpacesArray.join('');

var wins = 0;

var guessedLettersArray = [];

var guessCounter = 7;

document.onkeyup = function(event) {
  var userGuess = event.key;

  guessedLettersArray.push(userGuess);

  var guessedLettersString = guessedLettersArray.join(' ');

  var correctGuess = wordArray.includes(userGuess);

  if (alphabet.includes(userGuess)) {
    if (correctGuess) {
      var correctLetterIndex = wordArray.indexOf(userGuess);

      var wordArrayWithoutSpaces = word.split(' ');

      wordArrayWithoutSpaces[correctLetterIndex] = userGuess;

      word = wordArrayWithoutSpaces.join(' ');

      guessCounter += 0;

      guessedLettersString = guessedLettersString;
    } else {
      // FIGURE OUT HOW TO ONLY SUBTRACT FROM GUESS COUNTER IF NOT IN WORD ARRAY WITHOUT ITERATION
      // BECAUSE IT WILL KEEP SUBTRACTING AN EXTRA TIME WHEN A NEW KEY IS HIT

      guessCounter = 7 - guessedLettersArray.length;

      document.querySelector('#hangman-game').innerHTML =
        '<h1>Press a key to guess a letter!<h1>' +
        '<br>' +
        '<h2>Word to guess: ' +
        word +
        '</h2>' +
        '<br>' +
        '<p>Wins: ' +
        wins +
        '</p>' +
        '<br>' +
        '<p>Remaining Guesses: ' +
        guessCounter +
        '</p>' +
        '<br>' +
        '<p>Letters Guessed: ' +
        guessedLettersString +
        '</p>';
    }

    if (guessCounter <= 0) {
      alert('You lost the game. Refresh the page to play again!');
      return;
    }

    if (!word.includes('_')) {
      wins = wins + 1;
      alert('Congratulations! You just won! Hit refresh to play again.');
    }

    document.querySelector('#hangman-game').innerHTML =
      '<h1>Press a key to guess a letter!<h1>' +
      '<br>' +
      '<h2>Word to guess: ' +
      word +
      '</h2>' +
      '<br>' +
      '<p>Wins: ' +
      wins +
      '</p>' +
      '<br>' +
      '<p>Remaining Guesses: ' +
      guessCounter +
      '</p>' +
      '<br>' +
      '<p>Letters Guessed: ' +
      guessedLettersString +
      '</p>';
  } else {
    alert("That's not a letter!");
  }
};
