//require the letter module
const AnswerLetter = require("./letter");

//Word Constructor Function
//1)Contains a this.answerLetters array;
//2)Recieves the currentAnswer as a string from the answers array and stores each letter as a new instance of AnswerLetter(using charAt)
//3)Contains this.answerLetters array, where each answerletter is pushed into.
var Word = function(currentAnswer) {
    this.answerLetters = [];
    for (i = 0; i < currentAnswer.length; i++) {
        var answerLetter = new AnswerLetter(currentAnswer.charAt(i));
        this.answerLetters.push(answerLetter);
    }

//this.isGuessCorrect Property
//1)Recieves the letterGuessed by the user as a string
//2)Cycles through this.answerLetters object to see if it contains the letterGuessed
//3)Return true if the letterGuessed is in this.answerLetters object array.  Return false if it is not.
    this.isGuessCorrect = function(letterGuessed) {
        var isGuessInAnswer = false;
        for (i in this.answerLetters) {
            //console.log("WORD: CHECK FOR MATCHES IN ISGUESSCORRECT FOR: "+letterGuessed+" = "+this.answerLetters[i]);
            //Check if at least one instance of the letterGuessed is found in the Answer
            var correctGuess = this.answerLetters[i].isGuessFound(letterGuessed);
            if (correctGuess) {
                isGuessInAnswer = true;
                //console.log("Match Found: "+letterGuessed+" = "+this.answerLetters[i]);
                //console.log("WORD: CHECK FOR MATCHES IN ISGUESSCORRECT INSIDE FOR: "+letterGuessed+" = "+this.answerLetters[i]+ " ISGUESSINANSWER = "+isGuessInAnswer);
            }
        }//for
        //console.log("WORD: CHECK FOR MATCHES IN ISGUESSCORRECT After FOR: "+letterGuessed+" = "+this.answerLetters[i]+ " ISGUESSINANSWER = "+isGuessInAnswer);
        return isGuessInAnswer;
    }

//this.correctGuessStatus function 
//1)Cycle through this.answerLetters array
/*2) Use AnswerLetter function returnDashOrLetter to store the answerLetter, or a dash, after the
 AnswerLetter function this.isGuessCorrect has been evaluated.  */
//3)currentCorrectGuesses stores the concatenated letter string.
//4)Return the string currentGuessStatus to be printed to screen
    this.correctGuessStatus = function() {
        var currentGuessStatus = '';
        for (i in this.answerLetters) {
            currentGuessStatus += this.answerLetters[i].returnDashOrLetter() + ' ';
        }
        return currentGuessStatus;
    }//correctGuessStatus

//Function areAllLettersGuessed - Checks if any letter in this.answerLetters array have not been guessed 
//1) Check if any element in this.answerLetters array has Not been guessed (this.isLetterGuessed property is false)
//2)If the Letter property this.isLetterGuessed is false then the word has not been guessed, so return false, else return true
    this.areAllLettersGuessed = function() {
        var isAnswerGuessed = true;
        for (i in this.answerLetters) {
            if (!this.answerLetters[i].isLetterGuessed) {
                isAnswerGuessed  = false;
            }
        }
        return isAnswerGuessed;
    }//areAllALetterGuessed
}//Contructor function
//export module
module.exports = Word;
