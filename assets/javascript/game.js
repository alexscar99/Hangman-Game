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

var createWord = '';

var letterArray = [];

var blankWordArray = [];

var word = '';

var guessedLettersArray = [];

var playerOne = false;

var playerTwo = false;

var playerOneWins = 0;

var playerTwoWins = 0;

var guessCounter = 7;

var initializeGame = function() {
  createWord = prompt('Enter a word for the other player to guess!');
  letterArray = createWord.split('');
  for (var i = 0; i < letterArray.length; i++) {
    blankWordArray.push('_ ');
  }
  word = blankWordArray.join('');
  document.querySelector('#word-to-guess').innerHTML =
    '<h2>Word to Guess: ' + word + '</h2>';
};

var reset = function() {
  createWord = '';
  letterArray = [];
  blankWordArray = [];
  word = '';
  guessedLettersArray = [];
  guessCounter = 7;
  guessedLettersString = '';
  playerOne = false;
  playerTwo = false;
  document.querySelector('#letters-guessed').innerHTML =
    '<strong>Letters Guessed:</strong> ' + guessedLettersString;
};

// on click event that determines player 1 is guessing and starts the game
document.getElementById('player-1-btn').addEventListener('click', function() {
  playerOne = true;
  initializeGame();
});

// on click event that determines that player 2 is playing and starts the game
document.getElementById('player-2-btn').addEventListener('click', function() {
  playerTwo = true;
  initializeGame();
});

document.onkeyup = function(event) {
  // record the key pressed by the user
  var userGuess = event.key;

  // put the letter guessed by user into the guessed letters array
  guessedLettersArray.push(userGuess);

  // turn the letters guessed array into a string
  var guessedLettersString = guessedLettersArray.join(' ');

  // check if the letter array contains the letter guessed by the user
  var correctGuess = letterArray.includes(userGuess);

  // make sure the key pressed by user is a letter
  if (alphabet.includes(userGuess)) {
    // if the letter guessed is a letter in the word:
    if (correctGuess) {
      // create array with just underscores
      var letterArrayWithoutSpaces = word.split(' ');

      // create array for the indeces for words that have multiples of the same letter
      var multipleLettersIndex = [];

      // loop through the length of the array of letters and push the index number into the multiple letters array
      for (var i = 0; i < letterArray.length; i++) {
        if (letterArray[i] === userGuess) multipleLettersIndex.push(i);
      }

      // iterate through the array of indexes for multiple letters and change the same index in letter array to the user's guess
      multipleLettersIndex.forEach(function(index) {
        letterArrayWithoutSpaces[index] = userGuess;
      });

      // turn the array into a string
      word = letterArrayWithoutSpaces.join(' ');
    } else {
      // remove one from remaining guesses if the guess is incorrect
      guessCounter -= 1;
    }
    document.querySelector('#word-to-guess').innerHTML =
      'Word to Guess: ' + word;

    // document.querySelector('#player-select').innerHTML = '';

    document.querySelector('#remaining-guesses').innerHTML =
      '<strong>Remaining Guesses:</strong> ' + guessCounter;

    document.querySelector('#letters-guessed').innerHTML =
      '<strong>Letters Guessed:</strong> ' + guessedLettersString;

    document.querySelector('#player-one-wins').innerHTML =
      '<strong>Player 1 Wins:</strong> ' + playerOneWins;

    document.querySelector('#player-two-wins').innerHTML =
      '<strong>Player 2 Wins:</strong> ' + playerTwoWins;

    // if the player runs out of guesses, let them know they lost
    if (guessCounter <= 0) {
      setTimeout(function() {
        alert("You lost the game. The word was '" + createWord + "'" + '.');
        reset();
      }, 300);
    }
    // if the player completes the word before running out of guesses, add one to win and let them know they won
    if (!word.includes('_') && playerOne) {
      playerOneWins++;
      document.querySelector('#player-one-wins').innerHTML =
        '<strong>Player 1 Wins: </strong>' + playerOneWins;
      setTimeout(function() {
        alert('Congratulations! You just won!');
        reset();
      }, 300);
    } else if (!word.includes('_') && playerTwo) {
      playerTwoWins++;
      document.querySelector('#player-two-wins').innerHTML =
        '<strong>Player 2 Wins: </strong>' + playerTwoWins;
      setTimeout(function() {
        alert('Congratulations! You just won!');
        reset();
      }, 300);
    }
  } else {
    alert("That's not a letter!");
  }
};
