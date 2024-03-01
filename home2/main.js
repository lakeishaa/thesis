document.addEventListener("DOMContentLoaded", function () {
  const numCursors = 35; // Number of custom cursors
  const cursors = [];
  const cursorEases = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]; // Different levels of ease for cursors

  // Update cursor positions
  function updateCursorPosition(cursor, ease) {
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    function update() {
      const dx = mouseX - posX;
      const dy = mouseY - posY;

      posX += dx * ease;
      posY += dy * ease;

      cursor.style.left = posX + "px";
      cursor.style.top = posY + "px";

      requestAnimationFrame(update);
    }

    document.addEventListener("mousemove", function (event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    update();
  }

  // Create custom cursors and assign different ease levels to each cursor
  for (let i = 0; i < numCursors; i++) {
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    document.body.appendChild(customCursor);
    cursors.push(customCursor);

    const ease = cursorEases[i % cursorEases.length];
    updateCursorPosition(customCursor, ease);
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   const characters = ["ⓧ", "🅇", "☒"]; // Characters to be randomly displayed
//   const numDivs = 10; // Number of div elements to be generated
//   const divs = [];

//   // Create div elements with random characters
//   for (let i = 0; i < numDivs; i++) {
//     const randomChar =
//       characters[Math.floor(Math.random() * characters.length)];
//     const div = document.createElement("div");
//     div.textContent = randomChar;
//     div.style.position = "absolute";
//     div.style.fontSize = "20px";
//     div.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
//     div.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
//     document.body.appendChild(div);
//     divs.push(div);
//   }
// });

let timerInterval;
let seconds = 0,
  minutes = 0,
  hours = 0;

// Function to start the stopwatch
function startStopwatch() {
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateTimerDisplay();
}

// Function to update the timer display
function updateTimerDisplay() {
  const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("timer").innerText = formattedTime;
}

// Function to pad numbers with leading zeros
function pad(num) {
  return (num < 10 ? "0" : "") + num;
}

// Function to save the timer state in cookies
function saveTimerState() {
  document.cookie = `timer=${hours}:${minutes}:${seconds}`;
}

// Function to retrieve the timer state from cookies
function retrieveTimerState() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === "timer") {
      const [h, m, s] = value.split(":").map(Number);
      hours = h;
      minutes = m;
      seconds = s;
      updateTimerDisplay();
      break;
    }
  }
}

// Start the stopwatch when the page loads
startStopwatch();

// Save timer state when window is closed or refreshed
window.addEventListener("beforeunload", saveTimerState);

// Retrieve timer state when the window is reopened
window.addEventListener("load", retrieveTimerState);
