const progressBar = document.querySelector(".progress-bar");
const progress = progressBar.querySelector(".progress");
const progressSpan = progress.querySelector("span");
const playBtn = document.querySelector(".play-btn");

var isDrag = false;
var currentWidth;
var initialClientX = 0;
var current = 0;
var currentTime = 0;

var audio = new Audio("./mp3/Anh-Se-Don-EM.mp3");

// Tính chiều dài của element;
var progressBarWidth = progressBar.clientWidth;
// Tách hàm tính toán ra riêng;
var handleChange = function (width) {
  var value = (width * 100) / progressBarWidth;
  // Xét điều kiện để cập thanh cuộn không bị tràn ra ngoài
  if (value < 0) {
    value = 0;
  }
  if (value > 100) {
    value = 100;
  }
  // Thêm thuộc tính width vào
  progress.style.width = `${value}%`;
  currentWidth = width;

  // Khi click thì update lại nhạc
  currentTime = (value / 100) * audio.duration;
  currentTimeEL.innerText = getTime(currentTime);
  if (!isDrag) {
    audio.currentTime = currentTime;
  }
};

// Xử lý click chuột trái
progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    handleChange(e.offsetX);
    isDrag = true;
    initialClientX = e.clientX;
    current = e.offsetX;
  }
});

// Ngăn chăn sự kiện nổi bọt
progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  isDrag = true;
  initialClientX = e.clientX;
});

document.addEventListener("mouseup", function () {
  isDrag = false;
  current = currentWidth;
  audio.currentTime = currentTime;
});

document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var moveWidth = e.clientX - initialClientX;
    handleChange(current + moveWidth);
  }
});

// Xây dựng player phát nhạc
var currentTimeEL = progressBar.previousElementSibling;
var durationEl = progressBar.nextElementSibling;

var getTime = function (seconds) {
  //Tính số phút
  var mins = Math.floor(seconds / 60);
  // Tính số giây còn lại
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

// Load thời gian trên giao diện
// duration trả về độ dài của thời gian hiện tại
audio.addEventListener("loadeddata", function () {
  durationEl.innerText = getTime(audio.duration);
});

// Tạo ra 2 icon
var playIcon = `<i class="fa-solid fa-play"></i>`;
var pausedIcon = `<i class="fa-solid fa-pause"></i>`;

// Tạo sự kiện khi click vào play với pause
playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    this.innerHTML = pausedIcon;
  } else {
    audio.pause();
    this.innerHTML = playIcon;
  }
});

// Khi nhạc chạy thì thời gian thay đổi
// CurrentTime Trả về vị trí hiện tại cho âm thanh;
audio.addEventListener("timeupdate", function () {
  if (!isDrag) {
    currentTimeEL.innerText = getTime(audio.currentTime);
    // Tính tỉ lệ phần trăm
    var value = (audio.currentTime * 100) / audio.duration;
    // update vào timer
    progress.style.width = `${value}%`;
    currentTime = this.currentTime; // Gán thời gian hiện tại vào biến currentTime;
    handleKaraoke(currentTime);
  }
});

// Khi chạy hết bài thì quay lại từ đầu
// ended
audio.addEventListener("ended", function () {
  audio.currentTime = 0; // Đặt thời gian lại về 0
  playBtn.innerHTML = playIcon; // Gán lại bằng icon play
});

lyric = JSON.parse(lyric).data.sentences;
console.log(lyric);
