let WINDOWS = {};

function openFixWindow(url) {
    // define the dimensions for the new window
    let winW = 500;
    let winH = 500;
  
    // Ensure that the window is not bigger than the screen
    let screenWidth = window.screen.availWidth;
    let screenHeight = window.screen.availHeight;
  
    // Calculate random position within the bounds of the screen
    let left = Math.floor(Math.random() * (screenWidth - winW));
    let top = Math.floor(Math.random() * (screenHeight - winH));
    
    // Open the new window with the specified features at a random position
    let newWindow = window.open(url, "newWindow", "location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=" + winW + ",height=" + winH + ",top=" + top + ",left=" + left);
  
    // Try to focus the new window if possible
    if (newWindow) {
        newWindow.focus();
    }
  }
  

document.addEventListener('DOMContentLoaded', function() {
    // Select all 'a' tags inside the 'ul' of 'homePageWrapper' div
    let links = document.querySelectorAll('#homePageWrapper ul a');
  
    // Add a click event listener to each link
    links.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        openFixWindow(this.href); // Pass the href of the link to the openFixWindow function
      });
    });
  });