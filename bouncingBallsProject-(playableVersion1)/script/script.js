
const canvas = document.querySelector('canvas');

//gives us a context where we're gonna draw in. ctx will be the drawing area of the canvas.
const ctx = canvas.getContext('2d');


//we set the canvas width and height and constants width and height
//to be equal to the ones of the browser viewport (area where the web page appears on).
const width = canvas.width = window.innerWidth;

const height = canvas.height = window.innerHeight;


const p = document.querySelector("p");

let ballsAlive = 0;


function random(min,max) {

	const num = Math.floor(Math.random()*(max-min + 1)) + min;

    return num;
}


	
	function Shape(x, y, velX, velY, exists){

		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.exists = exists;
	}


	//drawing function: the cxt(context) it's like our paper.
	Shape.prototype.draw = function(){

		//states that we'll draw a shape on the paper.
		ctx.beginPath();

		//color the shape will be.
		ctx.fillStyle = this.color;

		//x, y: arc's center; size: arc's radius; last two: start and end number of degrees(radians) in a circle where the arc will be drawn in between.
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //=== 0 till 360 degrees.
		//2 * PI radians == 360 degrees

		//finishes the drawing path we started with the first statement,
		//and fills the drawing with the color specified in fillStyle property.
		ctx.fill();	
	}


	//ball updating function:
	Shape.prototype.update = function(){

		//limiting horizontal ball movement:
		if((this.x + this.size) >= width){

			this.velX = -(this.velX);
		}

		if((this.x - this.size) <= 0){
			this.velX = -(this.velX);
		}


		//limiting vertical ball movement:
		if((this.y + this.size) >= height){

			this.velY = -(this.velY);
		}

		if((this.y - this.size) <= 0){
			this.velY = -(this.velY);
		}

		this.x += this.velX;
		this.y += this.velY;

	}


	Shape.prototype.collisionDetect = function(){

		for(let j = 0; j < balls.length; j++){

			if(!(this === balls[j])) {

				const dx = this.x - balls[j].x;
				const dy = this.y - balls[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < this.size + balls[j].size) {
					balls[j].color = this.color = "rgb(" + random(0, 255) + "," + random(0,255) + "," + random(0, 255) + ")";
				}

			}

		}

	}


	function Ball(x, y, velX, velY, exists, color, size){
		
		//inheriting the Shape constructor properties:	
		Shape.call(this, x, y, velX, velY, exists);

		this.color = color;
		this.size = size;

	}

	//inheriting the Shape methods:
	Ball.prototype = Object.create(Shape.prototype); 

	Ball.prototype.constructor = Ball;






	function EvilCircle(x, y, exists){

		Shape.call(this, x, y, 20, 20, exists);

		this.color = "white";
		this.size = 10;

	}

	EvilCircle.prototype = new Object({});

	EvilCircle.prototype.constructor = EvilCircle;


	EvilCircle.prototype.draw = function(){


		//states that we'll draw a shape on the paper.
		ctx.beginPath();

		//color the line around the shape will be.
		ctx.strokeStyle = this.color;

		//making the line a little thicker.
		ctx.lineWidth = 3;

		//x, y: arc's center; size: arc's radius; last two: start and end number of degrees(radians) in a circle where the arc will be drawn in between.
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //=== 0 till 360 degrees.
		//2 * PI radians == 360 degrees

		//finishes the drawing path we started with the first statement,
		//and fills the drawing with the color specified in fillStyle property.
		ctx.stroke();	

	}


	EvilCircle.prototype.checkBounds = function(){


		//limiting horizontal ball movement:
		if((this.x + this.size) >= width){

			this.x -= this.size;
		}

		if((this.x - this.size) <= 0){
			this.x += this.size;
		}


		//limiting vertical ball movement:
		if((this.y + this.size) >= height){

			this.y -= this.size;
		}

		if((this.y - this.size) <= 0){
			this.y += this.size;
		}
		
	}

	EvilCircle.prototype.setControls = function (){

		//this: refers to the object that is calling setControls().
		let _this = this;
		//we need to save its value in a var to use that reference later on the event handler function.

		//because inside it 'this' would refer to the object the event happend on. (in the case the window object)

		window.onkeydown = function(event) {

		    if (event.key === 'a') {
		      _this.x -= _this.velX;
		    } else if (event.key === 'd') {
		      _this.x += _this.velX;
		    } else if (event.key === 'w') {
		      _this.y -= _this.velY;
		    } else if (event.key === 's') {
		      _this.y += _this.velY;
		    }
  		}

	}


	EvilCircle.prototype.collisionDetect = function (){

		for(let j = 0; j < balls.length; j++){

			if(balls[j].exists) {

				const dx = this.x - balls[j].x;
				const dy = this.y - balls[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < this.size + balls[j].size) {
					balls[j].exists = false;
					--ballsAlive;
				}

			}

		}

	}




	//now we'll instantiate 25 balls with random features and store them inside an array.
	let balls = [];

	while(balls.length < 25){

		let size = random(10, 20);

		let ball = new Ball(

			//x cordinate
			random(0 + size, width - size),
			//y codinate
			random(0 + size, height - size),
			//velx
			random(-7, 7),
			//vely
			random(-7, 7),
			//exits
			true,
			//color
			"rgb(" + random(0,255) + "," + random(0,255) + "," + random(0,255) + ")",
			//size
			size
		);	

		balls.push(ball);

		++ballsAlive;
	}


	//let's instantiate an EvilCircle object:
	let evil = new EvilCircle(

		random(10, width - 10),
		random(10, height - 10),
		true
	);

	evil.setControls();
		

	//animation loop:
	function loop(){

		//all of this will cover the previous drawings: as if it erases past frames to be able to redraw new ones.
			//a color to be used in our paper drawing
			ctx.fillStyle = "rgba(0, 0, 0, 0.25)";

			//draws a rectangle starting at cordinates (0,0) and going through all the window
			ctx.fillRect(0, 0, width, height);
			//finally fills it with the above specified color.

		for(let i = 0; i < balls.length; i++){

			if(balls[i].exists){

				balls[i].draw();
				balls[i].update();
				balls[i].collisionDetect();
			}
		}

		evil.draw();

		evil.checkBounds();

		evil.collisionDetect();

		p.textContent = "Ball count: " + ballsAlive;

		//creates an recursive infinite loop:
		requestAnimationFrame(loop);
	}


	loop();
