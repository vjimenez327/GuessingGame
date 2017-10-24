var generateWinningNumber = function(){
  return Math.floor(Math.random() * 100) + 1;
}

var shuffle = function(array){
  var l = array.length;
  var temp, i;

  while(l-- > 0) {
    i = Math.floor(Math.random() * (l + 1));

    temp = array[l];
    array[l] = array[i];
    array[i] = temp;
  }

  return array;
}

function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
  return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
  if(this.playersGuess < this.winningNumber){
    return true;
  } else {
    return false;
  }
}

Game.prototype.playersGuessSubmission = function(number){
  if(number > 100 || number < 1 || typeof number !== "number"){
    throw "That is an invalid guess.";
  }
  this.playersGuess = number;
  return this.checkGuess();
}

Game.prototype.checkGuess = function(){
  if(this.playersGuess === this.winningNumber) { // why don't you need parentheses here to get a value?
    return "You Win!";
  } else {
    if(this.pastGuesses.indexOf(this.playersGuess) !== -1){
      return "You have already guessed that number."
    } else {
      this.pastGuesses.push(this.playersGuess);
      if(this.pastGuesses.length === 5){
        return "You Lose.";
      } else {
        var diff = this.difference();
        if(diff < 10){
          return "You\'re burning up!"
        } else if(diff < 25){
          return "You\'re lukewarm.";
        } else if (diff < 50){
          return "You\'re a bit chilly.";
        } else {
          return "You\'re ice cold!";
        }
      }
    }
  }
}

function newGame(){
  return new Game();
}

Game.prototype.provideHint = function(){
   var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
   return shuffle(hintArray);
}




$('document').ready(function(){
  var game = new Game();

  var eachGuess = function(game){
    var guess = $('#player-input').val();
    $('#player-input').val('');
    var output = game.playersGuessSubmission(parseInt(guess, 10));
    console.log(output);
  }

   $('#submit').click(function(){
      eachGuess(game);
   });

   $('#player-input').keypress(function(event){
     if(event.which === 13){
       eachGuess(game);
     }
   });


})
