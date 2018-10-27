// requiring the inquirer and word modules
const Word = require("./Word");
var inquirer = require("inquirer");


var count = 0;
const game = {
    answers: ['Freddy', 'Jason', 'Ghostface', 'Chucky', 'Jigsaw', 'Pennywise', 'Samara', 'Pinhead', 'Dracula', 'Leatherface'],
    //answers:['son'],
    numOfGuesses: 10,
    currentGuesses: '',
    playerIncorrectGuesses: [],
    playerCorrectGuesses: [],
    startGame: function(wrd) {
        this.currentGuesses = new Word((this.answers[Math.floor(Math.random() * this.answers.length)]).toLowerCase());
        console.log('\nHangman: Halloween Edition');
        console.log('\nGuess the horror movie villain!');
        console.log('\n' + this.currentGuesses.correctGuessStatus() + '\n');
    },
};//game object literal

function promptUser(){
    var syntax = /^[A-Za-z]+$/;
    inquirer.prompt([
        {
          name: "name",
          message: "Guess a letter?",
          type: "string",
          validate: function(name){
            if(name.match(syntax)&&(name.length === 1)){
                return true;
            }
            else{
                return false;
            }
          }//function
        }//prompt
      ]).then(function(response) {
        //Examines user input and sends a callback function in as an argument.
          //console.log("Name = "+response.name.toLowerCase());
          processInput(response.name.toLowerCase(), promptUser);
      });
}//promptUser

/*processInput function:
1)Keeps track of the player's remaining guesses and
2)Checks if the letter is in the word
3)Determines if the game is over
4)If game is not over then call promptUser again*/
function processInput(letterInput, callback){
    if(game.numOfGuesses > 0){
      //If guess is correct check if player has won.  If player has not won prompt him for more input
        if(game.currentGuesses.isGuessCorrect(letterInput)){
            var indexOfCorrectGuess = game.playerCorrectGuesses.indexOf(letterInput.toLowerCase());
            //If correct letter has already been entered ,don't say correct
            if (indexOfCorrectGuess > -1) {
                console.log("Already Entered\n");
            }
            else{
                console.log("Correct!\n");
            }
          //Always return current status
          console.log(game.currentGuesses.correctGuessStatus());
          //check if player has won
          if (hasPlayerWon()){
              return;
          }
          //Push the letter entered to Correct Guesses after it has been evaluated
          game.playerCorrectGuesses.push(letterInput.toLowerCase());
        }//if
        //If guess is not correct decrement the number of guesses and prompt the user for more input again
        else if (!game.currentGuesses.isGuessCorrect(letterInput)){
            //If letterGuessed is not in Answer and not in IncorrectGuesses, then reduce num of guesses
            var indexOfIncorrectGuess = game.playerIncorrectGuesses.indexOf(letterInput.toLowerCase());
            if (!(indexOfIncorrectGuess > -1)) {
                game.numOfGuesses--;
                console.log("Incorrect! "+ game.numOfGuesses+" guesses remaining.\n");
                //If guesses equals 0 end game
                if(hasPlayerLost()){
                    console.log('You lost!\n');
                    return;
                }
            }
            else{
                console.log("Already Entered\n");
            }
            //Always return Current Status
            console.log(game.currentGuesses.correctGuessStatus() + '\n');
            //Push the letter entered to Incorrect Guesses after it has been evaluated
            game.playerIncorrectGuesses.push(letterInput.toLowerCase());
        }//else
        //Callback to prompt: Should alway be called if NumofGuesses > 0, unless player has won the game
        callback();
      }//if
};

function hasPlayerWon(){
    if(game.currentGuesses.areAllLettersGuessed()){
       console.log('You Win!\n');
       return true; 
    }
    return false;
}

function hasPlayerLost(){
    if(game.numOfGuesses === 0){
        return true;
    }
    return false;
}

//Run Programe 
game.startGame();//function  
promptUser();