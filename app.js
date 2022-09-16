const body = document.querySelector("body");
const startGame = document.querySelector("#start-game button");
const score = document.querySelector("#score");
const timeLeft = document.querySelector("#time-left");
const gameOverContainer = document.querySelector("#game-over");
const finalScore = document.querySelector("#final-score");
const wasps = document.querySelector("#wasps");

const buzz = document.querySelector("#buzz");
const splat = document.querySelector("#splat");
const whack = document.querySelector("#whack");

let timer = 2500;
let gameScore = 0;
let timeLeftCounter = 120000;

const playGame = () => {
  let gameTimer = setInterval(() => {
    timeLeft.textContent = `Time: ${timeLeftCounter / 1000}`;
    timeLeftCounter -= 1000;
  }, 1000);

  let waspTimer = setInterval(() => {
    if (gameScore >= 30) {
      timer = 500;
    } else if (gameScore >= 20) {
      timer = 1000;
    } else if (gameScore >= 10) {
      timer = 1500;
    }

    showWasp();
  }, 2600);

  setTimeout(() => {
    clearTimeout(waspTimer);
  }, 119000);

  setTimeout(() => {
    clearTimeout(gameTimer);
    gameOver();
  }, 121000);
};

const showWasp = () => {
  const num = Math.ceil(Math.random() * 6);
  const portalWasp = document.querySelector(`#portal-${num} img`);
  let opacity = 0;

  portalWasp.style.opacity = opacity;
  portalWasp.classList.remove("hide");

  const portalTimer = setInterval(() => {
    if (opacity < 100) {
      opacity += 5;
    }
    portalWasp.style.opacity = opacity / 100;
  }, timer / 100);

  buzz.pause();
  buzz.currentTime = 0.6;
  buzz.play();

  const addToScore = () => {
    gameScore++;
    score.textContent = gameScore;
    portalWasp.classList.add("hide");

    splat.pause();
    splat.currentTime = 0;
    splat.play();

    portalWasp.removeEventListener("click", addToScore);
  };

  portalWasp.addEventListener("click", addToScore);

  setTimeout(() => {
    clearTimeout(portalTimer);
    portalWasp.classList.add("hide");
    portalWasp.removeEventListener("click", addToScore);
  }, timer);
};

const gameOver = () => {
  body.classList.add("body-bg");
  body.classList.remove("body-game");
  startGame.classList.remove("hide");
  score.classList.add("hide");
  timeLeft.classList.add("hide");
  wasps.style.display = "none";
  gameOverContainer.classList.remove("hide");
  finalScore.textContent = `Final Score: ${gameScore}`;
  timeLeft.textContent = `Time: 120`;

  timer = 2500;
  gameScore = 0;
  timeLeftCounter = 120000;
};

startGame.addEventListener("click", () => {
  body.classList.remove("body-bg");
  body.classList.add("body-game");
  startGame.classList.add("hide");
  score.classList.remove("hide");
  timeLeft.classList.remove("hide");
  wasps.style.display = "flex";
  gameOverContainer.classList.add("hide");
  finalScore.textContent = `Final Score: 0`;
  score.textContent = "0";

  playGame();
});

wasps.addEventListener("click", () => {
  whack.pause();
  whack.currentTime = 0;
  whack.play();
});
