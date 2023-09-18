// Xây dựng tính năng karaoke;
var karaoke = document.querySelector(".karaoke");
var karaokePlayBtn = document.querySelector(".play");
var karaokeInner = karaoke.querySelector(".karaoke-inner");
var karaokeClose = karaokeInner.querySelector(".close");
var karaokeContent = karaokeInner.querySelector(".karaoke-content");

var songInfo = `
  <p> Anh sẽ đón em </p>
  <p> Ca sỹ: Nguyên Trang </p>
`;

karaokePlayBtn.addEventListener("click", function () {
  karaokeInner.classList.add("show");
  karaokeContent.innerHTML = songInfo;
});

karaokeClose.addEventListener("click", function () {
  karaokeInner.classList.remove("show");
  karaokeContent.innerHTML = "";
});

var number = 2;

var handleKaraoke = function (currentTime) {
  // Quy đổi currentTime ra miligiây
  currentTime *= 1000;

  var index = lyric.findIndex(function (wordItem) {
    var wordItemArr = wordItem.words;
    return (
      // Lớn hơn thời gian bắt đầu của từ thứ nhất
      currentTime >= wordItemArr[0].startTime &&
      // Nhỏ hơn hoặc bằng thời gian kết thúc của từ cuối cùng
      currentTime <= wordItemArr[wordItemArr.length - 1].endTime
    );
  });
  if (index !== -1) {
    var karaokeContent = karaokeInner.querySelector(".karaoke-content");
    karaokeContent.innerText = "";
    // Vòng lặp các câu trong 1 màn hình
    // Page = 1 -> index = 0 đến 1;
    // Page = 2 -> index = 2 đến 3;
    // Page = 3 -> index = 4 đến 5;
    // index = (page - 1) * 2;
    // Công thức: page = index / 2 + 1;

    // Math.floor làm tròn xuống
    var page = Math.floor(index / 2 + 1);
    var offset = (page - 1) * number;
    // console.log(`Index = ${index}`, `Offset = ${offset}`);

    if (index >= offset && index < offset + number) {
      var div = document.createElement("div");
      for (var i = offset; i < offset + number; i++) {
        // Vòng lặp các câu trong 1 màn hình
        var p = document.createElement("p");

        // Vòng lặp các từ trong 1 câu
        lyric[i].words.forEach(function (word) {
          var wordEl = document.createElement("span");
          wordEl.classList.add("word");
          wordEl.innerText = word.data + " ";

          var span = document.createElement("span");
          span.innerText = word.data;
          wordEl.append(span);
          p.append(wordEl);
        });
        div.append(p);
        karaokeContent.append(p);
        // if (p.previousElementSibling !== null) {
        //   p.previousElementSibling.remove();
        // }
      }
      karaokeContent.append(div);
    }
  }
};
