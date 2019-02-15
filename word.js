/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// require the letter module
const AnswerLetter = require('./letter');

// Word Constructor Function
// 1) Contains a this.answerLetters array;
/* 2) Recieves the currentAnswer as a string from the answers array and
      stores each letter as a new instance of AnswerLetter(using charAt) */
// 3) Contains this.answerLetters array, where each answerletter is pushed into.
function Word(currentAnswer) {
  this.answerLetters = [];
  for (let i = 0; i < currentAnswer.length; i += 1) {
    const answerLetter = new AnswerLetter(currentAnswer.charAt(i));
    this.answerLetters.push(answerLetter);
  } // for

  // this.isGuessCorrect Property
  // 1) Recieves the letterGuessed by the user as a string
  // 2) Cycles through this.answerLetters object to see if it contains the letterGuessed
  // 3) Return true if the letterGuessed is in this.answerLetters object array.
  //    Return false if it is not.
  this.isGuessCorrect = (letterGuessed) => {
    let isGuessInAnswer = false;
    for (const i in this.answerLetters) {
      // Check if at least one instance of the letterGuessed is found in the Answer
      const correctGuess = this.answerLetters[i].isGuessFound(letterGuessed);
      if (correctGuess) {
        isGuessInAnswer = true;
      } // if
    } // for
    return isGuessInAnswer;
  }; // isGuessCorrect

  // this.correctGuessStatus function
  // 1) Cycle through this.answerLetters array
  /* 2) Use AnswerLetter function returnDashOrLetter to store the
        answerLetter, or a dash, after the AnswerLetter function
        this.isGuessCorrect has been evaluated.  */
  // 3) currentCorrectGuesses stores the concatenated letter string.
  // 4) Return the string currentGuessStatus to be printed to screen
  // eslint-disable-next-line func-names
  this.correctGuessStatus = function () {
    let currentGuessStatus = '';
    for (const i in this.answerLetters) {
      const dashOrLetter = `${this.answerLetters[i].returnDashOrLetter()}`;
      currentGuessStatus += dashOrLetter;
    }
    return currentGuessStatus;
  }; // correctGuessStatus

  /* Function areAllLettersGuessed - Checks if any letter in
     this.answerLetters array have not been guessed:
     1) Check if any element in this.answerLetters array has
        Not been guessed (this.isLetterGuessed property is false)
     2) If the Letter property this.isLetterGuessed is false then
        the word has not been guessed, so return false, else return
        true */
  this.areAllLettersGuessed = () => {
    let isAnswerGuessed = true;
    for (const i in this.answerLetters) {
      if (!this.answerLetters[i].isLetterGuessed) {
        isAnswerGuessed = false;
      }
    }
    return isAnswerGuessed;
  }; // areAllALetterGuessed
} // Contructor function

// export module
module.exports = Word;
