const ultra = document.getElementById("ultra");
const doohickey = document.getElementById("doohickey");
const thingmabob = document.getElementById("thingmabob");
const livereaction = document.getElementById("livereaction");
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

    // Use setTimeout to delay the call to createNewWindow
    setTimeout(() => {
      createNewWindow(newJit.lastElementChild.textContent);
    }, 0);
  }
});

let params =
  "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300";

function createNewWindow(input) {
  let url;
  if (input === "2024") {
    url = "2024.html";
  } else if (input === "from here") {
    url = "2024.html";
  } else if (input === "256") {
    openSpecificImages(["256-1.jpg", "256-2.jpg", "256-3.jpg"]);
    return;
  }
  window.open(url, "test", params);
}

function openSpecificImages(imageNames) {
  imageNames.forEach((imageName, index) => {
    let left = Math.floor(Math.random() * (screen.width - 600)); // Adjust width as needed
    let top = Math.floor(Math.random() * (screen.height - 300)); // Adjust height as needed

    window.open(
      `assets/${imageName}`,
      `imageWindow${index + 1}`,
      `${params},left=${left},top=${top}`
    );
  });
}

window.addEventListener("click", () => {
  ultra.focus();
  doohickey.classList.add("fokie");
});
