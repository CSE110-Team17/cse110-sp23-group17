const answers = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "Outlook not so good.",
    "My sources say no.",
    "Very doubtful."
  ];

const shakeBtn = document.querySelector(".shake-btn");
const answerEl = document.querySelector(".answer");
const magicBallEl = document.querySelector(".magic-ball");
const audio = document.getElementById("audio");
  
shakeBtn.addEventListener("click", () => {
const randomIndex = Math.floor(Math.random() * answers.length);
const randomAnswer = answers[randomIndex];
const questionInput = document.getElementById("question").value;
answerEl.textContent = questionInput + " " + randomAnswer;
audio.src = "./static/" + (randomIndex + 1) + ".wav";
audio.play();
magicBallEl.src = "https://t4.ftcdn.net/jpg/02/69/87/67/360_F_269876770_sJJj7ZfUnoG36IdH8QkbySi1bQdlSXmB.jpg";
magicBallEl.classList.add("shake");

magicBallEl.addEventListener("animationend", () => {
    magicBallEl.classList.remove("shake");
});
});
  