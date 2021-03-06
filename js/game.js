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

const allItemComProp = {
  arr: [],
};

const stageInfo = {
  stage: [stage1, stage2, stage3, stage4],
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

const nextStage = () => {
  cookie.movex = 0;
  gameBackground.gameBox.style.transform = `translateX(${0}px)`;

  allJellyComProp.arr.forEach((j) => {
    j.el.remove();
  });
  allJellyComProp.arr.splice(0); //배열 요소 전부 삭제

  allObstacleComProp.arr.forEach((o) => {
    o.el.remove();
  });
  allObstacleComProp.arr.splice(0);

  allItemComProp.arr.forEach((i) => {
    i.el.remove();
  });
  allItemComProp.arr.splice(0);

  newStage = new Stage(stageInfo.stage[stageInfo.currentStageIndex]);
  stageInfo.currentStage = newStage;

  gameProp.gameClear = false;
  document.querySelector(".stage_guide").style.display = "none";
};

const backLobby = () => {
  cookie.movex = 0;
  gameBackground.gameBox.style.transform = `translateX(${0}px)`;

  allJellyComProp.arr.forEach((j) => {
    j.el.remove();
  });
  allJellyComProp.arr.splice(0);

  allObstacleComProp.arr.forEach((o) => {
    o.el.remove();
  });
  allObstacleComProp.arr.splice(0);

  allItemComProp.arr.forEach((i) => {
    i.el.remove();
  });
  allItemComProp.arr.splice(0);

  location.href = "index.html";
  document.querySelector(".stage_guide").style.display = "none";
};

const renderGame = () => {
  cookie.keyMotion();
  if (!gameProp.paused && !gameProp.gameOver && !gameProp.gameClear) {
    cookie.minusHp(-0.2);
    cookie.movex = cookie.movex + cookie.speed;
    document.querySelector(".cookie_box").style.transform = `translate(${cookie.movex}px, ${cookie.movey}px)`;
    setGameBackground();
    allJellyComProp.arr.forEach((arr) => {
      // arr.el.style.transform = `translate(${arr.x}px, ${arr.y}px)`;
      if (arr.magnet === true) {
        //젤리가 쿠키의 왼쪽에 있는 경우
        if (arr.position().right < cookie.position().left + 105.5) {
          arr.x += 30;
          //젤리가 쿠키의 왼쪽 위에 있는 경우
          if (arr.position().bottom > cookie.position().top - 113.1) {
            arr.y += 20;
          } else {
            //젤리가 쿠키의 왼쪽 아래에 있는 경우
            arr.y -= 20;
          }
        } else {
          //젤리가 쿠키의 오른쪽에 있는 경우
          arr.x -= 30;
          //젤리가 쿠키의 오른쪽 위에 있는 경우
          if (arr.position().bottom > cookie.position().top - 113.1) {
            arr.y += 20;
          } else {
            //젤리가 쿠키의 오른쪽 아래에 있는 경우
            arr.y -= 20;
          }
        }
        arr.el.style.transform = `translate(${arr.x}px, ${arr.y}px)`;
        if (
          arr.position().right > cookie.position().left &&
          arr.position().left < cookie.position().right &&
          arr.position().top > cookie.position().bottom &&
          arr.position().bottom < cookie.position().top
        )
          arr.magnet = false;
      }

      arr.crashJelly();
    });
    allObstacleComProp.arr.forEach((arr) => {
      if (!arr.isCrashed && !cookie.crashed) {
        arr.crashObstacle();
      }
    });
    allItemComProp.arr.forEach((arr) => {
      arr.crashItemJelly();
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
    }
    key.keyDown[key.keyValue[e.which]] = true;
  });

  window.addEventListener("keyup", (e) => {
    key.keyDown[key.keyValue[e.which]] = false;
  });
};

// const loadImg = () => {
//   //이미지 미리 로드
//   const preLoadImgSrc = [
//     "../lib/images/gingerMK_run.png",
//     "../lib/images/gingerMK_slide.png",
//     "../lib/images/gingerMK_jump_one.png",
//     "../lib/images/gingerMK_jump_double.png",
//     "../lib/images/gingerMK_jump_down.png",
//     "../lib/images/gingerMK_crashed3.png",
//     "../lib/images/gingerMK_dead.png",
//     "../lib/jelly/blue_jelly_bean.png",
//     "../lib/jelly/yellow_bear_jelly.png",
//     "../lib/jelly/pink_bear_jelly.png",
//     "../lib/jelly/blue_bear_jelly.png",
//     "../lib/jelly/big_bear_jelly.png",
//     "../lib/obstacles/clock.png",
//     "../lib/obstacles/pink_crystal.png",
//     "../lib/obstacles/snacks.png",
//     "../lib/obstacles/cake1.png",
//     "../lib/obstacles/table.png",
//     "../lib/obstacles/green_crystal.png",
//     "../lib/obstacles/mini_snack.png",
//     "../lib/obstacles/lamp.png",
//     "../lib/obstacles/long_crystal.png",
//     "../lib/obstacles/knife.png",
//   ];
//   preLoadImgSrc.forEach((arr) => {
//     const img = new Image();
//     img.src = arr;
//   });
// };

let cookie;

const init = () => {
  // localStorage.setItem("score", 0);
  cookie = new Cookie(".cookie");
  document.querySelector(".score_box").innerText = localStorage.getItem("score") ? localStorage.getItem("score") : 0;
  newStage = new Stage(stageInfo.stage[stageInfo.currentStageIndex]);
  stageInfo.currentStage = newStage;

  // loadImg();
  windowEvent();
  renderGame();
};

window.onload = () => {
  window.resizeTo(1280, 800);
  init();
};
