// Starting point: https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm 🙏

let capture = null;
let tracker = null;
let positions = null;
let w = 0, h = 0;
let img_w = 120;
let img_h;
let value;
let slider;
var canvas;


function preload() {
  img = loadImage('yukiko.png');
}

function setup() {
  //slider
  slider = createSlider(0, 500, 120);
  slider.position(10, 10);
  slider.style('width', '200px');
  slider.position(windowWidth/2 - 100, 10);

  img.loadPixels();
  
  w = windowWidth;
  h = windowHeight;
  capture = createCapture(VIDEO);
  canvas = createCanvas(w, h);
  canvas.parent('sketch-holder');
  // createCanvas(w, h);
  capture.size(w, h);
  capture.hide();

  frameRate(10);
  colorMode(HSB);
  background(0);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
  
  background(255);
}

function draw() {
  img_w = slider.value();
  // Flip the canvas so that we get a mirror image
  translate(w, 0);
  scale(-1.0, 1.0);
  // Uncomment the line below to see the webcam image (and no trail)
  
  positions = tracker.getCurrentPosition();
  

  if (positions.length > 0) {

    // Eye points from clmtrackr:
    // https://www.auduno.com/clmtrackr/docs/reference.html
    
    const face = {
      outline: [1, 13].map(getPoint),
      left: getPoint(1),
      right: getPoint(13)
    };
    
    let faceSize = face.right.x-face.left.x; 
    faceSize = map(faceSize,150,380, 1, 10); 
    
    img_h = img_w * 0.482;
    
    
    //left eye
    const eye1 = {
      outline: [23, 63, 24, 64, 25, 65, 26, 66].map(getPoint),
      center: getPoint(27),
      top: getPoint(24),
      bottom: getPoint(26)
    };
    
    //right eye
    const eye2 = {
      outline: [28, 67, 29, 68, 30, 69, 31, 70].map(getPoint),
      center: getPoint(32),
      top: getPoint(29),
      bottom: getPoint(31)
    }

    value = eye1.x;
     
    const irisColor = color(random(360), 80, 80, 0.8);
    if (eye1.center.y < windowHeight/3) { 
      image(capture, 0, 0, w, h);
    } 
    drawEye(eye1, irisColor);
    drawEye(eye2, irisColor);  
    stroke(0,255,0);
    strokeWeight(2);
    line(0, windowHeight/3, windowWidth, windowHeight/3);
    noFill();
  }
}

function getPoint(index) {
  return createVector(positions[index][0], positions[index][1]);
}

function drawEye(eye, irisColor) {
  image(img, eye.center.x - img_w * 0.5, eye.center.y - img_h * 0.5, img_w, img_h);
}

function keyTyped() {

  if(key==='1') {
    img_w = 100; 
    background('rgb(220, 0, 0)');  
  }
  if(key==='2') {
    background('rgb(0, 220, 0)'); 
  }

  if(key==='3') {
    background('rgb(0, 0, 220)'); 
  }

  if(key==='s'){
    const timestamp = timestampString();
    saveCanvas("yun_and_yukiko" + timestamp, "png");
  }
  
}

function timestampString() {
  return year() + nf(month(), 2) + nf(day(), 2) + "-" + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
}

function windowResized() {
  w = windowWidth;
  h = windowHeight;
  resizeCanvas(w, h);
  background(0);
}