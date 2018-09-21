
var counter = 0; 

var cw = 1.4;

var WW = 520;
var WH = 420;

var rainToSetup = [];
var rain = [];
var particles = [];

function setup() {
	createCanvas(WW, WH);
	
	for(var i=0; i<30; i++) {
		rain.push(new RainDrop()); 
		rain[i].setup();
	}
}

function Particle() {
	
	this.setup = function(x, y, w) {
		//this.TTL = 20 * random(-3, 7);
		
		this.groudY = y + w;
		
		this.x = x;
		this.y = y;
		
		this.w = w * 0.6;
		
		this.col = w*10;
		
		var alpha = random(-Math.PI/8, Math.PI/8);
		var beta = random(-Math.PI/8, Math.PI/8);
		
		/*
		this.velX = this.w * sin(theta);
		this.velY = -this.w * cos(theta);
		*/
		
		this.velX = this.w * sin(alpha) * cos(beta);
		this.velY = -this.w * cos(alpha); //-Math.abs(this.w * sin(alpha) * sin(beta));
		this.velZ = 1; //this.w * cos(alpha);
		/*
		var ax = Math.abs(sin(theta));
		var b = 1 - ax;
		
		this.velZ; //= random(0.95, 1.05); // <0.95, 1.05>
		*/
	}
	
	this.draw = function() {		
		if(this.y > this.groudY) {
			this.destroy();
		}else {
			this.velY += 0.8;
			
			this.x += this.velX;
			this.y += this.velY;
			this.w *= this.velZ;
			
			this.w *= this.velZ;
		
			if(this.y > WH) {
				this.destroy();
			}else {
				fill(0, 0, this.col);
				ellipse(this.x, this.y, this.w*0.6);
			}
		}
	}
	
	this.destroy = function() {
		particles.pop(this);
	}
}

function RainDrop() {

	this.setup = function() {
		this.w = random(2, 10);
		this.h = this.w*10;
		
		this.x = random(WW);
		this.y = -this.h;
		
		var v = this.w*4;
		
		this.vel = random(v-1, v+2);
	}
	
	this.draw = function() {
		this.velY += 0.1;
		this.y += this.vel;
		
		if(this.y >= WH-(300/this.w)) {
			this.destroy();
		}else {
			//fill(255);
			fill(0, 0, 10*this.w);
			//rect(this.x, this.y, this.w, this.h, this.w/2);
			
			for(var i=0; i<this.w*2; i++) {
				ellipse(this.x, this.y+i*2, i*0.3);
			}
		}
	}
	
	this.destroy = function() {
		for(var i=0; i<this.w; i++) {
			var p = new Particle();
			p.setup(this.x, this.y, this.w);
			particles.push(p);
		}
		
		rainToSetup.push(this);
	}
}

function draw() {
	background(200);
	noStroke();
	
	fill(180);
	rect(0, WH-80, WW, 80);
	
	for(var i=0; i<rainToSetup.length; i++) {
		var drop = rainToSetup[i];
		drop.setup();
	}
	
	rainToSetup = [];
	
	for(var i=0; i<rain.length; i++) {
		rain[i].draw();
	}
	
	for(var i=0; i<particles.length; i++) {
		particles[i].draw();
	}
	
	/*
	for(var i=0; i<1000000; i++) {
		for(var j=0; i<1000000; i++) {
			random(0, 1000);
		}
	}
	*/
}

function draw3() {
	noStroke();
	for(var i=0; i<WW; i++) {
		//fill(i, i/4, i/8);
		fill(i/cw);
		rect(i, 0, cw, WH);
	}
}



function draw2() {
	
	for(var i=0; i<500; i++) {
		//background(255, 0, 255);
		//fill(counter%256, 160, 160);
		noStroke();	
		
		var r = (50 * Math.floor(counter/(256*256)))%256;
		var g = Math.floor((counter%(256*256))/256);
		var b = Math.floor(counter%256);
		
		fill(r, g, b);
		
		rect(b*cw, g*cw, cw, cw);
		
		
		/*
		text(counter, 20, 100);
		stroke(255, 255, 0);
		ellipse(mouseX, mouseY, 60);
		rect(20, 20, 100, 50);
		
		textSize(12);
		
		text(r, 20, 120);
		text(g, 20, 135);
		text(b, 20, 150);
		
		var flag = r*256*256 + g*256 + b == counter ? "true" : "false";
		text(flag, 20, 180);
		
		*/
		
		counter += 1;
	}
}