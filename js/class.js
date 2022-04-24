class Stage {
  constructor(stage) {
    this.stageName = stage.name;
    this.backgroundUrl = stage.backgroundUrl;
    this.groundUrl = stage.groundUrl;
    this.length = stage.length;
    this.speed = stage.speed;
    this.damage = stage.damage;
    this.jumpObstacle = stage.jumpObstacle;
    this.jumpObstaclePosition = stage.jumpObstaclePosition;
    this.doubleJumpObstacle = stage.doubleJumpObstacle;
    this.doubleJumpObstaclePosition = stage.doubleJumpObstaclePosition;
    this.slideObstacle = stage.slideObstacle;
    this.slideObstaclePosition = stage.slideObstaclePosition;

    this.init();
    this.stageStart();
  }
  init() {
    cookie.speed = this.speed;
    gameBackground.gameBox.style.backgroundImage = `url(${this.backgroundUrl})`;
    gameBackground.groundBox.style.backgroundImage = `url(${this.groundUrl})`;
    this.callMap();
  }
  stageStart() {
    this.stageGuide(`START ${this.stageName}`);
    document.querySelector(".cookie").className = "cookie run";
    cookie.jumpState = 0;
    cookie.movey = 0;
    cookie.jumpTimer = 0;
  }
  stageClear() {
    this.stageGuide("STAGE CLEAR");
    stageInfo.currentStageIndex++;
    localStorage.setItem("currentStageIndex", stageInfo.currentStageIndex);
    localStorage.setItem("hp", cookie.hpValue);
    localStorage.setItem("score", stageInfo.totalScore);
    if (localStorage.getItem("highestScore") < stageInfo.totalScore) {
      localStorage.setItem("highestScore", stageInfo.totalScore);
    }
    document.querySelector(".cookie").className = "cookie run";

    setTimeout(() => {
      const nextStage = confirm("다음 스테이지?");
      if (nextStage) {
        cookie.movex = 0;
        gameBackground.gameBox.style.transform = `translateX(${0}px)`;

        allJellyComProp.arr.forEach((j) => {
          console.log(j);
          j.el.remove();
        });
        allJellyComProp.arr.splice(0);

        allObstacleComProp.arr.forEach((o) => {
          o.el.remove();
        });
        allObstacleComProp.arr.splice(0);

        newStage = new Stage(stageInfo.stage[stageInfo.currentStageIndex]);
        stageInfo.currentStage = newStage;

        gameProp.gameClear = false;
      } else {
        cookie.movex = 0;
        gameBackground.gameBox.style.transform = `translateX(${0}px)`;

        allJellyComProp.arr.forEach((j) => {
          console.log(j);
          j.el.remove();
        });
        allJellyComProp.arr.splice(0);

        allObstacleComProp.arr.forEach((o) => {
          o.el.remove();
        });
        allObstacleComProp.arr.splice(0);
        location.href = "index.html";
      }
    }, 1500);
  }
  allClear() {
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
    this.jumpObstaclePosition.forEach((o) => {
      allObstacleComProp.arr.push(new Obstacle(o, gameProp.screenHeight * 0.75, this.damage, this.jumpObstacle));
    });
    this.doubleJumpObstaclePosition.forEach((o) => {
      allObstacleComProp.arr.push(new Obstacle(o, gameProp.screenHeight * 0.5, this.damage, this.doubleJumpObstacle));
    });
    this.slideObstaclePosition.forEach((o) => {
      allObstacleComProp.arr.push(new Obstacle(o, 0, this.damage, this.slideObstacle));
    });

    for (let i = 0; i <= (this.length - 500) / 100; i++) {
      const jellyPosition = 500 + i * 100;
      if (
        this.doubleJumpObstaclePosition.indexOf(jellyPosition + 100) === -1 &&
        this.jumpObstaclePosition.indexOf(jellyPosition + 100) === -1 &&
        this.slideObstaclePosition.indexOf(jellyPosition + 100) === -1
      ) {
        allJellyComProp.arr[i] = new Jelly(jellyPosition, gameProp.screenHeight * 0.675, "");
      } else if (this.doubleJumpObstaclePosition.indexOf(jellyPosition + 100) !== -1) {
        allJellyComProp.arr[i] = new Jelly(jellyPosition, gameProp.screenHeight * 0.225, "big_bear");
        allJellyComProp.arr[i + 1] = new Jelly(jellyPosition + 100, gameProp.screenHeight * 0.225, "big_bear");
        allJellyComProp.arr[i + 2] = new Jelly(jellyPosition + 200, gameProp.screenHeight * 0.225, "big_bear");
        i += 2;
      } else if (this.jumpObstaclePosition.indexOf(jellyPosition + 100) !== -1) {
        allJellyComProp.arr[i] = new Jelly(jellyPosition, gameProp.screenHeight * 0.475, "yellow_bear");
        allJellyComProp.arr[i + 1] = new Jelly(jellyPosition + 100, gameProp.screenHeight * 0.475, "pink_bear");
        allJellyComProp.arr[i + 2] = new Jelly(jellyPosition + 200, gameProp.screenHeight * 0.475, "blue_bear");
        i += 2;
      } else if (this.slideObstaclePosition.indexOf(jellyPosition + 100) !== -1) {
        allJellyComProp.arr[i] = new Jelly(jellyPosition, gameProp.screenHeight * 0.775, "yellow_bear");
        allJellyComProp.arr[i + 1] = new Jelly(jellyPosition + 100, gameProp.screenHeight * 0.775, "yellow_bear");
        allJellyComProp.arr[i + 2] = new Jelly(jellyPosition + 200, gameProp.screenHeight * 0.775, "yellow_bear");
        allJellyComProp.arr[i + 3] = new Jelly(jellyPosition + 300, gameProp.screenHeight * 0.775, "yellow_bear");
        i += 3;
      }
    }
    // for (let i = 0; i <= 10; i++) {
    //   allJellyComProp.arr[i] = new Jelly(500 + i * 100, gameProp.screenHeight * 0.6, 100);
    // }
    // for (let i = 0; i <= 10; i++) {
    //   allObstacleComProp.arr[i] = new Obstacle(1500 + i * 1500, gameProp.screenHeight * 0.9 - 247, this.damage);
    // }
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
    this.jumpState = 0; //0: 점프 가능(점프 안하는중), 1:1단 점프중, 2: 2단 점프중(점프 불가능), 3: 2단 점프중인데 또 눌렀을 때(2와 구분해 점프타이머 초기화시키지 않기 위해 설정)
    this.jumpSpeed = 10;
    this.jumpTimer = 0;
    this.jumpMaxHeight = -250;
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
      // 슬라이드
      if (this.jumpState === 0 && key.keyDown["slide"]) {
        this.el.classList.add("slide");
      }
      if (!key.keyDown["slide"]) {
        this.el.classList.remove("slide");
      }

      //점프
      if (this.jumpState > 0) {
        //jumpState = 1 or 2 or 3일 때

        //점프 타임 만료 시 내려오기
        if (this.jumpTimer >= this.jumpTime) {
          console.log(this.movey);
          // debugger;
          this.el.classList.remove("double");
          this.el.classList.add("down");

          if (this.movey < 0) {
            // 땅에 닿기 전까지 내려오기
            this.movey += this.jumpSpeed;
          } else if (this.movey === 0) {
            //다 내려오면 점프 상태 초기화, 타이머 초기화
            this.el.classList.remove("jump");
            this.el.classList.remove("down");

            this.jumpState = 0;
            this.jumpTimer = 0;
          }
        } else {
          //점프 타임 만료 전, 즉 점프 중일 때 위로 이동
          if (this.jumpState === 1) {
            this.el.classList.add("jump");
          }
          if (this.jumpState === 2) {
            this.el.classList.add("double");
            this.el.classList.remove("down");
          }
          this.movey -= this.jumpSpeed;
          this.jumpTimer++;
        }
      }
    }
  }
  // jump() {
  //   if (this.jumpState) {
  //     this.movey -= this.jumpSpeed;
  //     this.jumpTimer++;
  //   } else {
  //     if (this.movey < this.jumpMaxHeight) {
  //       this.movey += this.jumpSpeed;
  //     }
  //   }
  //   if (this.jumpTimer > 40) {
  //     this.jumpState = false;
  //     this.jumpTimer = 0;
  //   }

  //   // while (this.jumpState) {
  //   //   do {
  //   //     this.movey -= this.jumpSpeed;
  //   //   } while (this.movey > this.jumpMaxHeight);
  //   //   if (this.movey <= this.jumpMaxHeight) {
  //   //     while (this.movey < 0) {
  //   //       this.movey += this.jumpSpeed;
  //   //     }
  //   //   }
  //   //   if (this.movey === 0) {
  //   //     this.jumpState = false;
  //   //     this.el.classList.remove("jump");
  //   //   }
  //   // }
  // }
  minusHp(hp) {
    const hpBox = document.querySelector(".game_info .hp .hp_background .hp_progress");
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
  constructor(x, y, type) {
    this.parentNode = document.querySelector(".game");
    this.el = document.createElement("div");
    this.el.className = `jelly ${type}`;
    this.x = x;
    this.y = y;
    this.score = type === "" ? 100 : type === "yellow_bear" ? 200 : type === "pink_bear" ? 300 : type === "blue_bear" ? 500 : type === "big_bear" ? 1000 : 0;

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
  constructor(x, y, damage, className) {
    this.parentNode = document.querySelector(".game");
    this.el = document.createElement("div");
    this.el.className = className;
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
      this.position().right - 10 > cookie.position().left &&
      this.position().left + 10 < cookie.position().right &&
      this.position().top - 10 > cookie.position().bottom &&
      this.position().bottom + 10 < cookie.position().top
    ) {
      this.isCrashed = true;
      cookie.crashed = true;
      cookie.minusHp(this.damage * -1);
      // document.querySelector(".cookie").classList.add("crashed");
      if (!document.querySelector(".cookie").classList.contains("dead")) {
        document.querySelector(".cookie").classList.add("crashed");
      }
      document.querySelector(".crash_filter").style.display = "block";

      setTimeout(() => {
        document.querySelector(".cookie").classList.remove("crashed");
        document.querySelector(".crash_filter").style.display = "none";

        cookie.crashed = false;
      }, 1000);
    }
  }
}
