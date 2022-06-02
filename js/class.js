class Stage {
  constructor(stage) {
    this.stageName = stage.name;
    this.backgroundUrl = stage.backgroundUrl;
    this.groundUrl = stage.groundUrl;
    this.length = stage.length;
    // this.speed = stage.speed;
    this.damage = stage.damage;
    this.jumpObstacle = stage.jumpObstacle;
    this.jumpObstaclePosition = stage.jumpObstaclePosition;
    this.doubleJumpObstacle = stage.doubleJumpObstacle;
    this.doubleJumpObstaclePosition = stage.doubleJumpObstaclePosition;
    this.slideObstacle = stage.slideObstacle;
    this.slideObstaclePosition = stage.slideObstaclePosition;
    this.blastPosition = stage.blastPosition;
    this.coinMagicPosition = stage.coinMagicPosition;
    this.giantPosition = stage.giantPosition;
    this.magnetPosition = stage.magnetPosition;
    this.energyPosition = stage.energyPosition;
    this.miniEnergyPosition = stage.miniEnergyPosition;
    this.itemPosition = [];
    this.goodPatternPosition = stage.goodPatternPosition;
    this.jellyPatternPosition = stage.jellyPatternPosition;
    this.totalCoin = 0;

    this.init();
    this.stageStart();
  }
  init() {
    // cookie.speed = this.speed;
    gameBackground.gameBox.style.backgroundImage = `url(${this.backgroundUrl})`;
    gameBackground.groundBox.style.backgroundImage = `url(${this.groundUrl})`;
    document.querySelector(".coin_amount").innerText = this.totalCoin;
    this.itemPosition = this.blastPosition.concat(this.coinMagicPosition, this.giantPosition, this.magnetPosition, this.energyPosition, this.miniEnergyPosition);
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
      } else {
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
    //아이템 push
    this.blastPosition.forEach((o) => {
      allItemComProp.arr.push(new Item(o, 480, "blast"));
    });
    this.coinMagicPosition.forEach((o) => {
      allItemComProp.arr.push(new Item(o, 480, "coin_magic"));
    });
    this.giantPosition.forEach((o) => {
      allItemComProp.arr.push(new Item(o, 480, "giant"));
    });
    this.magnetPosition.forEach((o) => {
      allItemComProp.arr.push(new Item(o, 480, "magnet"));
    });
    this.energyPosition.forEach((o) => {
      allItemComProp.arr.push(new Item(o, 450, "energy_potion"));
      this.itemPosition.push(o + 100);
    });
    this.miniEnergyPosition.forEach((o) => {
      allItemComProp.arr.push(new Item(o, 480, "mini_energy_potion"));
    });

    //장애물 push
    this.jumpObstaclePosition.forEach((o) => {
      allObstacleComProp.arr.push(new Obstacle(o, 565.5, this.damage, this.jumpObstacle));
    });
    this.doubleJumpObstaclePosition.forEach((o) => {
      allObstacleComProp.arr.push(new Obstacle(o, 377, this.damage, this.doubleJumpObstacle));
    });
    this.slideObstaclePosition.forEach((o) => {
      allObstacleComProp.arr.push(new Obstacle(o, 0, this.damage, this.slideObstacle));
    });

    //젤리 push
    for (let i = 0; i < (this.length - 500) / 100; i++) {
      const jellyPosition = 500 + i * 100;
      if (
        this.doubleJumpObstaclePosition.indexOf(jellyPosition + 100) === -1 &&
        this.jumpObstaclePosition.indexOf(jellyPosition + 100) === -1 &&
        this.slideObstaclePosition.indexOf(jellyPosition + 100) === -1 &&
        this.itemPosition.indexOf(jellyPosition) === -1 &&
        this.goodPatternPosition.indexOf(jellyPosition + 100) === -1 &&
        this.jellyPatternPosition.indexOf(jellyPosition + 100) === -1
      ) {
        allJellyComProp.arr.push(new Jelly(jellyPosition, 500, ""));
      } else if (this.doubleJumpObstaclePosition.indexOf(jellyPosition + 100) !== -1) {
        allJellyComProp.arr.push(new Jelly(jellyPosition, 169.65, "big_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 100, 169.65, "big_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 200, 169.65, "big_bear"));
        i += 2;
      } else if (this.jumpObstaclePosition.indexOf(jellyPosition + 100) !== -1) {
        allJellyComProp.arr.push(new Jelly(jellyPosition, 358.15, "yellow_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 100, 358.15, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 200, 358.15, "blue_bear"));
        i += 2;
      } else if (this.slideObstaclePosition.indexOf(jellyPosition + 100) !== -1) {
        allJellyComProp.arr.push(new Jelly(jellyPosition, 584.35, "yellow_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 100, 584.35, "yellow_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 200, 584.35, "yellow_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 300, 584.35, "yellow_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 400, 584.35, "yellow_bear"));
        i += 4;
      } else if (this.goodPatternPosition.indexOf(jellyPosition + 100) !== -1) {
        //GOOD 패턴
        allJellyComProp.arr.push(new Jelly(jellyPosition + 150, 400, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 200, 400, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 250, 400, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 100, 450, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 100, 500, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 200, 500, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 250, 500, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 100, 550, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 250, 550, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 150, 600, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 200, 600, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 250, 600, "pink_bear"));

        allJellyComProp.arr.push(new Jelly(jellyPosition + 400, 400, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 450, 400, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 350, 450, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 500, 450, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 350, 500, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 500, 500, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 350, 550, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 500, 550, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 400, 600, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 450, 600, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 650, 400, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 700, 400, "pink_bear"));

        allJellyComProp.arr.push(new Jelly(jellyPosition + 600, 450, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 750, 450, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 600, 500, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 750, 500, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 600, 550, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 750, 550, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 650, 600, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 700, 600, "pink_bear"));

        allJellyComProp.arr.push(new Jelly(jellyPosition + 850, 400, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 900, 400, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 950, 400, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 850, 450, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 1000, 450, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 850, 500, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 1000, 500, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 850, 550, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 1000, 550, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 850, 600, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 900, 600, "pink_bear"));
        allJellyComProp.arr.push(new Jelly(jellyPosition + 950, 600, "pink_bear"));

        i += 10;
      } else if (this.jellyPatternPosition.indexOf(jellyPosition + 100) !== -1) {
        for (let l = 0; l < 10; l++) {
          for (let k = 0; k < 4; k++) {
            allJellyComProp.arr.push(new Jelly(jellyPosition + 100 * l, 500 - 100 * k, "yellow_bear"));
          }
          i++;
        }
      }
    }

    // let total = 0;
    // allJellyComProp.arr.forEach((o) => {
    //   let tem;
    //   tem = o.type === "coin" ? 10 : o.type === "yellow_bear" ? 200 : o.type === "pink_bear" ? 300 : o.type === "blue_bear" ? 500 : o.type === "big_bear" ? 1000 : 0;
    //   total += tem;
    // });
    // console.log("총점: ", total);
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
    this.jumpSpeed = 15;
    this.jumpTimer = 0;
    this.jumpMaxHeight = -250;
    this.jumpTime = 25;
    this.defaultHpValue = 1000;
    this.hpValue = localStorage.getItem("hp") ? localStorage.getItem("hp") * 1 : this.defaultHpValue;
    this.hpProgress = 0;
    this.crashed = false;
    this.superCookie = false;
    this.eatenItem = 0;

    this.minusHp(0);
  }
  position() {
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: 754 - this.el.getBoundingClientRect().top,
      bottom: 754 - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
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
  minusHp(hp) {
    const hpBox = document.querySelector(".game_info .hp .hp_background .hp_progress");
    this.hpValue += hp;
    this.hpProgress = Math.max(0, (this.hpValue / this.defaultHpValue) * 100);
    hpBox.style.width = this.hpProgress + "%";

    if (this.hpValue <= 0) {
      this.dead();
    }
  }
  plusHp(hp) {
    const hpBox = document.querySelector(".game_info .hp .hp_background .hp_progress");
    this.hpValue = Math.min(this.defaultHpValue, this.hpValue + hp);
    this.hpProgress = Math.min(100, (this.hpValue / this.defaultHpValue) * 100);
    hpBox.style.width = this.hpProgress + "%";
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
    this.type = type;
    this.score = type === "coin" ? 10 : type === "" ? 100 : type === "yellow_bear" ? 200 : type === "pink_bear" ? 300 : type === "blue_bear" ? 500 : type === "big_bear" ? 1000 : 0;
    this.magnet = false;

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
      top: 754 - this.el.getBoundingClientRect().top,
      bottom: 754 - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
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
      }
    }
  }
  setScore() {
    if (!gameProp.paused) {
      stageInfo.totalScore += this.score;
      document.querySelector(".score_box").innerText = stageInfo.totalScore;
      if (this.type === "coin") {
        stageInfo.currentStage.totalCoin += 1;
        document.querySelector(".coin_amount").innerText = stageInfo.currentStage.totalCoin;
      }
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
    // this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.el.style.left = `${this.x}px`;
    this.el.style.top = `${this.y}px`;

    this.parentNode.appendChild(this.el);
  }
  position() {
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: 754 - this.el.getBoundingClientRect().top,
      bottom: 754 - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
    };
  }
  crashObstacle() {
    if (!cookie.superCookie) {
      if (
        this.position().right - 30 > cookie.position().left &&
        this.position().left + 30 < cookie.position().right &&
        this.position().top - 30 > cookie.position().bottom &&
        this.position().bottom + 30 < cookie.position().top
      ) {
        this.isCrashed = true;
        cookie.crashed = true;
        cookie.minusHp(this.damage * -1);
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
    } else {
      if (
        this.position().right - 10 > cookie.position().left &&
        this.position().left + 10 < cookie.position().right &&
        this.position().top - 10 > cookie.position().bottom &&
        this.position().bottom + 10 < cookie.position().top
      ) {
        // this.el.style.opacity = "0.5"; //장파 모션 추가
        this.el.classList.add("broken");
      }
    }
  }
  coinMagicObstacle() {
    for (let i = 0; i < (this.position().top - this.position().bottom) / 50; i++) {
      for (let j = 0; j < (this.position().right - this.position().left) / 50; j++) {
        allJellyComProp.arr.push(new Jelly(this.x + j * 50, this.y + i * 50 - 35, "coin"));
      }
    }
    this.el.remove();
  }
}

class Item {
  constructor(x, y, type) {
    this.parentNode = document.querySelector(".game");
    this.el = document.createElement("div");
    this.el.className = `item ${type}`;
    this.x = x;
    this.y = y;
    this.type = type;

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
      top: 754 - this.el.getBoundingClientRect().top,
      bottom: 754 - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
    };
  }
  crashItemJelly() {
    if (!gameProp.paused) {
      if (
        this.position().right > cookie.position().left &&
        this.position().left < cookie.position().right &&
        this.position().top > cookie.position().bottom &&
        this.position().bottom < cookie.position().top
      ) {
        this.el.remove();
        if (this.type === "blast") {
          cookie.eatenItem++;
          this.blast();
        } else if (this.type === "giant") {
          cookie.eatenItem++;
          this.giant();
        } else if (this.type === "coin_magic") {
          this.coinMagic();
        } else if (this.type === "magnet") {
          this.magnet();
        } else if (this.type === "energy_potion") {
          cookie.plusHp(500);
        } else if (this.type === "mini_energy_potion") {
          cookie.plusHp(50);
        }
      }
    }
  }
  blast() {
    document.querySelector(".cookie").classList.add("blast");
    cookie.speed *= 2;
    cookie.superCookie = true;

    setTimeout(() => {
      document.querySelector(".cookie").classList.remove("blast");
      if (!document.querySelector(".cookie").classList.contains("giant")) {
        document.querySelector(".cookie").classList.add("supper");
      }
      cookie.speed /= 2;
    }, 1500);
    setTimeout(() => {
      cookie.eatenItem--;
      if (cookie.eatenItem === 0) {
        document.querySelector(".cookie").classList.remove("supper");
        cookie.superCookie = false;
      }
    }, 3000);
  }
  giant() {
    document.querySelector(".cookie").classList.add("giant");
    cookie.superCookie = true;

    setTimeout(() => {
      document.querySelector(".cookie").classList.remove("giant");
      if (!document.querySelector(".cookie").classList.contains("blast")) {
        document.querySelector(".cookie").classList.add("supper");
      }
    }, 2000);
    setTimeout(() => {
      cookie.eatenItem--;
      if (cookie.eatenItem === 0) {
        document.querySelector(".cookie").classList.remove("supper");
        cookie.superCookie = false;
      }
    }, 3500);
  }
  coinMagic() {
    allObstacleComProp.arr.forEach((arr) => {
      if (arr.x < cookie.movex + (gameProp.screenWidth / 5) * 4 && arr.x > cookie.movex - gameProp.screenWidth / 5) {
        arr.coinMagicObstacle();
      }
    });
  }
  magnet() {
    allJellyComProp.arr.forEach((arr) => {
      if (arr.x < cookie.movex + (gameProp.screenWidth / 5) * 4 && arr.x > cookie.movex - gameProp.screenWidth / 5) {
        arr.magnet = true;
      }
    });
  }
}
