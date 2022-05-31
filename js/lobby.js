let rank = "UNRANKED";
let rankImgUrl = "url('./lib/ranks/No_rank.png')";
const rankGuideBox = document.querySelector(".rank_guide");

const myPage = () => {
  document.querySelector(".my_page").style.display = document.querySelector(".my_page").style.display === "none" ? "block" : "none";
};
const notice = () => {
  document.querySelector(".notice_page").style.display = document.querySelector(".notice_page").style.display === "none" ? "block" : "none";
};

const rankGuide = () => {
  rankGuideBox.style.display = rankGuideBox.style.display === "none" ? "block" : "none";
};

const reset = () => {
  doReset = confirm("모든 데이터가 지워집니다. 리셋 하시겠어요?");
  if (doReset) {
    localStorage.clear();
    // console.log(localStorage);
    location.reload();
  } else {
    return;
  }
};

const windowEvent = () => {
  document.querySelector(".rank_image").addEventListener("mouseover", (e) => {
    rankGuideBox.style.display = "table-cell";
  });
  document.querySelector(".rank_image").addEventListener("mouseout", (e) => {
    rankGuideBox.style.display = "none";
  });
};

const loadImg = () => {
  //이미지 미리 로드
  const preLoadImgSrc = [
    "./lib/lobby/The Witch's Kitchen.png",
    "./lib/images/gingerMK_profile.png",
    "./lib/lobby/notice.png",
    "./lib/ranks/No_rank.png",
    "./lib/ranks/rank_Guide.PNG",
    "./lib/images/gingerMK_run.png",
    "./lib/images/gingerMK_slide.png",
    "./lib/images/gingerMK_jump_one.png",
    "./lib/images/gingerMK_jump_double.png",
    "./lib/images/gingerMK_jump_down.png",
    "./lib/images/gingerMK_crashed3.png",
    "./lib/images/gingerMK_dead.png",
    "./lib/jelly/blue_jelly_bean.png",
    "./lib/jelly/yellow_bear_jelly.png",
    "./lib/jelly/pink_bear_jelly.png",
    "./lib/jelly/blue_bear_jelly.png",
    "./lib/jelly/big_bear_jelly.png",
    "./lib/obstacles/clock.png",
    "./lib/obstacles/pink_crystal.png",
    "./lib/obstacles/snacks.png",
    "./lib/obstacles/cake1.png",
    "./lib/obstacles/table.png",
    "./lib/obstacles/green_crystal.png",
    "./lib/obstacles/mini_snack.png",
    "./lib/obstacles/lamp.png",
    "./lib/obstacles/long_crystal.png",
    "./lib/obstacles/knife.png",
  ];
  preLoadImgSrc.forEach((arr) => {
    const img = new Image();
    img.src = arr;
    if (arr === preLoadImgSrc[preLoadImgSrc.length - 1]) {
      img.onload = () => {
        document.querySelector(".loading_box").style.display = "none";
      };
    }
  });
};

const init = () => {
  const highestScoreBox = document.querySelector(".highest_score_text");
  const highestScore = localStorage.getItem("highestScore") ? localStorage.getItem("highestScore") : "기록 없음";
  highestScoreBox.innerText = "내 최고 점수: " + highestScore;

  const scoreBox = document.querySelector(".score_text");
  const score = localStorage.getItem("score") ? localStorage.getItem("score") : "기록 없음";
  scoreBox.innerText = "현재 점수: " + score;

  rankGuideBox.style.display = "none";
  document.querySelector(".my_page").style.display = "none";
  document.querySelector(".notice_page").style.display = "none";

  if (highestScore >= 170000) {
    rank = "RAINBOW";
    rankImgUrl = "url('./lib/ranks/Rainbow.png')";
  } else if (highestScore >= 140000) {
    rank = "DIAMOND";
    rankImgUrl = "url('./lib/ranks/Diamond.png')";
  } else if (highestScore >= 100000) {
    rank = "RUBY";
    rankImgUrl = "url('./lib/ranks/Ruby.png')";
  } else if (highestScore >= 60000) {
    rank = "GOLD";
    rankImgUrl = "url('./lib/ranks/Gold.png')";
  } else if (highestScore >= 30000) {
    rank = "SILVER";
    rankImgUrl = "url('./lib/ranks/Silver.png')";
  } else if (highestScore > 0) {
    rank = "BRONZE";
    rankImgUrl = "url('./lib/ranks/Bronze.png')";
  }
  document.querySelector(".rank_text").innerText = rank;
  document.querySelector(".rank_image").style.backgroundImage = rankImgUrl;

  //   if (!localStorage.getItem("score")) {
  //     localStorage.setItem("score", 0);
  //   }

  if (!localStorage.getItem("currentStageIndex")) {
    localStorage.setItem("currentStageIndex", 0);
  }

  loadImg();
  windowEvent();
};

window.onload = () => {
  init();
};
