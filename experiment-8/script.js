// Function to create and stick an image at the cursor position
function stickImageAtCursor() {
  // Create a new image element
  const image = new Image();
  image.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLH9zPxQvVpXkUfAP81W3GjV4DGSA-5Yx2EQ&usqp=CAU"; // Replace 'path_to_your_image' with the actual path to your image
  image.classList.add("cursor-image");

  // Calculate cursor position
  const cursorX = event.clientX;
  const cursorY = event.clientY;

  // Set image position
  image.style.left = cursorX + "px";
  image.style.top = cursorY + "px";

  // Add image to the document
  document.body.appendChild(image);

  // Remove image after a delay (0.5 seconds)
  setTimeout(() => {
    image.remove();
  }, 500);
}

// Listen for mousemove event
document.addEventListener("mousemove", stickImageAtCursor);
