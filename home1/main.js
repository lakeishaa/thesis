document.addEventListener("DOMContentLoaded", function () {
  const numCursors = 25; // Number of custom cursors
  const cursors = [];

  // Create custom cursors
  for (let i = 0; i < numCursors; i++) {
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    document.body.appendChild(customCursor);
    cursors.push(customCursor);
  }

  const cursorEases = [0.1, 0.15, 0.2, 0.25, 0.3]; // Different levels of ease for cursors

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

  // Assign different ease levels to each cursor
  cursors.forEach((cursor, index) => {
    const ease = cursorEases[index];
    updateCursorPosition(cursor, ease);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const characters = ["ⓧ", "🅇", "☒"]; // Characters to be randomly displayed
  const numDivs = 10; // Number of div elements to be generated
  const divs = [];

  // Create div elements with random characters
  for (let i = 0; i < numDivs; i++) {
    const randomChar =
      characters[Math.floor(Math.random() * characters.length)];
    const div = document.createElement("div");
    div.textContent = randomChar;
    div.style.position = "absolute";
    div.style.fontSize = "20px";
    div.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
    div.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
    document.body.appendChild(div);
    divs.push(div);
  }
});
