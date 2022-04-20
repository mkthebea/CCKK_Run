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
  stage: [stage1, stage2, stage3],
  currentStage: {},
  currentStageIndex: localStorage.getItem("currentStageIndex"),
  totalScore: localStorage.getItem("score") * 1,
  gameOver: false,
};

const gameBackground = {
  gameBox: document.querySelector(".game"),
  groundBox: document.querySelector(".ground"), //gameBox에 포함됨
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
    stageInfo.currentStage.stageGuide("PAUSED");
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
  } else if (gameProp.gameOver || gameProp.gameClear) {
    document.querySelector(".cookie_box").style.transform = `translate(${cookie.movex}px, 0px)`;
  }
  if (cookie.movex >= stageInfo.currentStage.length && !gameProp.gameClear) {
    if (stageInfo.currentStageIndex == stageInfo.stage.length - 1) {
      gameProp.gameClear = true;
      stageInfo.currentStage.allClear();
    } else {
      gameProp.gameClear = true;
      stageInfo.currentStage.stageClear();
      // stageInfo.currentStageIndex++;
    }
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
  // localStorage.setItem("score", 0);
  cookie = new Cookie(".cookie");
  document.querySelector(".score_box").innerText = localStorage.getItem("score") ? localStorage.getItem("score") : 0;
  newStage = new Stage(stageInfo.stage[stageInfo.currentStageIndex]);
  stageInfo.currentStage = newStage;
  // console.log(stageInfo.currentStageIndex);

  // newStage = new Stage(stage2);
  // stageInfo.stage.push(newStage);
  // console.log(stageInfo.stage);

  // stageInfo.stage.callMap();

  windowEvent();
  renderGame();
};

window.onload = () => {
  init();
};
