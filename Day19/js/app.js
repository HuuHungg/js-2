import {
  getUser,
  postUser,
  editUser,
  deleteUser,
  getUserDetails,
} from "./fetchApi.js";

// Lấy các phần tử DOM
let btn = document.querySelector(".search-btn__add");
let modelBox = document.querySelector(".model-box");
let modelClose = document.querySelector(".close");
let input = document.querySelector(".modal-header input");
let listContainer = document.querySelector(".list");

// Lấy phần tử "complateTodos"
let complateTodos = document.querySelector(".complateTodos");

// Biến lưu trạng thái chỉnh sửa
let isEditing = false;
let editedItem = null;

// Biến để lưu trạng thái đã thay đổi vị trí của phần tử hay chưa
let itemMoved = false;

// Tạo hàm để di chuyển phần tử "add-list" xuống dưới "complateTodos"
function moveItemToCompleteList(item) {
  complateTodos.appendChild(item);
  item.style.height = "auto"; // Đặt chiều cao của phần tử "add-list" thành "auto"
}

// Gắn sự kiện click cho nút "Add Todos" để hiển thị modal
btn.addEventListener("click", function () {
  // Kiểm tra xem có đang chỉnh sửa hay không
  if (!isEditing) {
    modelBox.classList.add("show");
  } else {
    // Nếu đang chỉnh sửa, hỏi người dùng xem có muốn hủy không
    if (confirm("Bạn có muốn hủy bỏ chỉnh sửa không?")) {
      modelBox.classList.remove("show");
      isEditing = false;
      editedItem = null;
      input.value = "";
    }
  }
});

// Gắn sự kiện click cho nút "Cancel" trong modal để ẩn modal
modelClose.addEventListener("click", function () {
  modelBox.classList.remove("show");
  isEditing = false;
  editedItem = null;
  input.value = "";
});

// Gắn sự kiện click cho nút "Save"
let saveBtn = document.querySelector(".save-btn");

saveBtn.addEventListener("click", function () {
  let inputValue = input.value.trim();

  if (inputValue !== "") {
    if (!isEditing) {
      // Tạo một phần tử li mới
      let listItem = document.createElement("div");
      listItem.className = "add-list";

      // Tạo nút "Delete" trong phần tử li
      let deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

      // Gắn sự kiện click cho nút "Delete"
      deleteButton.addEventListener("click", function () {
        listItem.remove();
      });

      // Tạo nút "Note" trong phần tử li
      let noteButton = document.createElement("button");
      noteButton.className = "note";
      noteButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

      // Gắn sự kiện click cho nút "Note" để chỉnh sửa
      noteButton.addEventListener("click", function () {
        // Hiển thị modal chỉnh sửa
        modelBox.classList.add("show");
        input.value = spanElement.textContent; // Đưa nội dung cũ vào input
        isEditing = true;
        editedItem = listItem;
      });

      // Tạo nút "Change" trong phần tử li
      let changeButton = document.createElement("button");
      changeButton.className = "change";
      changeButton.innerHTML = '<i class="fa-solid fa-check-to-slot"></i>';

      // Gắn sự kiện click cho nút "Change"
      changeButton.addEventListener("click", function () {
        // Kiểm tra xem phần tử "add-list" có class "editing" hay không
        if (listItem.classList.contains("editing")) {
          if (!itemMoved) {
            // Nếu đang chỉnh sửa và chưa di chuyển, di chuyển xuống dưới "complateTodos" và đặt lại chiều cao
            moveItemToCompleteList(listItem);
            itemMoved = true;
          }
        }
      });

      // Tạo phần tử span trong phần tử li
      let spanElement = document.createElement("span");
      spanElement.textContent = inputValue;

      // Gắn nút và span vào phần tử li
      listItem.appendChild(spanElement);

      // Tạo phần tử div cho phần tử li
      let clickListDiv = document.createElement("div");
      clickListDiv.className = "click-list";

      // Gắn các nút vào phần tử div
      clickListDiv.appendChild(deleteButton);
      clickListDiv.appendChild(noteButton);
      clickListDiv.appendChild(changeButton);
      listItem.appendChild(clickListDiv);

      // Thêm phần tử li mới vào cuối danh sách
      listContainer.appendChild(listItem);

      // Ẩn modal và xóa giá trị trong input
      modelBox.classList.remove("show");
      input.value = "";
    } else {
      // Đang chỉnh sửa, cập nhật nội dung
      if (editedItem) {
        let spanElement = editedItem.querySelector("span");
        spanElement.textContent = inputValue;
        isEditing = false;
        editedItem = null;
        modelBox.classList.remove("show");
        input.value = "";
      }
    }
  }
});

// Lấy phần tử input và nút tìm kiếm
let searchInput = document.querySelector(".search-todos input");
let searchButton = document.querySelector(".search-todos button");

// Gắn sự kiện click cho nút tìm kiếm
searchButton.addEventListener("click", search);

// Gắn sự kiện input change cho ô tìm kiếm
searchInput.addEventListener("input", function () {
  if (searchInput.value.trim() === "") {
    // Nếu ô tìm kiếm trống, hiển thị lại tất cả các phần tử add-list
    let addListItems = document.querySelectorAll(".add-list");
    addListItems.forEach(function (item) {
      item.style.display = "flex";
    });
  }
});

function search() {
  let searchTerm = searchInput.value.trim().toLowerCase();

  // Lặp qua tất cả các phần tử add-list
  let addListItems = document.querySelectorAll(".add-list");
  addListItems.forEach(function (item) {
    let span = item.querySelector("span");
    let itemText = span.textContent.toLowerCase();

    // So sánh nội dung với từ khóa tìm kiếm
    if (itemText.includes(searchTerm)) {
      // Nếu tìm thấy, hiển thị phần tử
      item.style.display = "flex";
    } else {
      // Nếu không tìm thấy, ẩn phần tử
      item.style.display = "none";
    }
  });
}
