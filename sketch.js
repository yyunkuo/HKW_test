let capture = null;
let tracker = null;
let positions = null;
let img_w = 120;
let img_h = 40;
let webBoolen = true;
let colorBackground = false;

function preload(){
  img = loadImage('yukiko.png');
}
function setup() {
  
  //slider
  slider = createSlider(0, 500, 120);
  slider.style('width', '200px','height', '120px');
  slider.addClass("mySliders");
  
  // load Yukiko
  img.loadPixels();
  
  w = windowWidth;
  h = windowHeight;
  capture = createCapture(VIDEO);
  canvas = createCanvas(w, h);
  canvas.parent('sketch-holder');
  capture.size(w, h);
  capture.hide();

  frameRate(10);
  colorMode(HSB);
  background(0);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  slider.position(windowWidth/2 - 100, 72);
  // Flip the canvas so that we get a mirror image
  translate(w, 0);
  scale(-1.0, 1.0);
  
  // Link image's width with slider
  img_w = slider.value();
  img_h = img_w * 0.482;

  if(webBoolen) {
    // webcam image
    image(capture, 0, 0, w, h);  
  } 
  
  positions = tracker.getCurrentPosition();

  if (positions.length > 0) {

    // Eye points from clmtrackr:
    // https://www.auduno.com/clmtrackr/docs/reference.html
    const eye1 = {
      outline: [23, 63, 24, 64, 25, 65, 26, 66].map(getPoint),
      center: getPoint(27),
      top: getPoint(24),
      bottom: getPoint(26)
    };
    const eye2 = {
      outline: [28, 67, 29, 68, 30, 69, 31, 70].map(getPoint),
      center: getPoint(32),
      top: getPoint(29),
      bottom: getPoint(31)
    }
    
    const irisColor = color(random(360), 80, 80, 0.4);
    drawEye(eye1, irisColor);
		drawEye(eye2, irisColor);
  }
}

function getPoint(index) {
  return createVector(positions[index][0], positions[index][1]);
}

function drawEye(eye, irisColor) {
  image(img, eye.center.x - img_w * 0.5, eye.center.y - img_h * 0.5, img_w, img_h);
}


function windowResized() {
  w = windowWidth;
  h = windowHeight;
  resizeCanvas(w, h);
  background(0);
}

function keyTyped() {

  if(key==='1') {
    webBoolen = false;
    background('rgb(220, 0, 0)');  
  }
  if(key==='2') {
    webBoolen = false;
    background('rgb(0, 220, 0)'); 
  }

  if(key==='3') {
    webBoolen = false;
    background('rgb(0, 0, 220)'); 
  }
  
  if(key==='0') {
    webBoolen = true;
  }

  if(key==='s'){
    const timestamp = timestampString();
    saveCanvas("yun_and_yukiko" + timestamp, "png");
  }
  
}
