
/*
//check off specific todos by clicking:

	$("li").click(function(){
		
		//if the li is gray then turn it into black:
		if($(this).css("color") === "rgb(128, 128, 128)"){ //gray
			
			$(this).css({
				color: "black", 
				textDecoration: "none"
			});
		
		//if is't black turn it into gray:
		}else{
			
			$(this).css({
				color: "gray", 
				textDecoration: "line-through"
			});
		}

		

	});

	*/


	//All the code above can be replaced by just:

	//$("li").click(function(){

		//$(this).toggleClass("completed");

	//});



	//But the way above will not handle future added
	//new todos(lis) so we have to use .on method:

	//we can only use on method on element that will be 
	//in the page in the just beggining so we can not
	//attach it to li's directly:

	$("ul").on("click", "li", function(){

		$(this).toggleClass("completed");

	});

	//we are saying: go inside uls (that are on the page when it loads) and attach a click event
	//to all li's (that may or may not be on the page when it loads), even the future added ones, and run that function when the events happens.

//Same here:

//Click on X to delete todo:
	
	$("ul").on("click", "span", function(event){

	//$("span").click(function(event){



		//just this will remove only the span and not the intire li:
		//$(this).remove();

		//to fix that we can use the .parent() method that gives us the closest parent of the element:
		//$(this).parent().remove();

		//let's add some fading:


		$(this).parent().fadeOut(300, function(){

			//inside a fadeOut $(this) will refer to the element that is being faded out.
			//so this here refers to the parent li of the clicked span.
			$(this).remove();
		});


		//stops the event bubbling phenomenon:
		event.stopPropagation();
	});



//Create todo functionality:

	$("input[type='text']").keypress(function(event){
		
		//when user hit the enter key:
		if(event.which === 13){ //i.e, === enter key
			
			//grab new todo text:

			var todoText = $(this).val();
			//this refers to the input that the keypress event occurred in.

			//reseting the input content:
			$(this).val("");

			//create a new li an add to ul:
			$("ul").append("<li><span><i class='fas fa-trash'></i></span> " + todoText + "</li>");	
			//append method will add html to the end of the selected element.


		}

	});


//toggle input plus button:

	$(".fa-plus-circle").click(function(){

		$("input[type='text']").fadeToggle();

	});