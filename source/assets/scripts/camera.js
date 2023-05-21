let startCamera = document.querySelector("#startCamera");
let cameraBtn = document.querySelector("#takePhotoBtn");
let video = document.querySelector("#videoDisplay");
let canvas = document.querySelector(".cameraContainer");

cameraBtn.style.cursor = "pointer";
startCamera.onclick = async () => {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  if (stream)
  video.srcObject = stream;
};
cameraBtn.onclick = function () {
  photoDisplay
    .getContext("2d")
    .drawImage(video, 0, 0, photoDisplay.width, photoDisplay.height);
  let image_data_url = photoDisplay.toDataURL("image/jpeg");
  window.localStorage.setItem('userImage', image_data_url);
};
