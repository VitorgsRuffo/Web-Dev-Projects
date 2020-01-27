
var buttonP1 = document.querySelector("#p1");
var buttonP2 = document.getElementById("p2");
var resetButton = document.querySelector("#reset");
var numInput = document.getElementsByTagName("input")[0];
var winningScoreDisplay = document.querySelector("p span");

var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");

var p1Score = 0;
var p2Score = 0;

var gameOVer = false;
var winningScore = 5;


buttonP1.addEventListener("click", function (){
	
	if(!gameOVer){
		
		++p1Score;
		
		if(p1Score === winningScore){
			p1Display.classList.add("winner");
			gameOVer = true;
		}

		p1Display.textContent = p1Score;
	}
});


buttonP2.addEventListener("click", function (){

	if(!gameOVer){
		
		++p2Score;

		if(p2Score === winningScore){
			p2Display.classList.add("winner");
			gameOVer = true;
		}

		p2Display.textContent = p2Score;
	}
	
});


resetButton.addEventListener("click", function (){

	reset();

});


numInput.addEventListener("change", function (){ 

	//change event occurs whenever the value of input changes, no matter how it changes.
	//(by clicking the arrows or by typing, for example)

	winningScoreDisplay.textContent = numInput.value; 
	//we could replace numInput for the word 'this', cuz as we saw this are refering to the element that we are adding a listener to.

	//as numInput's value is a string we have to convert it into a number:
	winningScore = Number(numInput.value);

	reset();
});



function reset(){

	gameOVer = false;

	p1Score = 0;
	p2Score = 0;

	p1Display.textContent = 0;
	p2Display.textContent = 0;

	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
}