/* Constructor function which will either display the letter to
   the screen if it is in the word or it will display a blank if
   it is not in the word */

// Constructor Function AnswerLetter
// 1)Receives a letter in the correct answer and stores it in the this.answerLetter property.
// eslint-disable-next-line max-len
// 2)Contains the property this.isLetterGuessed that is set to false, which tracks if the user has guessed this letter
// eslint-disable-next-line func-names
const AnswerLetter = function (answerLetter) {
  this.answerLetter = answerLetter;
  this.isLetterGuessed = false;

  /* this.isGuessFound function property
     1) Receives the letterGuessed
     2) Compares the this.answerLetter, against the user's letterGuessed.
     3) If the letterGuessed is found in this.answerLetter, set the value
        of this.isLetterGuessed to true and return true (indicating a
        correct guess was made), else return false (indicating an
        incorrect choice was made) */
  /* NOTE: You can not return isLetterGuessed because it will be set to true
     when one letter is found.  This will give a false positive when
     checking if a different key matches a letter in the answer); */
  this.isGuessFound = (letterGuessed) => {
    if (this.answerLetter === letterGuessed) {
      this.isLetterGuessed = true;
      return true;
    }
    return false;
  }; // Check Guess

  // this.returnDashOrLetter function property
  // 1)If this.isLetterGuessed is true then return this.answerLetter, else return an underscore.
  this.returnDashOrLetter = () => {
    if (this.isLetterGuessed) {
      return this.answerLetter;
    }
    return ' _';
  };
}; // letter

module.exports = AnswerLetter;
