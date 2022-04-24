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
  const preLoadImgSrc = ["../lib/lobby/The Witch's Kitchen.png", "../lib/images/gingerMK_profile.png", "../lib/lobby/notice.png", "../lib/ranks/No_rank.png", "../lib/ranks/rank_Guide.PNG"];
  preLoadImgSrc.forEach((arr) => {
    const img = new Image();
    img.src = arr;
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

  if (highestScore >= 12600) {
    rank = "RAINBOW";
    rankImgUrl = "url('./lib/ranks/Rainbow.png')";
  } else if (highestScore >= 10500) {
    rank = "DIAMOND";
    rankImgUrl = "url('./lib/ranks/Diamond.png')";
  } else if (highestScore >= 8400) {
    rank = "RUBY";
    rankImgUrl = "url('./lib/ranks/Ruby.png')";
  } else if (highestScore >= 6300) {
    rank = "GOLD";
    rankImgUrl = "url('./lib/ranks/Gold.png')";
  } else if (highestScore >= 4200) {
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
