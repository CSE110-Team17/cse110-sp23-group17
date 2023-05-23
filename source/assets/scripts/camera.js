let startCamera = document.querySelector("#startCamera");
let cameraBtn = document.querySelector("#takePhotoBtn");
let video = document.querySelector("#videoDisplay");
let canvas = document.querySelector(".cameraContainer");

window.localStorage.removeItem("userImage");

cameraBtn.style.cursor = "pointer";
startCamera.onclick = async () => {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  if (stream) video.srcObject = stream;
};

cameraBtn.onclick = function () {
  photoDisplay
    .getContext("2d")
    .drawImage(video, 0, 0, photoDisplay.width, photoDisplay.height);
  let image_data_url = photoDisplay.toDataURL("image/jpeg");
  window.localStorage.setItem("userImage", image_data_url);
};

const submitFile = document.querySelector("#submitFile");

submitFile.addEventListener("change", () => {
  const reader = new FileReader();
  reader.readAsDataURL(submitFile.files[0]);
  reader.addEventListener("load", () => {
    const url = reader.result;
    console.log(url);
    window.localStorage.setItem("userImage", url);
  });
});

submitBtn.onclick = function () {
  window.location.href = "./game.html";
};
