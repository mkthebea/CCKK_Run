let rank = "UNRANKED";
let rankImgUrl = "url('../lib/ranks/No_rank.png')";
const rankGuideBox = document.querySelector(".rank_guide");

const myPage = () => {
  document.querySelector(".my_page").style.display = document.querySelector(".my_page").style.display === "none" ? "block" : "none";
};

const rankGuide = () => {
  rankGuideBox.style.display = rankGuideBox.style.display === "none" ? "block" : "none";
};

const reset = () => {
  doReset = confirm("모든 데이터가 지워집니다. 리셋 하시겠어요?");
  if (doReset) {
    localStorage.clear();
    console.log(localStorage);
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

const init = () => {
  const highestScoreBox = document.querySelector(".highest_score_text");
  const highestScore = localStorage.getItem("highestScore") ? localStorage.getItem("highestScore") : "기록 없음";
  highestScoreBox.innerText = "내 최고 점수: " + highestScore;

  const scoreBox = document.querySelector(".score_text");
  const score = localStorage.getItem("score") ? localStorage.getItem("score") : "기록 없음";
  scoreBox.innerText = "현재 점수: " + score;

  rankGuideBox.style.display = "none";
  document.querySelector(".my_page").style.display = "none";

  if (highestScore >= 1700) {
    rank = "RAINBOW";
    rankImgUrl = "url('./lib/ranks/Rainbow.png')";
  } else if (highestScore >= 1500) {
    rank = "DIAMOND";
    rankImgUrl = "url('./lib/ranks/Diamond.png')";
  } else if (highestScore >= 1200) {
    rank = "RUBY";
    rankImgUrl = "url('./lib/ranks/Ruby.png')";
  } else if (highestScore >= 1000) {
    rank = "GOLD";
    rankImgUrl = "url('./lib/ranks/Gold.png')";
  } else if (highestScore >= 700) {
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

  windowEvent();
};

window.onload = () => {
  init();
};
