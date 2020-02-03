
const canvas = document.querySelector('canvas');

//gives us a context where we're gonna draw in. ctx will be the drawing area of the canvas.
const ctx = canvas.getContext('2d');


//we set the canvas width and height and constants width and height
//to be equal to the ones of the browser viewport (area where the web page appears on).
const width = canvas.width = window.innerWidth;

const height = canvas.height = window.innerHeight;



function random(min,max) {

	const num = Math.floor(Math.random()*(max-min + 1)) + min;

    return num;
}


	//we'll have balls that have the same features so let's create an object to represent 'em.
	//Ball object constructor:
	function Ball(x, y, velX, velY, color, size){

		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.color = color;
		this.size = size;
	}


	//drawing function: the cxt(context) it's like our paper.
	Ball.prototype.draw = function(){

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
	Ball.prototype.update = function(){

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


	Ball.prototype.collisionDetect = function(){

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

	//now we'll instantiate 25 balls with random features and store them inside an array:
		
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
				//color
				"rgb(" + random(0,255) + "," + random(0,255) + "," + random(0,255) + ")",
				//size
				size
			);	

			balls.push(ball);
		}
		

	//animation loop:
	function loop(){

		//all of this will cover the previous drawings: as if it erases past frames to be able to redraw new ones.
			//a color to be used in our paper drawing
			ctx.fillStyle = "rgba(0, 0, 0, 0.25)";

			//draws a rectangle starting at cordinates (0,0) and going through all the window
			ctx.fillRect(0, 0, width, height);
			//finally fills it with the above specified color.

		for(let i = 0; i < balls.length; i++){

			balls[i].draw();
			balls[i].update();
			balls[i].collisionDetect();
		}

		
		requestAnimationFrame(loop);
	}


	loop();
