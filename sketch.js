// Finds eyes from webcam and draws a representation of them on
// the canvas, with random colors for the irises. Click on the
// canvas to save an image; press a key to clear the canvas.

// Starting point: https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm 🙏

let capture = null;
let tracker = null;
let positions = null;
let w = 0, h = 0;
let img_w, img_h;


function preload(){
  img = loadImage('yukiko.png');
  img2 = loadImage('hireme2.png');
}
function setup() {
  // setup() waits until preload() is done
  img.loadPixels();
  img2.loadPixels();
  
  w = windowWidth;
  h = windowHeight;
  capture = createCapture(VIDEO);
  createCanvas(w, h);
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
  push();
  // Flip the canvas so that we get a mirror image
  translate(w, 0);
  scale(-1.0, 1.0);
  // Uncomment the line below to see the webcam image (and no trail)
  
  positions = tracker.getCurrentPosition();
  

  if (positions.length > 0) {

    // Eye points from clmtrackr:
    // https://www.auduno.com/clmtrackr/docs/reference.html
    //face
    const face = {
      outline: [1, 13].map(getPoint),
      left: getPoint(1),
      right: getPoint(13)
    };
    
    let faceSize = face.right.x-face.left.x; 
    faceSize = map(faceSize,150,380, 1, 10); 
    img_w = windowWidth * 0.08 * faceSize; 
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
     const eyeBrown1 = {
      outline: [18,17,16,15].map(getPoint),
      center: getPoint(32),
      top: getPoint(29),
      bottom: getPoint(31)
    }
  
    const eyeBrown2 = {
      outline: [19,20,21,22].map(getPoint),
      center: getPoint(32),
      top: getPoint(29),
      bottom: getPoint(31)
    }
     
    const irisColor = color(random(360), 80, 80, 0.8);
    if (eye1.center.y < windowHeight/3) {
      //background(255);  
      image(capture, 0, 0, w, h);
       stroke(0,255,0);
      strokeWeight(2);
      line(0, windowHeight/3, windowWidth, windowHeight/3);
  noFill();
  rectMode(CENTER);
  rect(windowHeight,windowHeight/6,windowHeight/3 - 10,windowHeight/3 - 10);
      print('test');
      if(eye2.center.x < 4 * windowWidth/ 5) {
        drawEye(eye1, eyeBrown1, irisColor);
	    drawEye(eye2, eyeBrown2, irisColor);  
      } else {
        image(img2, 30, 50, 448,606);
      }
      
    }
    
    
    if (eye1.center.y >= windowHeight/3) {
      
      drawEye(eye1, eyeBrown1, irisColor);
	  drawEye(eye2, eyeBrown2, irisColor); 
    } 
  }
 
}

function getPoint(index) {
  return createVector(positions[index][0], positions[index][1]);
}

function hireme(eye1, eye2, h, i, r, e1, m, e2, end1, end2) {
  // image(h, eye1.center.x, eye1.center.y, 50, 50);
  image(img, eye1.center.x - img_w * 0.5, eye1.center.y - img_h * 0.5, img_w, img_h);
}

function drawEye(eye, eyeBrown, irisColor) {
  noFill();
  stroke(255, 0.4);
  drawEyeBrownOutline(eyeBrown, irisColor);
  //eye color
  const irisRadius = min(eye.center.dist(eye.top), eye.center.dist(eye.bottom));
  const irisSize = irisRadius * 2;
  noStroke();
  fill(irisColor);
  ellipse(eye.center.x, eye.center.y, irisSize, irisSize);
  
  //eye black
  const pupilSize = irisSize / 3;
  fill(0, 0.6);
  ellipse(eye.center.x, eye.center.y, pupilSize, pupilSize);
  push();
  image(img, eye.center.x - img_w * 0.5, eye.center.y - img_h * 0.5, img_w, img_h);
  pop();
}

function drawEyeBrownOutline(eye, color) {
    // scale(faceSize);
	beginShape(LINES);
    stroke(color);
    strokeWeight(2);
    const firstPoint = eye.outline[0];
    eye.outline.forEach((p, i) => {
    curveVertex(p.x, p.y);
    if (i === 0) {
      // Duplicate the initial point (see curveVertex documentation)
      curveVertex(firstPoint.x, firstPoint.y);
    }
    if (i === eye.outline.length - 1) {
      // Close the curve and duplicate the closing point
      curveVertex(firstPoint.x, firstPoint.y);
      curveVertex(firstPoint.x, firstPoint.y);
    }
  });
  endShape();
}

function keyPressed() {
  // Clear background
  background(0);
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("eyeTrail-" + timestamp, "png");
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