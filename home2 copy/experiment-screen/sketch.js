let myShader;
let video; // Variable to hold the webcam feed

function preload() {
  myShader = loadShader('shader/shader.vert', 'shader/shader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Create a video capture object and hide the DOM element
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  shader(myShader);
  
  // Set the shader uniform to the video feed
  myShader.setUniform('tex', video);
  noStroke();
}

function draw() {
  background(255, 0, 0);

  // Use screen width for frequency and screen height for amplitude
  let freq;
  let amp;

  // Adjust the divisor as needed for frequency and amplitude
  if (width <= 1300) {
    // When screen width is 1300 pixels or below, keep the webcam normal
    freq = 1.0;
    amp = 0.0;
  } else {
    // As the screen gets wider, increase frequency and amplitude change
    freq = (width - 1300) / 500.0;
    amp = height / 1.0;
  }

  myShader.setUniform('frequency', freq);
  myShader.setUniform('amplitude', amp);
  myShader.setUniform('time', frameCount * 0.01);

  rect(0, 0, width, height);
}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
