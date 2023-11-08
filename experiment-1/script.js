var capture;
var tracker;
var w = 640,
  h = 480;

function setup() {
  capture = createCapture(
    {
      audio: false,
      video: {
        width: w,
        height: h,
      },
    },
    function () {
      console.log("capture ready.");
    }
  );
  capture.elt.setAttribute("playsinline", "");
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();

  colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  image(capture, 0, 0, w, h);
  var positions = tracker.getCurrentPosition();

  if (positions.length > 0) {
    // Define eye positions (example landmarks for left and right eyes)
    var leftEyeX = positions[32][0];
    var leftEyeY = positions[32][1];
    var rightEyeX = positions[27][0];
    var rightEyeY = positions[27][1];

    // Calculate the zoomed-in dimensions
    var zoomWidth = 200;
    var zoomHeight = 100;

    // Center the zoom on the midpoint between the eyes
    var zoomX = (leftEyeX + rightEyeX) / 2 - zoomWidth / 2;
    var zoomY = (leftEyeY + rightEyeY) / 2 - zoomHeight / 2;

    // Display the zoomed-in region
    image(capture, 0, 0, w, h, zoomX, zoomY, zoomWidth, zoomHeight);

    // Draw facial landmarks within the zoomed region
    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
      vertex(positions[i][0] - zoomX, positions[i][1] - zoomY);
    }
    endShape();

    noStroke();
    for (var i = 0; i < positions.length; i++) {
      fill(map(i, 0, positions.length, 0, 360), 50, 100);
      ellipse(positions[i][0] - zoomX, positions[i][1] - zoomY, 4, 4);
      text(i, positions[i][0] - zoomX, positions[i][1] - zoomY);
    }
    filter(INVERT);
  }
}
