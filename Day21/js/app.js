import { client } from "./client.js";
import { config } from "./config.js";
const { SERVER_API } = config;

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-button");

const scoreContainer = document.getElementById("score-container");
const correctAnswersDisplay = document.getElementById("correct-answers");
const wrongAnswersDisplay = document.getElementById("wrong-answers");
const playAgainButton = document.getElementById("play-again-btn");

let correctAnswers = 0;
let wrongAnswers = 0;
let timeLeft = 10;
let countdownInterval;

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

async function startGame() {
  startButton.classList.add("hide");
  try {
    const response = await fetch(`${SERVER_API}/questions`);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      shuffledQuestions = data;
      currentQuestionIndex = 0;
      questionContainerElement.classList.remove("hide");
      setNextQuestion();
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

function startCountdown() {
  timeLeft = 10;
  clearInterval(countdownInterval);
  countdownInterval = setInterval(function () {
    document.getElementById(
      "countdown-timer"
    ).innerText = `${timeLeft} seconds`;
    if (timeLeft === 0) {
      clearInterval(countdownInterval);
      handleTimeout();
    } else {
      timeLeft--;
    }
  }, 1000);
}

function setNextQuestion() {
  resetState();
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    startCountdown();
  } else {
    showScore(); // Display the score container when there are no more questions.
  }
}
function handleTimeout() {
  wrongAnswers++;
  currentQuestionIndex++;
  setNextQuestion();
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  answerButtonsElement.innerHTML = "";
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Preload audio files
const correctAudio = document.getElementById("correct-audio");
const errorAudio = document.getElementById("error-audio");

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;
  setStatusClass(document.body, correct);

  // Play the appropriate audio instantly
  if (correct) {
    correctAudio.currentTime = 0; // Reset audio to the beginning
    correctAudio.play();
  } else {
    errorAudio.currentTime = 0; // Reset audio to the beginning
    errorAudio.play();
  }

  if (correct) {
    correctAnswers++;
  } else {
    wrongAnswers++;
  }

  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    questionContainerElement.classList.add("hide");
  }
}
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function showScore() {
  scoreContainer.classList.remove("hide");
  correctAnswersDisplay.innerText = correctAnswers;
  wrongAnswersDisplay.innerText = wrongAnswers;
}

function resetGame() {
  scoreContainer.classList.add("hide");
  startButton.classList.remove("hide");
  correctAnswers = 0;
  wrongAnswers = 0;
  currentQuestionIndex = 0;
}

playAgainButton.addEventListener("click", resetGame);
