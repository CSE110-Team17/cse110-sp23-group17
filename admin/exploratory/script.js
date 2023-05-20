addEventListener("load", app);
function app() {
  class Fortune {
    constructor(fortuneList) {
      let randomIndex;
      this.text = !fortuneList
        ? "No fortune"
        : fortuneList[
            (randomIndex = Math.floor(Math.random() * fortuneList.length))
          ];
      audio.src = "./static/" + (randomIndex + 1) + ".wav";
    }
  }

  var fcBtn = document.querySelector("button"),
    fortuneText = document.querySelector(".fc-fortune-text"),
    fortuneList = [
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
      "Very doubtful.",
    ],
    fortune = new Fortune(),
    
    getFortune = function () {
      fortune = new Fortune(fortuneList);
      fortuneText.innerHTML = fortune.text;
    },
    nextState = function () {
      let elClass = this.classList,
        spawned = "spawned",
        opened = "opened";

      // open cookie
      if (elClass.contains(spawned)) {
        elClass.remove(spawned);
        elClass.add(opened);
        var playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then((_) => {}).catch((error) => {});
        }

        // new cookie
      } else {
        elClass.remove(opened);
        elClass.add(spawned);
        getFortune();
      }
    };

  getFortune();
  fcBtn.addEventListener("click", nextState);
}
