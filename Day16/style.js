class F8 {
  static component(name, options) {
    customElements.define(
      name,
      class extends HTMLElement {
        constructor() {
          super(); // Gọi hàm tạo của lớp cha (`HTML ELement`) để khởi tạo đối tượng thành phần
          this.options = options; // Lưu tuỳ trọn của thành phần vào biến
          // Kiểm tra options.data có phải là 1 hàm hay không, nếu là 1 hàm lưu vào biến `this.data`, nếu không phải lưu trực tiếp
          this.data =
            typeof options.data === "function" ? options.data() : options.data;
          this.isCounterApp = true; // Khai báo để thay đổi changeButoon
          this.render(); // Gọi phương thức render để hiện thị nội dung của thành phần
        }
        render() {
          // Thay thế tất cả đoạn biểu thức chính quy, loại bỏ khoảng trắng
          this.innerHTML = this.options.template.replace(
            /{{(.+?)}}/g,
            (math, key) => {
              return this.data[key.trim()]; // Bỏ khoảng trắng hai bên
            }
          );
          // Attack Event Listener
          const incrementButton = this.querySelector(".increment");
          const decrementButton = this.querySelector(".decrement");
          const changeButton = this.querySelector(".change");

          incrementButton.addEventListener("click", () => {
            if (this.data.count-- == 0) {
              this.data.count = 0;
            }
            this.render();
          });

          decrementButton.addEventListener("click", () => {
            this.data.count++;
            this.render();
          });

          changeButton.addEventListener("click", () => {
            // isCounterApp được khai báo bằng true ở trên
            if (this.isCounterApp) {
              this.data.title = "Xin Chào F8";
            } else {
              this.data.title = "Counter App";
            }
            this.isCounterApp = !this.isCounterApp;
            this.render();
          });
        }
      }
    );
  }
}
