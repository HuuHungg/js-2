const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.toLowerCase();
  switch (command) {
    case "google":
      showSuccessMessage();
      window.open("https://www.google.com", "_blank");
      break;
    case "facebook":
      showSuccessMessage();
      window.open("https://www.facebook.com", "_blank");
      break;
    case "youtube":
      showSuccessMessage();
      window.open("https://www.youtube.com", "_blank");
      break;
    case "google maps":
      showSuccessMessage();
      window.open("https://maps.google.com", "_blank");
      break;
    case "google drive":
      showSuccessMessage();
      window.open("https://drive.google.com", "_blank");
      break;
    default:
      alert("Không thực hiện được yêu cầu");
  }
};

const clickBtn = document.querySelector("#btnClick");
const statusMessage = document.querySelector("#statusMessage");
const successMessage = document.querySelector(".success");
const resultMessage = document.querySelector(".result");

function showSuccessMessage() {
  successMessage.style.display = "block";
  resultMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
    resultMessage.style.display = "none";
  }, 5000);
}

clickBtn.addEventListener("click", () => {
  recognition.start();
  statusMessage.style.display = "block"; // Show the message
  statusMessage.textContent = "Hãy nói gì đó";
});

recognition.onend = function () {
  recognition.stop();
  statusMessage.style.display = "none";
  statusMessage.textContent = "";
};
