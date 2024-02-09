var capture;
var tracker;
var w = 640,
  h = 480;
var iframe;

function setup() {
  createCanvas(800, 800); // Double the size of the canvas

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
  capture.size(w, h);
  capture.hide();

  colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);

  iframe = document.getElementById("myIframe");
}

function draw() {
  var positions = tracker.getCurrentPosition();

  if (positions.length > 0) {
    background(255); // Set the background color to grey

    // Drop shadow for the white circle
    noStroke();
    fill(0, 50); // Set the shadow color and transparency
    ellipse(width / 2 + 10, height / 2 + 10, 400); // Draw the shadow with an offset

    // Whites of the eye
    strokeWeight(1);
    stroke(0);
    fill(255);
    ellipse(width / 2, height / 2, 400); // Draw the white circle

    // Iris
    let xc = constrain(map(positions[62][0], 0, w, width, 0), 340, 460); // Adjust the mapping and constrain
    let xs = constrain(map(positions[62][1], 0, h, 0, height), 340, 460); // Adjust the mapping and constrain
    fill(0);
    ellipse(xc, xs, 200); // Draw the iris circle

    // Update iFrame position
    iframe.style.left = xc - 100 + "px";
    iframe.style.top = xs - 100 + "px";

    // Glare
    fill(255);
    ellipse(xc + 40, xs - 40, 40); // Draw the glare circle
  }
}
