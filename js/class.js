class Stage {
  constructor() {
    this.level = 0;
    this.isStart = false;

    this.stageStart();
  }
  stageStart() {
    this.isStart = true;
    this.stageGuide(`START STAGE ${this.level + 1}`);
  }
  stageEnd() {
    this.isStart = false;
  }
  callJelly() {
    for (let i = 0; i <= 100; i++) {
      allJellyComProp.arr[i] = new Jelly(500 + i * 300, 400, 100);
    }
  }
  stageGuide(text) {
    this.parentNode = document.querySelector(".game_app");
    this.textBox = document.createElement("div");
    if (text === "PAUSED") {
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
    if (!gameProp.paused) {
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
