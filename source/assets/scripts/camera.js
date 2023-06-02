// initialize document content
let startCamera = document.querySelector("#char-3");
let cameraImg = document.querySelector("#camera-img");
let cameraBtn = document.querySelector("#take-photo-btn");
let video = document.querySelector("#video-display");
let canvas = document.querySelector(".cameraContainer");
let submitBtn = document.querySelector("#submit-btn");

//clear localStorage everytime come back or refresh
window.localStorage.removeItem("userImage");

var character = document.getElementsByClassName("character");
for (let i = 0; i < character.length; i++) {
  if (i == 0) {
    character[i].addEventListener("click", dragonSelected);
  } else if (i == 1) {
    character[i].addEventListener("click", pandaSelected);
  } else {
    character[i].addEventListener("click", takePicture);
  }
}

var clicked = [];

/**
 * Handler function for when dragon character is selected.
 * Functionalities:
 * - Update clicked stack
 * - Update borders
 * - Set LocalStorage
 * @param {} event 
 */
function dragonSelected(event) {
  clicked.pop();
  clicked.push("dragon");
  window.localStorage.removeItem("userImage");
  window.localStorage.setItem("userImage", "./assets/images/characters/dragon.png");
  borderHandler();
}

/**
 * Handler function for when pand character is selected.
 * Functionalities:
 * - Update clicked stack
 * - Update borders
 * - Set LocalStorage
 * @param {} event 
 */
function pandaSelected(event) {
  clicked.pop();
  clicked.push("panda");
  window.localStorage.removeItem("userImage");
  window.localStorage.setItem("userImage", "./assets/images/characters/panda.png");
  borderHandler();
}

/**
 * Handler function for when "Take your own picture" is selected.
 * Functionalities:
 * - Update clicked stack
 * - Update borders
 * - Set LocalStorage
 * - Load Camera canvas
 * @param {} event 
 */
function takePicture(event) {
  clicked.pop();
  clicked.push("camera");
  borderHandler();
  loadCamera();
}

/**
 * Deletes and adds appropriate border around the Character divs
 */
function borderHandler() {
  if(clicked[0] === "dragon") {
    document.getElementById("char-2").style.outline = "";
    document.getElementById("char-3").style.outline = "";
    document.getElementById("char-1").style.outline = "2px solid white";
  } else if(clicked[0] === "panda") {
    document.getElementById("char-1").style.outline = "";
    document.getElementById("char-3").style.outline = "";
    document.getElementById("char-2").style.outline = "2px solid white";
  } else {
    document.getElementById("char-1").style.outline = "";
    document.getElementById("char-2").style.outline = "";
    document.getElementById("char-3").style.outline = "2px solid white";
  }
}

/**
 * Opens a live video canvas
 */
async function loadCamera() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  if (stream) video.srcObject = stream; 
}

/**
 * Handler for photo taking and display image
 */
cameraBtn.onclick = function () {
  if (clicked.pop() === "camera") {
    cameraImg.hidden = true; 
    photoDisplay
      .getContext("2d")
      .drawImage(video, 0, 0, photoDisplay.width, photoDisplay.height);
    let image_data_url = photoDisplay.toDataURL("image/jpeg");
    window.localStorage.setItem("userImage", image_data_url);
  }
};

// Temporary suspension of img upload
// const submitFile = document.querySelector("#submitFile");

// /**
//  * Handler for user file submission
//  */
// submitFile.addEventListener("change", () => {
//   const reader = new FileReader();
//   reader.readAsDataURL(submitFile.files[0]);
//   reader.addEventListener("load", () => {
//     const url = reader.result;
//     console.log(url);
//     window.localStorage.setItem("userImage", url);
//   });
// });

/**
 * Switch href to game page
 */
submitBtn.onclick = function () {
  window.location.href = "./game.html";
};
