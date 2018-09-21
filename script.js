
var counter = 0; 

var cw = 1.4;

var WW = window.innerWidth;
var WH = window.innerHeight - 4;

var rainToSetup = [];
var rain = [];
var particles = [];

function setup() {
	createCanvas(WW, WH);
	
	for(var i=0; i<100; i++) {
		rain.push(new RainDrop()); 
		rain[i].setup();
	}
}

function Particle() {
	
	this.setup = function(x, y, w) {
        this.life = 10;
		this.TTL = this.life * random(-3, 4);
		
		this.x = x;
		this.y = y;
		
		this.w = w;
	}
	
	this.draw = function() {
        this.TTL--;
      
		if(this.TTL < 0) {
			this.destroy();
		}else {
			this.w += 2;

            fill(0, 0, this.col, 100);
            ellipse(this.x, this.y, this.w, this.w*0.3);
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
		this.velY += 1;
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
    var groundH = 160;
	rect(0, WH-groundH, WW, groundH);
	
	for(var i=0; i<rainToSetup.length; i++) {
		var drop = rainToSetup[i];
		drop.setup();
	}
	
	rainToSetup = [];
	
	for(var i=0; i<rain.length; i++) {
		rain[i].draw();
	}
  
    noFill();
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