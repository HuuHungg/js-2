const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

let lessionOrder = 1;

// Lặp qua từng phần tử gán class kéo thả tạo hiệu ứng
// Sử dụng dragstart và dragend => Hai sự kiện này liên quan đến việc kéo thả
// DragStart xảy ra khi kéo 1 phần tử bằng cách nhấp vào và giữ chuột
// DragEnd xảy ra khi kéo 1 phần tử và nhả chuột

// Sử dụng vòng lặp forEach để lặp qua
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging"); // Sử dụng class dragging cho hiệu ứng mờ đi với opacity = 0.5
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging"); // Xoá class dragging khi nhả chuột;
  });
});

function getDragAfterElement(container, y) {
  // Lấy tất cả các phần tử có lớp CSS 'draggable' nhưng không có lớp "dragging";
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  // Sử dụng reduce để tìm phần tử mục tiêu
  return draggableElements.reduce(
    (closet, child) => {
      const box = child.getBoundingClientRect(); // getBoundingClientRect() tìm vị trí và kích thước của phần tử con
      const offset = y - box.top - box.height / 2; // Tính khoảng cách giữa vị trí y của con trỏ chuột và giữa các phần tử con
      console.log(offset);

      // So sánh offset với giá trị offset gần nhất hiện tại
      // Nếu offset âm và lớn hơn offset gần nhất hiện tại
      if (offset < 0 && offset > closet.offset) {
        return { offset: offset, element: child };
      } else {
        return closet;
      }
    },
    { offset: Number.NEGATIVE_INFINITY } // Giá trị offset gần nhất ban đầu, nếu âm thì ở trên phần tử
  ).element;
}

// Sử dụng dragover để kéo ra ngoài thì sẽ không kéo được
// Dùng forEach để lặp qua từng phần tử
containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    // Ngăn chăn hành vi mặc định vì trình duyệt không cho kéo sang container khác
    e.preventDefault();
    // Gán hàm vào một biến để tìm phần tử nằm sau phần tử đang kéo
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging"); // Lấy ra tất cả class dragging
    // Kiểm tra điều kiện
    if (afterElement == null) {
      container.append(draggable);
    } else {
      container.insertBefore(draggable, afterElement); // insertBefore sẽ đặt draggable vào trước afterElement
    }
  });
});
