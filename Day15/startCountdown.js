// Tạo Hàm đếm ngược và cập nhập giá trị lên màn hình
function startCountdown() {
  const countdownDisplay = document.querySelector("#countdown-display");
  const getLinkButton = document.querySelector("#get-link-button");
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
          getLinkButton.removeAttribute("disable");
        }
      }
      // RequestAnimation Frame
    }
  }
}
