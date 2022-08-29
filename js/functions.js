let video;
let tracker

let noseX, noseY;
let mouthX, mouthY, mouthW, mouthH;
let eyeLX, eyeLY, eyeLH, eyeLW, eyeRX, eyeRY, eyeRH;

let updateTracking = function () {
  let positions = tracker.getCurrentPosition();

  if (positions.length > 0) {
    noseX = positions[62][0];
    noseY = positions[62][1];
    mouthX = (positions[44][0] + positions[50][0]) / 2;
    mouthY = (positions[47][1] + positions[53][1]) / 2;
    mouthW = (positions[50][0] - positions[44][0]);
    mouthH = (positions[53][1] - positions[47][1]);
    eyeLX = positions[27][0];
    eyeLY = positions[27][1];
    eyeLH = positions[31][1] - positions[29][1];
    eyeLW = positions[28][0] - positions[30][0];
    eyeRX = positions[32][0];
    eyeRY = positions[32][1];
    eyeRH = positions[26][1] - positions[24][1];
    faceW = (positions[14][0] - positions[0][0]);
  }
}

function setupTracking() {
  let w = width,
    h = height;
  
  video = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function() {
    console.log('video ready.')
  });
  video.elt.setAttribute('playsinline', '');
  video.size(w, h);
  video.hide();

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(video.elt);
  
  registerMethod('pre', updateTracking);
}

function drawTracking() {
  let positions = tracker.getCurrentPosition();

  colorMode(HSB);
  
  noFill();
  stroke(255);
  beginShape();
  for (let i = 0; i < positions.length; i++) {
    vertex(positions[i][0], positions[i][1]);
  }
  endShape();

  noStroke();
  for (let i = 0; i < positions.length; i++) {
    fill(map(i, 0, positions.length, 0, 360), 50, 100);
    ellipse(positions[i][0], positions[i][1], 4, 4);
    text(i, positions[i][0], positions[i][1]);
  }
  
  colorMode(RGB);
}