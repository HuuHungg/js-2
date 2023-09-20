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

var karaoke = document.querySelector(".karaoke");
var karaokeInner = karaoke.querySelector(".karaoke-inner");
var karaokePlayBtn = karaoke.querySelector(".play");
var karaokeCloseBtn = karaoke.querySelector(".close");
var player = document.querySelector(".player");
var karaokeContent = karaoke.querySelector(".karaoke-content");

karaokePlayBtn.addEventListener("click", function () {
  karaokeInner.classList.add("show");
  player.classList.add("bottom");
});

karaokeCloseBtn.addEventListener("click", function () {
  karaokeInner.classList.remove("show");
  player.classList.remove("bottom");
});

var karaokeInterval;
// Lắng nghe sự kiện play
audio.addEventListener("play", function () {
  console.log("play");
  karaokeInterval = setInterval(handleKaraoke, 100);
});

// Lắng nghe sự kiên pause
audio.addEventListener("pause", function () {
  console.log("pause");
  clearInterval(karaokeInterval);
});

var handleKaraoke = function () {
  var currentTime = audio.currentTime * 1000;
  var index = lyric.findIndex(function (lyricItem) {
    return (
      currentTime >= lyricItem.words[0].startTime &&
      currentTime <= lyricItem.words[lyricItem.words.length - 1].endTime
    );
  });
  if (index !== -1) {
    if (index === 0) {
      var outputHtml = `
      <p data-index = "${index}">${getSentence(0)}</p> 
      <p data-index = "${index + 1}">${getSentence(1)}</p>
    `;
      karaokeContent.innerHTML = outputHtml;
    } else {
      // Số lẻ -> Ẩn dòng đầu và hiển thị câu tiếp theo
      // Số chẵn -> Ẩn dòng thứ hai và hiển thị câu tiếp theo
      if (index % 2 !== 0) {
        changeSentence(
          karaokeContent.children[0],
          getSentence(index + 1),
          index + 1
        );
      } else {
        changeSentence(
          karaokeContent.children[1],
          getSentence(index + 1),
          index + 1
        );
      }
    }
    // Xử lý tô màu
    var currentLienEl = karaokeContent.querySelector(`[data-index="${index}"]`);
    if (currentLienEl) {
      var wordIndex = getWorkIndex(index, currentTime);
      // Array.form ép về kiểu mảng;
      Array.from(currentLienEl.children).forEach(function (wordEl, i) {
        if (wordIndex === i) {
          var word = lyric[index].words[wordIndex];
          var rate =
            ((currentTime - word.startTime) * 100) /
            (word.endTime - word.startTime);
          wordEl.children[0].style.width = `${rate}%`;
          if (i > 0) {
            Array.from(currentLienEl.children)[
              i - 1
            ].children[0].style.width = `100%`;
          }
        }
      });
    }
  }
};

var getSentence = function (index) {
  return lyric[index].words
    .map(function (word) {
      return `
      <span class="word">
        ${word.data} 
        <span>${word.data}</span>
      </span>`;
    })
    .join(" ");
};

var changeSentence = function (element, sentence, index) {
  element.style.transition = "all 0.4s ease";
  element.style.opacity = 0;
  setTimeout(function () {
    element.innerHTML = sentence;
    element.style.opacity = 1;
    element.dataset.index = index;
  }, 300);
};

var getWorkIndex = function (index, currentTime) {
  return lyric[index].words.findIndex(function (item) {
    return currentTime >= item.startTime && currentTime < item.endTime;
  });
};

// index = 1 => Ẩn element 0 -> Hiển thị index = 2;
// index = 2 => Ẩn element 1 -> Hiển thị index = 3;
// index = 3 => Ẩn element 0 -> Hiển thị index = 4;
// index = 4 => Ẩn element 1 -> Hiển thị index = 5;
