const boldBtn = document.querySelector("#bold-btn");
const underlineBtn = document.querySelector("#underline-btn");
const italicBtn = document.querySelector("#italic-btn");
const centerBtn = document.querySelector("#center-btn");
const colorBtn = document.querySelector("#color-btn");

const newBtn = document.querySelector("#new-btn");
const txtBtn = document.querySelector("#text-btn");
const pdfBtn = document.querySelector("#pdf-btn");

const content = document.querySelector("#content");
const fileName = document.querySelector("#filename-input");

const typedContent = document.querySelector("#typed-content");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");

// Toggles bold on/off for the selection or at the insertion point.
boldBtn.addEventListener("click", () => {
  document.execCommand("bold");
});
// Toggles underline on/off for the selection or at the insertion point.
underlineBtn.addEventListener("click", () => {
  document.execCommand("underline");
});
// Toggles italics on/off for the selection or at the insertion point.
italicBtn.addEventListener("click", () => {
  document.execCommand("italic");
});

centerBtn.addEventListener("click", () => {
  document.execCommand("justifyCenter");
});

// forColor: Lệnh thay đổi màu
// false: Bỏ qua việc trình duyệt tạo một trình tự lịch sử
// colorBtn.value: giá trị màu được sử dụng
colorBtn.addEventListener("input", () => {
  document.execCommand("foreColor", false, colorBtn.value);
});

// When click new print new page
newBtn.addEventListener("click", () => {
  content.innerHTML = "";
});

// Example on web for blob
{
  /* <script>
      let link = document.createElement('a');
      link.download = 'welcome.txt';
      let blob = new Blob(['Welcome to W3Docs'], {type: 'text/plain'});
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);      
</script> */
}

// Save file Txt on Lap
txtBtn.addEventListener("click", () => {
  // Tạo thẻ a để tải tệp văn bản
  const a = document.createElement("a");
  // Tạo một đối tượng Blob từ đoạn văn bản
  const blob = new Blob([content.innerText]);
  // Tạo một URL tới Blob
  const dataUrl = URL.createObjectURL(blob);
  // Thêm URL vào href
  a.href = dataUrl;
  // Tên tệp khi tải xuống
  a.download = fileName.value + ".txt";
  a.click();
});

// Save file pdf
pdfBtn.addEventListener("click", function () {
  const options = {
    margin: 10,
    fileName: fileName.value + ".pdf", // Tên tệp
    img: { type: "jpeg", quantity: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };
  html2pdf().from(content).set(options).save();
});

// Số ký tự
content.addEventListener("keydown", (e) => {
  // Lấy nội dung hiện tại của div #content
  const currentContent = content.innerText;

  // Tính số ký tự và số từ;
  const charCountValue = currentContent.length;
  const wordCountValue = currentContent.split(/\s+/).filter(Boolean).length;

  // Cập nhập số ký tự và số từ vào các phần tử HTML;
  charCount.innerText = `Số ký tự: ${charCountValue}`;
  wordCount.innerText = `Số từ: ${wordCountValue}`;
});
