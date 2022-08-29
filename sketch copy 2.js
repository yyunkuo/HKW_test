// available:
// 鼻 noseX, noseY
// 口 mouthX, mouthY, mouthW, mouthH
// 眼 eyeLX, eyeLY, eyeRX, eyeRY

let f = 0;
let wght = 50;
let txt, box;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  setupTracking();
  frameRate(30);

  txt = select(".text");
  box = select(".box");
}

function draw() {
  translate(windowWidth, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0, width, height);
  text(eyeLH/eyeLW , 40, 100);
  // eye
  let distance = eyeRX - eyeLX;
  let l_offset = (eyeLH/eyeLW > 0.8) ? eyeLH/eyeLW : 0.2;
  let r_offset = (eyeRH/15 > 0.8) ? eyeRH/15 : 0.2;

  drawTopDeco(noseX, noseY);
  if (l_offset == 0.2) {
    
    txt.style( "font-variation-settings", `'wght' ${(wght + f * 10) % 800}`);
  }

  fill(255);
 

  f++;

  // translate(noseX, noseY);
  // translate(0, -280);
  // triangle(30,75,58,20,86,75);
}

function drawTopDeco(input_x, input_y) {
  box.style('top', input_y + 'px');
  box.style('left', input_x + 10 + 'px');
}