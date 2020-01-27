
//Basic Variables:

	//determines in which difficulty mode we are in:
	//6 === hard, 3 === easy;
	var numSquares = 6;

	//colors to be assigned to each square:
	var colors = [];

	//determining which of the colors will be the one that the user has to guess:
	var pickedColor;


//SELECT:

	//selecting the text that shows the picked color:
	var pickedColorDisplay = document.getElementById("pickedColorDisplay");

	//selecting the message element:
	var messageDisplay = document.querySelector("#message");

	//selecting the h1 to later alter its background color:
	var h1 = document.querySelector("h1");


	//selecting the square elements:
	var squares = document.querySelectorAll(".square");

	//selecting the button to later add a reset functionality to it:
	var resetButton = document.querySelector("#reset");

	//selecting the easy and hard mode buttons to do the same as above:
	var modeButtons = document.querySelectorAll(".mode");



init();



function init(){

	
	setUpModeButtons();


	setUpSquares();


	setUpResetButton();


	resetGame();


}

function setUpModeButtons(){

	for(var i = 0; i< modeButtons.length; ++i){

		modeButtons[i].addEventListener("click", function(){

			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");

			this.classList.add("selected");

			//another way of write a (if) (else) structure:
			// this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			
			if(this.textContent === "Easy"){
				numSquares = 3;
			}else{
				numSquares = 6;
			}

			//run initial code to prepare the game:
			resetGame();

		});
	}

}

function setUpSquares(){

	for(var i = 0; i < squares.length; ++i){

		//!!use backgroundColor instead of background,
		//cuz it's compatible with all browsers!!

		squares[i].addEventListener("click", function (){

			var clickedColor = this.style.backgroundColor;

			console.log(clickedColor, pickedColor);
			
			if(clickedColor === pickedColor){

				messageDisplay.textContent = "Correct!";

				//used to make all other squares get the correct color.
				matchCorrectColor(clickedColor);

				h1.style.backgroundColor = clickedColor;

				resetButton.textContent = "Play Again!";

			}else{

				this.style.backgroundColor = "#232323";

				messageDisplay.textContent = "Try again!";

			}

		});
	}

}


function setUpResetButton(){

	//MANIPULATE: reset functionality:
	resetButton.addEventListener("click", function (){
	
		resetGame();

	});

}


function resetGame(){

	//generate new colors:
	colors = arrOfRandomColors(numSquares);

	//pick a new random color to be guessed from the array.
	pickedColor = pickRandomColor();

	//change the color at h1 to be the new one picked:
	pickedColorDisplay.textContent = pickedColor;

	//to paint the squares with the new colors:
	for(var i = 0; i < squares.length; ++i){
		//we use this condition cuz undefined it's false. So if there is a value at that position the condition is true:
		if(colors[i]){

			squares[i].style.display = "block";

			squares[i].style.backgroundColor = colors[i];
		
		}else{

			squares[i].style.display = "none";
		}
	}

	//changing the h1 color back to normal:
	h1.style.backgroundColor = "steelblue";

	//setting properly the text inside the button:
	resetButton.textContent = "New Colors";

	//reset the message:
	messageDisplay.textContent = "";
}



function matchCorrectColor(color){

	for(var i = 0 ; i < squares.length; ++i){

		squares[i].style.backgroundColor = color;
	}


}

//used to pick a random color from the colors array:
function pickRandomColor(){

	var random = Math.floor(Math.random() * colors.length); // * 6 + 0
	//random numbers between:  [0, 6)

	return colors[random];
}

//Math.random() generates a random number between
//0 and 1

//Generating a random number - [min, max)   :

//function getRandomArbitrary(min, max) {
  //return Math.random() * (max - min) + min;
//}

//Math.floor(x) (returns the smallest integer next to x);
//ex: Math.floor(45.95); //45
//    Math.floor(-45.95) //-46


function arrOfRandomColors(number){
	//make an array of 'number' random colors, and return it.

	var arr = [];

	for(var i = 0; i < number; ++i){

		arr[i] = generateRandomColor();

	}


	return arr;
}

function generateRandomColor(){
	//pick a 'red' from 0-255.
	//pick a 'green' from 0-255.
	//pick a 'blue' from 0-255.

	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	//format: rgb(r, g, b)
	var colorString = "rgb(" + r + ", " + g + ", " + b + ")";

	return colorString;
}

