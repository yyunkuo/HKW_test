let capture = null;
let tracker = null;
let positions = null;
let img_w = 120;
let img_h = 40;
let webBoolen = true;
let colorBackground = false;
let txt;
let box;
let face_w;
let value2 = 1;
var state = false;
var addNew = true;
var f;

function setup() {
  
  w = windowWidth;
  h = windowHeight;
  capture = createCapture(VIDEO);
  canvas = createCanvas(w, h);
  canvas.parent('sketch-holder');
  capture.size(w, h);
  capture.hide();

  frameRate(25);
  colorMode(HSB);
  background(0);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);

  txt = select(".text");
  box = select(".box");

  f = new p5.Filt();
  f.set('lowpass', 3, 0.7);
}

function draw() {
  
  push();
  // Flip the canvas so that we get a mirror image
  translate(w, 0);
  scale(-1.0, 1.0);

  // webcam image
  if(webBoolen) {  
    image(capture, 0, 0, w, h);  
  } 

  // Give paremeters to text
  let wght =  50;
  let txtsize = map(mouseX, 0, width, 10, 15);
  txt.style( "font-variation-settings", `'wght' ${wght}`);
  // txt.style( 'font-size', txtsize + 'em');

  // Face Recognition
  positions = tracker.getCurrentPosition();

  if (positions.length > 0) {
    // Eye points from clmtrackr:
    // https://www.auduno.com/clmtrackr/docs/reference.html
    const face = {
      center: getPoint(41),
      top: getPoint(33),
      left: getPoint(1),
      right: getPoint(13)
    }

    const eye_right = {
      outline: [28, 67, 29, 68, 30, 69, 31, 70].map(getPoint),
      center: getPoint(32),
      top: getPoint(29),
      buttom: getPoint(31)
    }

    const mouth = {
      left: getPoint(44),
      right: getPoint(50),
      top: getPoint(60),
      buttom: getPoint(57)
    }

    face_w = f.tick(face.right.x - face.left.x);
    
    
    drawTopDeco(face);

    // forward animation with right eye
    /*
    let eye_size_r = (eye_right.buttom.y - eye_right.top.y) / w;
    console.log( eye_size_r);
    
    if (eye_size_r < 0.0102) {
      if (value2 < 600) {
        value2 = value2 + 10;
      } else {
        value2 = 1;
      }
    }
    */

    if (mouth.buttom.y- mouth.top.y > 3) {
      if (value2 < 600) {
        value2 = value2 + 10;
      } else {
        value2 = 1;
      }
    }
    

    ellipse(mouth.left.x, mouth.left.y, 12);
    // for mobile
    if(windowWidth<500){
      eye_size_r = (eye_right.buttom.y - eye_right.top.y) / face_w * 10000;
      if (eye_size_r < 630) {
        if (value2 < 800) {
          value2 = value2 + 10;
        } else {
          value2 = 1;
        }
      }
    }
    txt.style( "font-variation-settings", `'wght' ${value2}`);
    pop();
    textSize(50);
    text(mouth.buttom.y- mouth.top.y, 10, 50);
  }
}

function getPoint(index) {
  return createVector(positions[index][0], positions[index][1]);
}

function drawTopDeco(input, irisColor) {
  box.style('top', input.center.y - 150 + 'px')
  box.style('left', width-input.center.x + 10 + 'px')
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
    saveCanvas("yun_and_yukiko.png");
  }
  
}
