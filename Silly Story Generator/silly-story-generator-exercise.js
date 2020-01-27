
//Selecting necessary elements:

	let customName = document.querySelector("#customname");

	let radioInputs = document.querySelectorAll("input[type='radio']");

	let generationButton = document.querySelector(".randomize");

	let paragraph = document.querySelector(".story");


//Story variables:

	let rawStory = ["It was <span id='temp'>94 fahrenheit</span> outside, so ",
				" went for a walk. When they got to ",
				", they stared in horror for a few moments, then ",
				". ",
				" saw the whole thing, but was not surprised — ",
				" weighs <span id='weight'>300 pounds</span>, and it was a hot day."];

	let finalStory;
		

	let arr0 = ["Willy the Goblin", "Big Daddy", "Father Christmas"];

	let arr1 = ["the soup kitchen", "Disneyland", "the White House"];

	let arr2 = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

	let randomIndexes = [];


//Functionalities:

	function generaterRandomIndex(){

		randomIndexes[0] = Math.floor(Math.random() * 3 + 0);

		randomIndexes[1] = Math.floor(Math.random() * 3 + 0);

		randomIndexes[2] = Math.floor(Math.random() * 3 + 0);

	}


	function buildStory(){

		finalStory = rawStory[0] + arr0[randomIndexes[0]] + rawStory[1] + arr1[randomIndexes[1]] + rawStory[2] + arr2[randomIndexes[2]] + rawStory[3];

		if(customName.value !== ""){
			finalStory += customName.value;
		}else{
			finalStory += "Bob";
		}

		finalStory += rawStory[4] + arr0[randomIndexes[0]] + rawStory[5];
	}


	function dealWithUnits(){

		let temperature = document.querySelector("#temp");

		let weight = document.querySelector("#weight");


		//US units:
		if(radioInputs[0].checked){

			temperature.textContent = "94 fahrenheit";

			weight.textContent = "300 pounds";

		//UK units:
		}else{

			temperature.textContent = "34 celcius";

			weight.textContent = "130 kilograms";

		}


	}


	function generateStory(){

		generaterRandomIndex();

		buildStory();


		paragraph.innerHTML = finalStory;

		paragraph.style.visibility = "visible";


		customName.value = "";


		dealWithUnits();
	}

	
	generationButton.addEventListener("click", generateStory);