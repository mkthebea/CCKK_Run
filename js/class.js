class Stage {
  constructor(stage) {
    this.stageName = stage.name;
    // this.isStart = false;
    this.backgroundUrl = stage.backgroundUrl;
    this.groundUrl = stage.groundUrl;
    this.length = stage.length;
    // console.log(this.length);

    this.init();
    this.stageStart();
  }
  init() {
    gameBackground.gameBox.style.backgroundImage = `url(${this.backgroundUrl})`;
    gameBackground.groundBox.style.backgroundImage = `url(${this.groundUrl})`;
    this.callMap();
  }
  stageStart() {
    // this.isStart = true;
    this.stageGuide(`START ${this.stageName}`);
  }
  stageClear() {
    // this.isStart = false;
    this.stageGuide("STAGE CLEAR");
    localStorage.setItem("score", stageInfo.totalScore);
    if (localStorage.getItem("highestScore") < stageInfo.totalScore) {
      localStorage.setItem("highestScore", stageInfo.totalScore);
    }
    cookie.jumpState = 0;
    cookie.movey = 0;
    cookie.jumpTimer = 0;
    cookie.jumpCount = 0;

    document.querySelector(".cookie").className = "cookie run";
    // document.querySelector(".cookie").classList.add("clear"); //clear 이미지 css에 추가할 것!!!!!!!!!!!!!!!!!
    setTimeout(() => {
      const nextStage = confirm("다음 스테이지?");
      if (nextStage) {
        stageInfo.currentStageIndex++;

        cookie.movex = 0;
        gameBackground.gameBox.style.transform = `translateX(${0}px)`;

        allJellyComProp.arr.splice(0);
        allObstacleComProp.arr.splice(0);

        newStage = new Stage(stageInfo.stage[stageInfo.currentStageIndex]);
        stageInfo.currentStage = newStage;

        gameProp.gameClear = false;
      } else {
        stageInfo.currentStageIndex++;
        localStorage.setItem("currentStageIndex", stageInfo.currentStageIndex);
        localStorage.setItem("hp", cookie.hpValue);

        cookie.movex = 0;
        gameBackground.gameBox.style.transform = `translateX(${0}px)`;

        allJellyComProp.arr.splice(0);
        allObstacleComProp.arr.splice(0);
        location.href = "index.html";
      }
    }, 1500);

    // var link = "file:///C:/Users/5596m/Desktop/test.html";
    // window.location.href = link;
    // // window.location.replace(link);
    // setTimeout(() => window.open(link), 5000);
    // window.open(link);
  }
  allClear() {
    // const confirmClear = confirm("ALL CREAR!!");
    // console.log(confirmClear);
    // if (confirmClear) {
    //   location.href = "index.html";
    //   console.log(location.href);
    // }
    this.stageGuide("STAGE CLEAR");
    document.querySelector(".cookie").className = "cookie run";

    setTimeout(() => {
      alert("ALL CLEAR!!");
      localStorage.setItem("currentStageIndex", 0);
      localStorage.removeItem("score");
      localStorage.setItem("hp", cookie.defaultHpValue);
      if (localStorage.getItem("highestScore") < stageInfo.totalScore) {
        localStorage.setItem("highestScore", stageInfo.totalScore);
      }
      location.href = "index.html";
    }, 1500);
  }
  callMap() {
    for (let i = 0; i <= 10; i++) {
      allJellyComProp.arr[i] = new Jelly(500 + i * 500, gameProp.screenHeight * 0.6, 100);
    }
    for (let i = 0; i <= 10; i++) {
      allObstacleComProp.arr[i] = new Obstacle(1500 + i * 1500, gameProp.screenHeight * 0.9 - 200, 500);
    }
    // allObstacleComProp.arr[0] = new Obstacle(1000, 450, 500);
    // allObstacleComProp.arr[1] = new Obstacle(1100, 450, 500);
    // allObstacleComProp.arr[2] = new Obstacle(2000, 450, 500);
    // allObstacleComProp.arr[3] = new Obstacle(2900, 250, 500);
  }
  stageGuide(text) {
    this.parentNode = document.querySelector(".game_app");
    this.textBox = document.createElement("div");
    if (text === "PAUSED" || text === "GAME OVER") {
      this.textBox.className = "paused_box";
    } else {
      this.textBox.className = "stage_box";
    }
    this.textNode = document.createTextNode(text);
    this.textBox.appendChild(this.textNode);
    this.parentNode.appendChild(this.textBox);
  }
}

class Cookie {
  constructor(el) {
    this.el = document.querySelector(el);
    this.movex = 0;
    this.movey = 0;
    this.speed = 10;
    this.jumpState = 0;
    this.jumpSpeed = 10;
    this.jumpTimer = 0;
    this.jumpMaxHeight = -250;
    this.jumpCount = 0;
    this.jumpTime = 30;
    this.defaultHpValue = 1000;
    this.hpValue = localStorage.getItem("hp") ? localStorage.getItem("hp") * 1 : this.defaultHpValue;
    this.hpProgress = 0;
    this.crashed = false;

    this.minusHp(0);
  }
  position() {
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
      bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
    };
  }
  keyMotion() {
    if (!gameProp.paused && !gameProp.gameOver && !gameProp.gameClear) {
      if (this.jumpState === 0 && key.keyDown["slide"]) {
        this.el.classList.add("slide");
        // document.querySelector(".cookie_box").style.transform = "rotate(90deg)";
      }
      if ((this.jumpState !== 0 && this.jumpCount <= 2) || this.jumpState === 3) {
        // console.log("점프중, jumpState:  " + this.jumpState + "jumpCount: " + this.jumpCount);
        this.el.classList.add("jump");
        if (this.jumpCount === 2) {
          this.el.classList.add("double");
        }
        this.el.classList.remove("down");

        this.movey -= this.jumpSpeed;
        this.jumpTimer++;
        // console.log("jumpTimer++");
      } else {
        if (this.movey < 0) {
          this.movey += this.jumpSpeed;
        }
        if (this.movey === 0) {
          this.el.classList.remove("jump");
          this.el.classList.remove("down");

          this.jumpCount = 0;
          this.jumpState = 0;
        }
      }
      if (this.jumpTimer > this.jumpTime) {
        this.jumpState = 0;
        this.jumpTimer = 0;
        this.el.classList.remove("double");
        this.el.classList.add("down");
      }

      if (!key.keyDown["slide"]) {
        this.el.classList.remove("slide");
      }
    }
  }
  jump() {
    if (this.jumpState) {
      this.movey -= this.jumpSpeed;
      this.jumpTimer++;
    } else {
      if (this.movey < this.jumpMaxHeight) {
        this.movey += this.jumpSpeed;
      }
    }
    if (this.jumpTimer > 40) {
      this.jumpState = false;
      this.jumpTimer = 0;
    }

    // while (this.jumpState) {
    //   do {
    //     this.movey -= this.jumpSpeed;
    //   } while (this.movey > this.jumpMaxHeight);
    //   if (this.movey <= this.jumpMaxHeight) {
    //     while (this.movey < 0) {
    //       this.movey += this.jumpSpeed;
    //     }
    //   }
    //   if (this.movey === 0) {
    //     this.jumpState = false;
    //     this.el.classList.remove("jump");
    //   }
    // }
  }
  minusHp(hp) {
    const hpBox = document.querySelector(".game_info .hp span");
    this.hpValue += hp;
    this.hpProgress = Math.max(0, (this.hpValue / this.defaultHpValue) * 100);
    hpBox.style.width = this.hpProgress + "%";

    if (this.hpValue <= 0) {
      this.dead();
    }
  }
  dead() {
    this.el.className = "cookie dead";
    gameProp.gameOver = true;
    stageInfo.currentStage.stageGuide("GAME OVER");

    setTimeout(() => {
      alert("GAME OVER!!");
      localStorage.setItem("currentStageIndex", 0);
      localStorage.removeItem("score");
      localStorage.setItem("hp", this.defaultHpValue);
      if (localStorage.getItem("highestScore") < stageInfo.totalScore) {
        localStorage.setItem("highestScore", stageInfo.totalScore);
      }
      location.href = "index.html";
    }, 1500);
  }
}

class Jelly {
  constructor(x, y, score) {
    this.parentNode = document.querySelector(".game");
    this.el = document.createElement("div");
    this.el.className = "jelly";
    this.x = x;
    this.y = y;
    this.score = score;

    this.init();
  }
  init() {
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.parentNode.appendChild(this.el);
  }
  position() {
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
      bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
    };
  }
  crashJelly() {
    if (!gameProp.paused) {
      if (
        this.position().right > cookie.position().left &&
        this.position().left < cookie.position().right &&
        this.position().top > cookie.position().bottom &&
        this.position().bottom < cookie.position().top
      ) {
        this.el.remove();
        this.setScore();
        // console.log(this.position(), cookie.position());
      }
    }
  }
  setScore() {
    if (!gameProp.paused) {
      stageInfo.totalScore += this.score;
      document.querySelector(".score_box").innerText = stageInfo.totalScore;
    }
  }
}

class Obstacle {
  constructor(x, y, damage) {
    this.parentNode = document.querySelector(".game");
    this.el = document.createElement("div");
    this.el.className = "obstacle";
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.isCrashed = false;

    this.init();
  }
  init() {
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.parentNode.appendChild(this.el);
  }
  position() {
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
      bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
    };
  }
  crashObstacle() {
    if (
      this.position().right > cookie.position().left &&
      this.position().left < cookie.position().right &&
      this.position().top > cookie.position().bottom &&
      this.position().bottom < cookie.position().top
    ) {
      this.isCrashed = true;
      cookie.crashed = true;
      // console.log("crashed");
      cookie.minusHp(this.damage * -1);
      document.querySelector(".cookie").classList.add("crashed");

      setTimeout(() => {
        document.querySelector(".cookie").classList.remove("crashed");
        cookie.crashed = false;
      }, 1000);

      // console.log(this.position(), cookie.position());
    }
  }
}
