let countdown = 10; // Tạo biến thời gian đếm ngược
let isTabActive = true; // Kiểm tra xem tab hiện tại của trình duyệt có hoạt động không
const fameDuration = 1000; // Độ trễ môi farme là 1 giây

// Create Function get link
function clickToGetLink() {
  // Chuyển hướng sang trang để lấy link
  window.location.href = "https://fullstack.edu.vn/";
}

// Tạo Hàm đếm ngược và cập nhập giá trị lên màn hình
function startCountdown() {
  const countdownDisplay = document.querySelector("#countdown-display");
  const getLinkButton = document.querySelector(".get-link-button");
  // performance// Thời gian hiện tại tính bằng mili giây
  let lastFrameTime = performance.now();

  function updateCountdown(currentTime) {
    if (isTabActive) {
      // Tính thời gian đã trôi qua kể từ lần cập nhập cuối cùng, thời gian được lưu trong lastFarmeTime
      // Trừ lasFrameTime từ currentTime
      const elapsed = currentTime - lastFrameTime;
      if (elapsed >= fameDuration) {
        lastFrameTime = currentTime; // Nếu đủ thời gian thì cập nhập giá trị
        if (countdown > 0) {
          countdown--;
          countdownDisplay.textContent = `${countdown}`; // Cập nhập nội dung hiển thị nội dung đếm ngược mới
        } else {
          countdownDisplay.textContent = `0`;
          // Xoá disable đi
          getLinkButton.removeAttribute("disabled");
        }
      }
      // RequestAnimation Frame, Yêu cầu trình duyệt gọi hàm updateCountdown
      // Tạo ra một vòng lặp để cập nhập giá trị đếm ngược liên tục khi tab đang được xem ở trình duyệt
      requestAnimationFrame(updateCountdown);
    }
  }
  updateCountdown(lastFrameTime);
}

// Bắt sự kiện khi nút getlink được bấm
const getLinkButton2 = document.getElementById("get-link-button");
let isGetLinkClicked = false; // Kiểm tra xem nút được check hay chưa

getLinkButton2.addEventListener("click", () => {
  if (!isGetLinkClicked) {
    isGetLinkClicked = true;
    clickToGetLink();
  } else {
    getLinkButton2.classList.add("disable-cursor");
  }
});

// Gọi hàm đếm ngược khi trang được tải
startCountdown();
