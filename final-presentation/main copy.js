const ultra = document.getElementById("ultra");
const doohickey = document.getElementById("doohickey");
const jitArea = document.getElementById("jit-area");

ultra.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter" && ultra.value !== "") {
    const newJit = document.createElement("div");
    newJit.innerHTML = `
    <span class="carrot">> </span>
    <span class="">${ultra.value}</span>
    `;
    ultra.value = "";
    ultra.blur();
    jitArea.appendChild(newJit);
    newJit.classList.add("jit");

    doohickey.classList.remove("fokie");

    if (newJit.lastElementChild.textContent === "256") {
      // Call createNewWindow with the specified images
      createNewWindow("256");
    } else if (
      newJit.lastElementChild.textContent.toLowerCase() === "design sprint"
    ) {
      createNewWindow("design sprint", "designsprint.html");
    } else if (
      newJit.lastElementChild.textContent.toLowerCase() === "research"
    ) {
      createNewWindow(
        "research",
        "https://www.are.na/lakeisha-sharonina/thesis-zjyf7d9cqn8"
      );
    } else if (
      newJit.lastElementChild.textContent.toLowerCase() === "research 2"
    ) {
      createNewWindows("research 2", [
        "https://boniver.withspotify.com/",
        "https://yhsong.com/",
        "https://minimoogmodeld.com/",
      ]);
    } else if (
      newJit.lastElementChild.textContent.toLowerCase() === "exploration 1"
    ) {
      openSpecificImages([
        "exploration-1.jpg",
        "exploration-2.jpg",
        "exploration-3.jpg",
        "exploration-4.jpg",
      ]);
    } else if (
      newJit.lastElementChild.textContent.toLowerCase() === "exploration 2"
    ) {
      createNewWindows("exploration 2", [
        "https://lakeishaa.github.io/thesis/experiment-2/version-2/",
      ]);
    } else if (
      newJit.lastElementChild.textContent.toLowerCase() === "exploration 3"
    ) {
      createNewWindows("exploration 3", [
        "https://editor.p5js.org/lakeishaa/sketches/TkAX6AHmQ",
      ]);
    } else if (
      newJit.lastElementChild.textContent.toLowerCase() === "guest crit"
    ) {
      createNewWindows("guest crit", [
        "https://docs.google.com/presentation/d/17iXFXYNZhlPzwp-Msnjly1Shd0tUcEi9_jR3xrdoWJ0/edit?usp=sharing",
      ]);
    } else if (
      newJit.lastElementChild.textContent.toLowerCase() === "description"
    ) {
      createNewWindow("description", "description.html");
    } else if (newJit.lastElementChild.textContent.toLowerCase() === "goals") {
      createNewWindow("goals", "goals.html");
    } else {
      // Show an alert for other inputs
      alert("404 NOT FOUND");
    }
  }
});

let params =
  "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300";

function createNewWindow(input, url) {
  if (input === "256") {
    openSpecificImages(["256-1.jpg", "256-2.jpg", "256-3.jpg"]);
    return;
  }

  let left = Math.floor(Math.random() * (screen.width - 600));
  let top = Math.floor(Math.random() * (screen.height - 300));

  window.open(url, `${input}Window`, `${params},left=${left},top=${top}`);
}

function createNewWindows(input, urls) {
  // Use Promise.all to open all windows concurrently
  Promise.all(
    urls.map((url, index) => {
      let left = Math.floor(Math.random() * (screen.width - 600));
      let top = Math.floor(Math.random() * (screen.height - 300));

      return window.open(
        url,
        `${input}Window${index + 1}`,
        `${params},left=${left},top=${top}`
      );
    })
  );
}

function openSpecificImages(imageNames) {
  // Use Promise.all to open all windows concurrently
  Promise.all(
    imageNames.map((imageName, index) => {
      let left = Math.floor(Math.random() * (screen.width - 600));
      let top = Math.floor(Math.random() * (screen.height - 300));

      return window.open(
        `assets/${imageName}`,
        `imageWindow${index + 1}`,
        `${params},left=${left},top=${top}`
      );
    })
  );
}
