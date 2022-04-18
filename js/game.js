const key = {
  keyDown: {},

  keyValue: {
    37: "left",
    39: "right",
    40: "slide",
    32: "jump",
    80: "pause",
  },
};

const allJellyComProp = {
  arr: [],
};

const allObstacleComProp = {
  arr: [],
};

const stageInfo = {
  stage: [],
  currentStageIndex: 0,
  totalScore: 0,
  gameOver: false,
};

const gameBackground = {
  gameBox: document.querySelector(".game"),
  groundBox: document.querySelector(".ground"),
};

const gameProp = {
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  gameOver: false,
  gameClear: false,
  paused: false,
};

const pause = () => {
  if (gameProp.paused) {
    gameProp.paused = false;
    document.querySelector(".paused_box").remove();
    document.querySelector(".cookie").classList.remove("paused");
  } else {
    gameProp.paused = true;
    document.querySelector(".cookie").classList.add("paused");
    stageInfo.stage[stageInfo.currentStageIndex].stageGuide("PAUSED");
  }
};

const renderGame = () => {
  cookie.keyMotion();
  if (!gameProp.paused && !gameProp.gameOver && !gameProp.gameClear) {
    cookie.movex = cookie.movex + cookie.speed;
    document.querySelector(".cookie_box").style.transform = `translate(${cookie.movex}px, ${cookie.movey}px)`;
    setGameBackground();
    allJellyComProp.arr.forEach((arr) => {
      arr.crashJelly();
    });
    allObstacleComProp.arr.forEach((arr) => {
      if (!arr.isCrashed && !cookie.crashed) {
        arr.crashObstacle();
      }
    });
  } else if (gameProp.gameOver) {
    document.querySelector(".cookie_box").style.transform = `translate(${cookie.movex}px, 0px)`;
  }
  if (cookie.movex >= stageInfo.stage[stageInfo.currentStageIndex].length) {
    gameProp.gameClear = true;
    stageInfo.stage[stageInfo.currentStageIndex].stageEnd();
    // stageInfo.currentStageIndex++;
  }
  window.requestAnimationFrame(renderGame);
};

const setGameBackground = () => {
  let parallaxValue = Math.min(0, (cookie.movex - gameProp.screenWidth / 5) * -1);
  gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`;
};

const windowEvent = () => {
  window.addEventListener("keydown", (e) => {
    if (key.keyValue[e.which] === "jump" && !key.keyDown["slide"]) {
      cookie.jumpState = cookie.jumpState === 0 ? 1 : cookie.jumpState === 1 ? 2 : 3;

      if (cookie.jumpState === 2) {
        cookie.jumpTimer = 0;
      }
      cookie.jumpCount++;
    }
    key.keyDown[key.keyValue[e.which]] = true;
  });

  window.addEventListener("keyup", (e) => {
    key.keyDown[key.keyValue[e.which]] = false;
  });
};

let cookie;

const init = () => {
  cookie = new Cookie(".cookie");
  newStage = new Stage(stage1);
  stageInfo.stage.push(newStage);
  // stageInfo.stage.callMap();

  windowEvent();
  renderGame();
};

window.onload = () => {
  init();
};
