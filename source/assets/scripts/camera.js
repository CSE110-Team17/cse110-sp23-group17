let startCamera = document.querySelector('#startCamera')
let cameraBtn = document.querySelector("#takePhotoBtn");
let video = document.querySelector("#videoDisplay");
let canvas = document.querySelector(".cameraContainer");

cameraBtn.style.cursor = "pointer";
startCamera.onclick = async () => {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
};
cameraBtn.onclick = function () {
  photoDisplay
    .getContext("2d")
    .drawImage(video, 0, 0, photoDisplay.width, photoDisplay.height);
  let file = null;
  let blob = document.querySelector("#photoDisplay").toBlob(function (blob) {
    file = new File([blob], "test.png", { type: "image/png" });
  }, "image/png");
  window.localStorage.setItem("userImage", blob);
};
