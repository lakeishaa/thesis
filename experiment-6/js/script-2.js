/*
Hand Tracking + KNN Classifier

The example lets you train a knn algorithm to classify handposes

Built with handPose model from tf.js, knn-classifier from ml5js and p5js

Created by Yining Shi & Andreas Refsgaard 2020
*/

let model, video, keypoints, predictions = [];
// Create a KNN classifier

let song;

function preload() {
  video = createCapture(VIDEO, () => {
    loadHandTrackingModel();
  });
  video.hide();
  song = loadSound('song1.wav'); // Load your sound file
}

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent('canvasContainer');
}

async function loadHandTrackingModel() {
  // Load the MediaPipe handpose model.
  model = await handpose.load();
  select('#status').html('Hand Tracking Model Loaded')
  predictHand();
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    drawKeypoints();
    drawSkeleton();

    // Check if x-coordinate is between 100 and 200 pixels
    const xCoordinate = predictions[0].landmarks[0][0];
    if (xCoordinate >= 100 && xCoordinate <= 200) {
      playSong();
    }
  }
}

function playSong() {
  if (!song.isPlaying()) {
    song.play();
    background(0, 255, 0);
    console.log("Song is playing because x-coordinate is 100 pixels!");

  }
}


async function predictHand() {
  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a hand prediction from the MediaPipe graph.
  predictions = await model.estimateHands(video.elt);

  setTimeout(() => predictHand(), 100);
}



// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  console.log(predictions[0].landmarks[0][0]);
  let prediction = predictions[0];
  for (let j = 0; j < prediction.landmarks.length; j++) {
    let keypoint = prediction.landmarks[j];
    fill(255, 0, 0);
    noStroke();
    ellipse(keypoint[0], keypoint[1], 10, 10);
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  let annotations = predictions[0].annotations;
  stroke(255, 0, 0);
  for (let j = 0; j < annotations.thumb.length - 1; j++) {
    line(annotations.thumb[j][0], annotations.thumb[j][1], annotations.thumb[j + 1][0], annotations.thumb[j + 1][1]);
  }
  for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
    line(annotations.indexFinger[j][0], annotations.indexFinger[j][1], annotations.indexFinger[j + 1][0], annotations.indexFinger[j + 1][1]);
  }
  for (let j = 0; j < annotations.middleFinger.length - 1; j++) {
    line(annotations.middleFinger[j][0], annotations.middleFinger[j][1], annotations.middleFinger[j + 1][0], annotations.middleFinger[j + 1][1]);
  }
  for (let j = 0; j < annotations.ringFinger.length - 1; j++) {
    line(annotations.ringFinger[j][0], annotations.ringFinger[j][1], annotations.ringFinger[j + 1][0], annotations.ringFinger[j + 1][1]);
  }
  for (let j = 0; j < annotations.pinky.length - 1; j++) {
    line(annotations.pinky[j][0], annotations.pinky[j][1], annotations.pinky[j + 1][0], annotations.pinky[j + 1][1]);
  }

  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.thumb[0][0], annotations.thumb[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.indexFinger[0][0], annotations.indexFinger[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.middleFinger[0][0], annotations.middleFinger[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.ringFinger[0][0], annotations.ringFinger[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.pinky[0][0], annotations.pinky[0][1]);
}