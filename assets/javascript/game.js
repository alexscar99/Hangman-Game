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
var blankSpacesArray = [];

// ask user to enter word for other player to guess
var createWord = prompt('Player One: Enter a word for Player Two to guess.');

// split that word into an array of each letter as an item
var letterArray = createWord.split('');

// loop through the letter array and push in an underscore and a space for each letter
for (var i = 0; i < letterArray.length; i++) {
  blankSpacesArray.push('_');
  blankSpacesArray.push(' ');
}

// turn the array of appropriate underscores and spaces into a string
var word = blankSpacesArray.join('');

// set wins to 0 outside of onkeyup function
var wins = 0;

// create empty array for guessed letters
var guessedLettersArray = [];

// remaining guesses starts at 7
var guessCounter = 7;

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

      var multipleLettersIndex = [];

      // loop through the length of the array of letters and push the index number into the empty array defined above if equal to the user's guess
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
      // remove one from remaining guesses only if the letter is not in the word
      guessCounter = guessCounter - 1;
    }
    // if the player runs out of guesses, let them know they lost
    if (guessCounter <= 0) {
      alert('You lost the game. Refresh the page to play again!');
      return;
    }
    // if the player completes the word before running out of guesses, add one to win and let them know they won
    if (!word.includes('_')) {
      wins = wins + 1;
      alert('Congratulations! You just won! Hit refresh to play again.');
    }
    // change HTML
    document.querySelector('#hangman-game').innerHTML =
      '<h1>To guess a letter, press the corresponding key!<h1>' +
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
    // let the user know that they hit a key that wasn't a letter
    alert("That's not a letter!");
  }
};
