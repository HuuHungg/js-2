import { client } from "./client.js";

client.setUrl("https://api-auth-two.vercel.app");

const app = {
  currentForm: "signInForm", // Lưu trạng thái form hiện tại

  render: function () {
    const root = document.querySelector("#root");
    if (this.isLogin()) {
      root.innerHTML = `
        <div class="loginContainer">
          <h5 class="title-login">Chào mừng bạn đã quay trở lại</h5>
          <hr/>
          <ul class="content-login">
            <li>Chào bạn: <b>Yushing Dev</b></li>
            <li><a href="#" id="logoutBtn" class="btn btn-danger text-white">Logout</a></li>
            <li><a href="#" id="btnWritePost" class="btn btn-primary">Viết bài</a></li>
          </ul>
          <form class="form_login">
            <div class="content-text">
              <label for="title">Enter Your title</label>
              <input type="text" placeholder="Please enter the title" id="title" name="title"></input>
            </div>
            <div class="form_area">
              <label for="content">Enter Your Content</label>
              <textarea rows="5" cols="33" name="content" placeholder="content here..." class="area"></textarea>
            </div>
            <div class="form_setItem">
              <label>SetTime....</label>
              <input type="date" class="setItem"></input>
            </div>
            <button class="content-write">Write new!</button>
          </form>
          <div class="post-preview">
            <h2 id="postTitle"></h2>
            <p id="postContent"></p>
          </div>
        </div>
      `;
      document.getElementById("logoutBtn").addEventListener("click", () => {
        this.handleLogout();
      });
      document.getElementById("btnWritePost").addEventListener("click", () => {
        this.handleWritePost();
      });
    } else {
      root.innerHTML = `
        <main class="container">
          <section class="section">
            <div class="info-group column">
              <h1>${
                this.currentForm === "signInForm" ? "Sign In" : "Sign Up"
              }</h1>
              <span>Please enter your email and password.</span>
              <span class="link"><a href="/">Go to Home</a></span>
            </div>
            <form id="signInForm" class="login" style="display: ${
              this.currentForm === "signInForm" ? "block" : "none"
            }">
              <!-- Sign In Form -->
              <div class="form-controls">
                <label for="signInEmail" class="form_title">Enter Your email</label>
                <input
                  type="email"
                  id="signInEmail"
                  name="email"
                  class="input-form"
                  placeholder="Please enter the email"
                />
              </div>
              <div class="form-controls">
                <label for "signInPassword" class="form_title">Enter Your password</label>
                <input
                  type="password"
                  id="signInPassword"
                  name="password"
                  class="input-form"
                  placeholder="Please enter the password"
                />
              </div>
              <div class="button-group">
                <button id="btnSignIn" class="btn btn_submit">Sign In</button>
                <button id="btnToggleSignIn" class="btn btn_submit">Switch to Sign Up</button>
              </div>
              <div class="msg text-danger"></div>
            </form>
            <form id="signUpForm" class="login" style="display: ${
              this.currentForm === "signUpForm" ? "block" : "none"
            }">
              <!-- Sign Up Form -->
              <div class="form-controls">
                <label for="signUpName" class="form_title">Enter Your name</label>
                <input
                  type="text"
                  id="signUpName"
                  name="name"
                  class="input-form"
                  placeholder="Please enter the name"
                />
              </div>
              <div class="form-controls">
                <label for="signUpEmail" class="form_title">Enter Your email</label>
                <input
                  type="email"
                  id="signUpEmail"
                  name="email"
                  class="input-form"
                  placeholder="Please enter the email"
                />
              </div>
              <div class="form-controls">
                <label for="signUpPassword" class="form_title">Enter Your password</label>
                <input
                  type="password"
                  id="signUpPassword"
                  name="password"
                  class="input-form"
                  placeholder="Please enter the password"
                />
              </div>
              <div class="button-group">
                <button id="btnSignUp" class="btn btn_submit">Sign Up</button>
                <button id="btnToggleSignUp" class="btn btn_submit">Switch to Sign In</button>
              </div>
            </form>
          </section>
        </main>`;

      this.addEventListeners();
    }
  },

  addEventListeners: function () {
    document.getElementById("btnToggleSignIn").addEventListener("click", () => {
      this.toggleForm();
    });
    document.getElementById("btnToggleSignUp").addEventListener("click", () => {
      this.toggleForm();
    });
    if (this.currentForm === "signInForm") {
      this.addSignInFormListeners();
    } else {
      this.addSignUpFormListeners();
    }
  },

  toggleForm: function () {
    this.currentForm =
      this.currentForm === "signInForm" ? "signUpForm" : "signInForm";
    this.render();
  },

  addSignInFormListeners: function () {
    const form = document.getElementById("signInForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("signInEmail").value;
      const password = document.getElementById("signInPassword").value;
      this.handleLogin({ email, password });
    });
  },

  addSignUpFormListeners: function () {
    const form = document.getElementById("signUpForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signUpName").value;
      const email = document.getElementById("signUpEmail").value;
      const password = document.getElementById("signUpPassword").value;
      this.handleSignUp({ name, email, password });
    });
  },

  isLogin: function () {
    return !!localStorage.getItem("login_tokens");
  },

  handleLogin: async function (data) {
    const msg = document.querySelector(".msg");
    msg.innerText = "";
    this.addLoading();
    try {
      const { data: tokens, response } = await client.post("/auth/login", data);
      this.removeLoading();
      if (response.ok) {
        localStorage.setItem("login_tokens", JSON.stringify(tokens));
        this.render();
      } else {
        msg.innerText = "Email hoặc mật khẩu không chính xác";
      }
    } catch (error) {
      console.error(error);
    }
  },

  handleSignUp: async function (data) {
    const msg = document.querySelector(".msg");
    msg.innerText = "";
    this.addLoading();
    try {
      const { data: response, status } = await client.post(
        "/auth/register",
        data
      );
      this.removeLoading();
      if (status === 201) {
        this.currentForm = "signInForm";
        this.render();
      } else {
        msg.innerText = "Đăng ký không thành công. Vui lòng thử lại.";
      }
    } catch (error) {
      console.error(error);
    }
  },

  handleLogout: function () {
    localStorage.removeItem("login_tokens");
    this.render();
  },

  addLoading: function () {
    const btn = document.querySelector(".btn_submit");
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
    btn.disabled = true;
  },

  removeLoading: function () {
    const btn = document.querySelector(".btn_submit");
    btn.innerHTML = "Sign In";
    btn.disabled = false;
  },

  handleWritePost: function () {
    this.handleWriteNewPost();
  },

  handleWriteNewPost: function () {
    if (!this.isLogin()) {
      alert("Vui lòng đăng nhập trước khi đăng bài viết.");
      return;
    }

    const titleElement = document.querySelector("#title");
    const contentElement = document.querySelector(".area");
    const postTitleElement = document.querySelector("#postTitle");
    const postContentElement = document.querySelector("#postContent");
    const title = titleElement.value;
    const content = contentElement.value;

    if (title.trim() === "" || content.trim() === "") {
      alert("Vui lòng điền đầy đủ tiêu đề và nội dung bài viết");
      return;
    }

    this.addLoading();

    setTimeout(() => {
      postTitleElement.textContent = title;
      postContentElement.textContent = content;

      titleElement.value = "";
      contentElement.value = "";

      this.removeLoading();
    }, 2000);
  },

  addTitleAndContentListeners: function () {
    const titleElement = document.querySelector("#title");
    const contentElement = document.querySelector(".area");
    const postTitleElement = document.querySelector("#postTitle");
    const postContentElement = document.querySelector("#postContent");

    titleElement.addEventListener("input", () => {
      const title = titleElement.value;
      postTitleElement.textContent = title;
    });

    contentElement.addEventListener("input", () => {
      const content = contentElement.value;
      postContentElement.textContent = content;
    });
  },
};

app.render();
document.querySelector(".area").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    app.handleWriteNewPost();
  }
});
