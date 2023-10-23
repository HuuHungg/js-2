import { client } from "./client.js";
import { requestRefresh } from "./token.js";

client.setUrl("https://api-auth-two.vercel.app");

const app = {
  currentForm: "signInForm",
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
          <form id="writePostForm" style="display: none;">
            <div class="content-text">
              <label for="postTitle">Nhập tiêu đề</label>
              <input type="text" placeholder="Nhập tiêu đề" id="postTitle" name="postTitle" />
            </div>
            <div class="form_area">
              <label for="postContent">Nhập nội dung</label>
              <textarea rows="5" cols="33" name="postContent" placeholder="Nội dung bài viết..." class="area" id="postContent"></textarea>
            </div>
            <button class="content-write">Đăng bài</button>
          </form>
          <div class="post-preview">
            <h2 id="postTitlePreview"></h2>
            <p id="postContentPreview"></p>
          </div>
          <div id="blog-posts"></div>
        </div>
      `;
      document.getElementById("logoutBtn").addEventListener("click", () => {
        this.handleLogout();
      });
      document.getElementById("postTitlePreview").style.display = "none";
      document.getElementById("postContentPreview").style.display = "none";
      this.getPosts();
      this.addPostFormListeners();
      this.initLoggedInUI();
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

  isLogin: function () {
    if (localStorage.getItem("login_tokens")) {
      return true;
    }
    return false;
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
        msg.innerText = `${tokens.message}`;
      }
    } catch (error) {
      msg.innerText = "Có lỗi xảy ra khi đăng nhập";
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
        msg.innerText = "Đăng ký không thành công, Vui lòng thử lại";
      }
    } catch (error) {
      console.log(error);
    }
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

  handleLogout: function () {
    localStorage.removeItem("login_tokens");
    this.render();
  },

  getPosts: async function () {
    const { data: posts, response } = await client.get("/blogs");
    if (response.ok) {
      this.showPosts(posts);
    } else {
      console.error("Failed to fetch blog posts");
    }
  },

  showPosts: function (posts) {
    const blogPosts = document.getElementById("blog-posts");
    blogPosts.innerHTML = "";
    if (posts.length > 0) {
      posts.forEach((post, index) => {
        const postHtml = `
          <div class="post-item">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
          </div>
        `;
        blogPosts.innerHTML += postHtml;
        if (index === 0) {
          document.getElementById("postTitlePreview").innerText = post.title;
          document.getElementById("postContentPreview").innerText =
            post.content;
          document.getElementById("postTitlePreview").style.display = "block";
          document.getElementById("postContentPreview").style.display = "block";
        }
      });
    } else {
      document.getElementById("postTitlePreview").innerText =
        "Không có bài viết";
      document.getElementById("postContentPreview").innerText = "";
      document.getElementById("postTitlePreview").style.display = "block";
      document.getElementById("postContentPreview").style.display = "none";
    }
  },

  postBlog: async function (title, content) {
    const tokens = localStorage.getItem("login_tokens");
    if (!tokens) {
      console.error("Vui lòng đăng nhập trước khi đăng bài viết.");
      return;
    }

    const accessToken = JSON.parse(tokens).accessToken;

    const data = {
      title: title,
      content: content,
    };

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const msg = document.querySelector(".msg");
    msg.innerText = "";

    try {
      const response = await client.post("/blogs", data, { headers });
      if (response.response.ok) {
        this.getPosts();
        document.getElementById("postTitle").value = "";
        document.getElementById("postContent").value = "";
      } else {
        msg.innerText = "Lỗi khi đăng bài viết. Vui lòng thử lại.";
      }
    } catch (error) {
      console.error("Lỗi khi đăng bài viết:", error);
      msg.innerText = "Lỗi khi đăng bài viết. Vui lòng thử lại.";
    }
  },
  showWritePostForm: function () {
    const writePostForm = document.getElementById("writePostForm");
    writePostForm.style.display = "block";
    document.getElementById("postTitlePreview").style.display = "none";
    document.getElementById("postContentPreview").style.display = "none";
  },

  addPostFormListeners: function () {
    const postButton = document.querySelector(".content-write");
    postButton.addEventListener("click", () => {
      const title = document.getElementById("postTitle").value;
      const content = document.getElementById("postContent").value;
      this.postBlog(title, content);
    });
  },

  initLoggedInUI: function () {
    const writePostButton = document.getElementById("btnWritePost");
    writePostButton.addEventListener("click", () => {
      this.showWritePostForm();
    });
  },
};

app.render();
