import { client } from "./client.js";
import { loginForm, homeContent } from "./htmlfile.js";
import { requestRefresh } from "./token.js";

client.setUrl("https://api-auth-two.vercel.app");

const root = document.querySelector("#root");
const blockList = document.querySelector(".block-list");
const loginButton = document.querySelector("#loginButton");
let page = 1;
let loading = false;
let hasMore = true;

// Hàm để gọi API và hiển thị danh sách bài viết
async function fetchAndDisplayPosts() {
  try {
    const response = await fetch(`https://api-auth-two.vercel.app/blogs`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    const data = result.data;

    if (Array.isArray(data)) {
      data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = `
          <h2 class="nameBlog">Người viết: ${post.userId.name}</h2>
          <p>${post.title}</p>
          <p>${post.content}</p>
          <hr/>
        `;
        blockList.appendChild(postElement);
      });
    } else {
      console.error("Data is not an array:", data);
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

fetchAndDisplayPosts();

// Bắt sự kiện cuộn trang
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchAndDisplayPosts();
  }
});

// Code Tính năng đăng nhập và đăng ký
const contentContainer = document.getElementById("contentContainer");
const loginBtn = document.getElementById("loginButton");
let loginFormVisible = false;
let errorVisible = false;

loginBtn.addEventListener("click", () => {
  if (loginFormVisible) {
    contentContainer.innerHTML = "";
    loginFormVisible = false;
    hideError();
  } else {
    contentContainer.innerHTML = loginForm;
    loginFormVisible = true;

    const wrapper = document.querySelector(".wrapper");
    const registerLink = document.querySelector(".register-link");
    const loginLink = document.querySelector(".login-link");

    registerLink.onclick = () => {
      wrapper.classList.add("active");
    };

    loginLink.onclick = () => {
      wrapper.classList.remove("active");
    };

    const loginSubmitBtn = document.querySelector(".loginSubmit");
    const registerSubmitBtn = document.querySelector(".registerSubmit");

    loginSubmitBtn.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = document.querySelector(".msg");
      const email = e.target.querySelector(".email").value;
      const password = e.target.querySelector(".password").value;
      await handleLogin({ email, password }, msg);
    });
  }
});

const handleLogin = async function (data, msg) {
  msg.innerText = "";
  const { data: tokens, response } = await client.post("/auth/login", data);
  if (!response.ok) {
    msg.innerText = tokens.message;
    showError();
    hideErrorAfterDelay();
  } else {
    localStorage.setItem("login_tokens", JSON.stringify(tokens));
    showLoggedInContent();
  }
};

function showError() {
  const errorBox = document.querySelector(".error-box");
  errorBox.style.display = "block";
  errorVisible = true;
}

function hideErrorAfterDelay() {
  setTimeout(() => {
    hideError();
  }, 2000);
}

function hideError() {
  const errorBox = document.querySelector(".error-box");
  errorBox.style.display = "none";
  errorVisible = false;
}

// Code tính năng đăng bài viết
// Khai báo biến showAllPosts ở phạm vi toàn cục
let showAllPosts = true;

function showLoggedInContent() {
  contentContainer.innerHTML = homeContent;
  // Hiển thị nút đăng bài viết và danh sách bài viết của mọi người
  fetchAndDisplayPosts();
  // Đảm bảo biến accessToken có sẵn
  const accessToken = localStorage.getItem("login_tokens")
    ? JSON.parse(localStorage.getItem("login_tokens")).data.accessToken
    : null;

  // Sử lý logic đăng bài viết
  const submitBtn = document.querySelector("#submitArticle");
  const titleInput = document.querySelector("#titleInput");
  const contentInput = document.querySelector("#contentInput");
  const articleContainer = document.querySelector(".article-container");

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Ngăn chặn sự kiện mặc định của nút "submit"
    const title = titleInput.value;
    const content = contentInput.value;

    // Gọi API để đăng bài viết
    const postData = {
      title: title,
      content: content,
    };

    const response = await fetch("https://api-auth-two.vercel.app/blogs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      alert("Đăng bài viết thành công!");

      if (showAllPosts) {
        const name = "Your Name";
        addPostToDOM(name, title, content, articleContainer);
      }

      titleInput.value = "";
      contentInput.value = "";

      // Sau khi đăng bài thành công, cập nhật lại danh sách bài viết của mọi người
      fetchAndDisplayPosts();
    } else {
      alert("Lỗi khi đăng bài viết.");
    }
  });

  // Hàm để gọi API và hiển thị danh sách bài viết của mọi người
  async function fetchAndDisplayPosts() {
    // Lấy danh sách bài viết từ API
    const response = await fetch("https://api-auth-two.vercel.app/blogs");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    const data = result.data;

    // Xóa toàn bộ bài viết trên giao diện trước khi hiển thị lại
    articleContainer.innerHTML = "";

    if (Array.isArray(data)) {
      data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = `
          <h2 class="nameBlog">Người viết: ${post.userId.name}</h2>
          <p>${post.title}</p>
          <p>${post.content}</p>
          <hr/>
        `;
        articleContainer.appendChild(postElement);
      });
    } else {
      console.error("Data is not an array:", data);
    }
  }

  const logoutLink = document.querySelector(".logout");
  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();

    // Loại bỏ lớp "hidden-content" từ phần nội dung ban đầu
    const blogContent = document.querySelector("#blogContent");
    console.log(blogContent);
    blogContent.classList.remove("hidden-content");

    // Ẩn nội dung hiện tại
    contentContainer.innerHTML = "";
    contentContainer.classList.add("hidden-content");
  });
  // End tính năng đăng bài viết
}

function addPostToDOM(name, title, content, container) {
  const postElement = document.createElement("div");
  postElement.innerHTML = `
    <h2 class="nameBlog">Người viết: ${name}</h2>
    <p>${title}</p>
    <p>${content}</p>
  `;
  container.prepend(postElement);
}
