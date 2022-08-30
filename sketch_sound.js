let mic;
let txt;
var f;

function setup() {
  // Create an Audio input
  mic = new p5.AudioIn();
  mic.start();
  txt = select(".text")
  f = new p5.Filt();
  f.set('lowpass', 3, 0.4);
}

function draw() {
  background(255);
 
  let vol = mic.getLevel();
  text(vol, 10, 10);
  let h = map(vol, 0.010, 0.04, 0, 1);

 
  var q = f.tick(h);
  //noStroke();
  
  
  let box = select(".box")
  let width = box.size().width + 10
  let height = box.size().height +10 
  let wght = q * 500;
  
  txt.style(
    "font-variation-settings", 
    `'wght' ${wght}`
  )
}


function touchStarted() {
  getAudioContext().resume();
}