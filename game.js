

// function worldGameGuess()
var wordBank = ['vert','chocolat','blanc','rouge','jaune','orange','maron'];
var secretWord = wordBank[Math.floor(Math.random()*7)];

var displayWord = '';
while (displayWord.length < secretWord.length) {
    displayWord += '-'
}
    
var invalidKeys = ['1','2','3','4','5','6','7','8','9','0',"'",'/','[',']',',', '.','-','=',';','`','\\'];
var lettersGuessed = [];
var lordsBanished = 0;
var soulsLost = 0;
var guessesLeft = 10;
var hiddenButton = document.getElementById("warningButton");
var cancelKeypress = true;
var victoryBanner = document.getElementById("victoryBanner");
var defeatBanner = document.getElementById("defeatBanner");


document.getElementById("soulsLost").textContent = soulsLost;
document.getElementById("lordsBanished").textContent = lordsBanished;
document.getElementById("guessesLeft").textContent = guessesLeft;

//HELPERS
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

//GAME RESET
function gameReset() {
    hiddenButton.style.visibility = "hidden";
    guessesLeft = 10;
    lettersGuessed = [];
    secretWord = wordBank[Math.floor(Math.random()*17)];
    displayWord = '';
    while (displayWord.length < secretWord.length) {
        displayWord += '-'
    }
    document.getElementById('pentagramStatus').src = ('assets/images/pentagram0.jpg');
    document.getElementById("hangmanLine").textContent = displayWord;
    document.getElementById("displayGuesses").textContent = lettersGuessed;
    document.getElementById("guessesLeft").textContent = guessesLeft;
    defeatBanner.style.visibility = "hidden";
    victoryBanner.style.visibility = "hidden";
    document.addEventListener("keypress", gameplay)
}

//game LINE SETUP
document.getElementById("hangmanLine").textContent = displayWord;

//GAMEPLAY
document.addEventListener("keypress", gameplay) 
// document.onkeypress = function(event) {
function gameplay() {
    var keyPressed = String.fromCharCode(event.keyCode).toUpperCase();
    var hitIndices = [];
    if (secretWord.includes(keyPressed)) {
        //KEY PRESSED IS A HIT
                                   
        for(let i=0; i<secretWord.length ; i++) {
            if (secretWord[i] === keyPressed) hitIndices.push(i);
        };

        for(let j=0 ; j<displayWord.length ; j++) { //outer looping through displayWord
            for (let g=0 ; g<hitIndices.length ; g++) { //inner looping through hitIndices
                if (hitIndices[g]==j) {
                    displayWord = displayWord.replaceAt(j, keyPressed);
                }
            }
        };
        document.getElementById("hangmanLine").innerHTML = displayWord;
        if (displayWord === secretWord) {
            //GAME WIN
            lordsBanished += 1;
            document.getElementById("lordsBanished").textContent = lordsBanished;
            hiddenButton.style.visibility = "visible";
            victoryBanner.style.visibility = "visible";
            document.removeEventListener('keypress', gameplay);
        }
    } else if (invalidKeys.includes(keyPressed)) {
        //KEY PRESSED ISN'T A LETTER
        alert('The Lords of Hell do not concern themselves with numbers and punctuation.');
    } else {
        //KEY PRESSED IS A MISS
        if (!lettersGuessed.includes(keyPressed)) {
            lettersGuessed.push(keyPressed);
            document.getElementById("displayGuesses").textContent = lettersGuessed;
            document.getElementById('pentagramStatus').src = ('assets/images/pentagram'+ lettersGuessed.length + '.jpg');
            guessesLeft--;
            document.getElementById("guessesLeft").textContent = guessesLeft;
        }
        if (lettersGuessed.length == 10) {
            //GAME LOSS
            soulsLost += 1;
            document.getElementById("soulsLost").textContent = soulsLost;
            hiddenButton.style.visibility = "visible";
            defeatBanner.style.visibility = "visible";
            document.removeEventListener('keypress', gameplay);
        }
    };
};






 







//$(".clickMe").on("click", function(){
    //alert('clicked');
   // userguess  = true 

//  {


// }