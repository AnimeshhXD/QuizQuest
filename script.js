const questions = [
  {
    question: "What is the capital of France?",
    options: ["Rome", "Paris", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Who wrote 'Macbeth'?",
    options: ["Leo Tolstoy", "Shakespeare", "Charles Dickens", "Mark Twain"],
    answer: "Shakespeare"
  },
  {
    question: "2 + 2 * 2 = ?",
    options: ["6", "8", "4", "10"],
    answer: "6"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: "Hyper Text Markup Language"
  }
];

let shuffledQuestions, currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const progressEl = document.getElementById("progress");
const timeEl = document.getElementById("time");

const highScore = localStorage.getItem("highScore") || 0;
highScoreEl.textContent = `High Score: ${highScore}`;

function startQuiz() {
  score = 0;
  currentIndex = 0;
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  nextBtn.textContent = "Next";
  restartBtn.style.display = "none";
  nextBtn.style.display = "block";
  updateScore();
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion(); // auto move if time runs out
    }
  }, 1000);

  resetState();
  let currentQuestion = shuffledQuestions[currentIndex];
  questionEl.textContent = currentQuestion.question;
  currentQuestion.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(option));
    answersEl.appendChild(btn);
  });

  updateProgress();
}

function resetState() {
  answersEl.innerHTML = "";
}

function selectAnswer(option) {
  clearInterval(timer);
  const correct = shuffledQuestions[currentIndex].answer;
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.background = "#4caf50";
    } else if (btn.textContent === option) {
      btn.style.background = "#f44336";
    }
  });
  if (option === correct) {
    score++;
    updateScore();
  }
}

function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
}

function updateTimer() {
  timeEl.textContent = timeLeft;
}

function updateProgress() {
  const percent = ((currentIndex) / questions.length) * 100;
  progressEl.style.width = `${percent}%`;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  questionEl.textContent = `Quiz Completed! Your score is ${score}/${questions.length}`;
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "block";

  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScoreEl.textContent = `High Score: ${score}`;
  }

  progressEl.style.width = "100%";
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

startQuiz();
