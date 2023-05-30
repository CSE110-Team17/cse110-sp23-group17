let startCamera = document.querySelector("#startCamera");
let cameraBtn = document.querySelector("#takePhotoBtn");
let video = document.querySelector("#videoDisplay");
let canvas = document.querySelector(".cameraContainer");
//let canvasFile = document.querySelector("#photoDisplay")

//clear localStorage everytime come back or refresh
window.localStorage.removeItem("userImage");

/**
 * Handler for user camera initialization
 * Will ask if user allow to turn on camera or not
 */
cameraBtn.style.cursor = "pointer";
startCamera.onclick = async () => {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  if (stream) video.srcObject = stream;
};

/**
 * Handler for photo taking and display image
 */
cameraBtn.onclick = function () {
  photoDisplay
    .getContext("2d")
    .drawImage(video, 0, 0, photoDisplay.width, photoDisplay.height);
  let image_data_url = photoDisplay.toDataURL("image/jpeg");
  window.localStorage.setItem("userImage", image_data_url);
};

const submitFile = document.querySelector("#submitFile");

/**
 * Handler for user file submission
 */
submitFile.addEventListener("change", () => {
  const reader = new FileReader();
  reader.readAsDataURL(submitFile.files[0]);
  reader.addEventListener("load", () => {
    // const image = new Image();
    // const ctx = canvasFile.getContext('2d');
    // image.addEventListener("load", () => {
    //   console.log("hello");
    //   console.log('Image loaded:', image);
    //   ctx.drawImage(image, 0, 0, image.width, image.height);
    //   console.log("image width" + image.width);
    // });
    const url = reader.result;
    //console.log(url);
    window.localStorage.setItem("userImage", url);


  });
});

/**
 * Switch href to game page
 */
submitBtn.onclick = function () {
  window.location.href = "./game.html";
};
