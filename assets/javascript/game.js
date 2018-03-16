// create an array of all letters to check later if user input is a letter
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

// empty array to push letters into later
var letterArray = [];

// empty array to push blank spaces and underscores into later
var blankWordArray = [];

// ask user to enter word for other player to guess
var createWord = prompt('Player One: Enter a word for Player Two to guess!');

// split that word into an array of each letter as an item
var letterArray = createWord.split('');

// loop through the letter array and push in an underscore and a space for each letter
for (var i = 0; i < letterArray.length; i++) {
  blankWordArray.push('_');
  blankWordArray.push(' ');
}

// turn the array of appropriate underscores and spaces into a string
var word = blankWordArray.join('');

// set wins to 0 outside of onkeyup function
var wins = 0;

// create empty array for guessed letters
var guessedLettersArray = [];

// remaining guesses starts at 7
var guessCounter = 7;

// display the header and the blank word before any keys are hit
document.querySelector('#hangman-game').innerHTML =
  '<div class="jumbotron">' +
  '<h1>Welcome to the Hangman Game!<h1>' +
  '<h2>Press any key to guess a letter.</h2>' +
  '</div>' +
  '<div id="first-br">' +
  '<br>' +
  '</div>' +
  '<h2 id="word-to-guess">Word to Guess: ' +
  word +
  '</h2>';

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
      guessCounter = guessCounter - 1;
    }
    // if the player runs out of guesses, let them know they lost
    if (guessCounter <= 0) {
      alert(
        'You lost the game. The word was ' +
          createWord +
          '. Refresh the page to play again!'
      );
      return;
    }
    // if the player completes the word before running out of guesses, add one to win and let them know they won
    if (!word.includes('_')) {
      wins = wins + 1;
      alert('Congratulations! You just won! Hit refresh to play again.');
    }
    // change HTML
    document.querySelector('#hangman-game').innerHTML =
      '<div class="jumbotron">' +
      '<h1>Welcome to the Hangman Game!<h1>' +
      '<h2>Press any key to guess a letter.</h2>' +
      '</div>' +
      '<div id="first-br">' +
      '<br>' +
      '</div>' +
      '<h2 id="word-to-guess">Word to Guess: ' +
      word +
      '</h2>' +
      '<div id="main-content">' +
      '<div class="progress">' +
      '<br>' +
      '</div>' +
      '<p><strong>Remaining Guesses:</strong> ' +
      guessCounter +
      '</p>' +
      '<div class="progress">' +
      '<br>' +
      '</div>' +
      '<p><strong>Letters Guessed:</strong> ' +
      guessedLettersString +
      '</p>' +
      '<div class="progress">' +
      '<br>' +
      '</div>' +
      '<p><strong>Wins:</strong> ' +
      wins +
      '</p>' +
      '<div class="progress">' +
      '<br>' +
      '</div>' +
      '</div>';
  } else {
    // let the user know that they hit a key that wasn't a letter
    alert("That's not a letter!");
  }
};
