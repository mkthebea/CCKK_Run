const reset = () => {
  localStorage.clear();
  console.log(localStorage);
  location.reload();
};

const init = () => {
  const highestScoreBox = document.querySelector(".highest_score");
  const highestScore = localStorage.getItem("highestScore") ? localStorage.getItem("highestScore") : "기록 없음";
  highestScoreBox.innerText = "내 최고 점수(모든 스테이지): " + highestScore;

  const scoreBox = document.querySelector(".score");
  const score = localStorage.getItem("score") ? localStorage.getItem("score") : "기록 없음";
  scoreBox.innerText = "현재 점수: " + score;

  //   if (!localStorage.getItem("score")) {
  //     localStorage.setItem("score", 0);
  //   }

  if (!localStorage.getItem("currentStageIndex")) {
    localStorage.setItem("currentStageIndex", 0);
  }
};

window.onload = () => {
  init();
};
