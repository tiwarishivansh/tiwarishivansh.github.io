

function preload()
{
    img = loadImage('https://2.bp.blogspot.com/-Wo05s4IjSXI/W5FW_2PRCII/AAAAAAAAAMY/8jl8EndQwW0_JTniklX7g8AE-xdj97YagCLcBGAs/s320/Picture11.png');
   // myFont = loadFont('Images/EncodeSans-Light.ttf');
   // myFont2 = loadFont('Images/IndieFlower.ttf');
}


var inc = 0.1;
var scl = 10;
var cols,rows;

var zoff = 0;

var flowfield;

var particles = [];


function setup(){
  createCanvas(windowWidth ,windowHeight);
  colorMode(HSB,255);
  cols = floor(width/scl);
  rows = floor(height /scl);

  flowfield = new Array(cols * rows);


  for (var i = 0; i < 300; i++){
    particles[i] = new Particle();
  }
  background(255);

}


function draw(){
  var yoff = 0;
  for (var y = 0 ; y < rows; y++){
    var xoff = 0;

    for (var x = 0 ; x < cols; x++){
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1); //larger the value the more the particles wil follow the path
      flowfield[index] = v;
      xoff +=inc;
      stroke(0,50);
      
    }
    yoff += inc;
    zoff += 0.0003;
  }
  for (var i = 0; i < particles.length; i++){
  particles[i].follow(flowfield);
  particles[i].update();
  particles[i].edges();
  particles[i].show();
}
    
//    push();textSize(15);
//    fill(100,100);
//    textFont(myFont2);
//    text('<p>',415,180);
//    pop();
    
    
    push();
    fill(225,11);
    noStroke();
    rect(550, 290,510,100);
    pop();
    push();
    fill(225,11);
    noStroke();
    rect(500, 260,510,90);
    pop();push();
    fill(225,11);
    noStroke();
    rect(450, 200,510,90);
    pop();
    
    
    textSize(64);
    //textFont(myFont);
    push();
    fill(80);
    noStroke();
    text('About :',500,260);
    s = "";
   
    t = "Current Location : Pune, Maharastra";
    pop();
    fill(100);
    textSize(15);
    noStroke();
    
    text(s, 555, 310,500);
    textSize(25);
    text(t, 555, 380,550);
    push();
    image(img, width/20 - 50, -height/15, img.width/2, img.height/2);
    pop();
    
    
    
//    push();textSize(15);
//    fill(100,100);
//    textFont(myFont2);
//    text('</p>',415,300);
//    pop();
}

function Particle(){
  this.pos = createVector(random(width),random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0,0);
  this.maxspeed = 4;
  this.h = 0;

  this.prevPos = this.pos.copy();

  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.follow = function(vectors){
    var x = floor(this.pos.x / scl);
     var y = floor(this.pos.y / scl);
     var index = x + y * cols;
     var force = vectors[index];
     this.applyForce(force); //base on my x y pos scale into grid and look up the corresponding vector and apply it as a force
  }

  this.applyForce = function(force){
    this.acc.add(force);
  }

  this.show = function(){
    stroke(this.h,255,255,25);
    this.h = this.h +1;
    if(this.h >255){
      this.h =0;
    }
    strokeWeight(1)
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
