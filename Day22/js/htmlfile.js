export const loginForm = `<div class="wrapper">
  <span class="bg-animate"></span>
  <span class="bg-animate2"></span>
  <div class="form-box login">
    <h2 class="animation" style="--i: 0">Login</h2>
    <form action="#" class="loginSubmit">
      <div class="input-box animation" style="--i: 1">
        <input type="email" class="email" value="fufun1@gmail.com" required />
        <label>Email</label>
        <i class="bx bx-envelope"></i>
      </div>
      <div class="input-box animation" style="--i: 2">
        <input type="password" class="password" value="1234567890" required />
        <label>Password</label>
        <i class="bx bxs-lock"></i>
      </div>
      <div class="msg error-box"></div>
      <button type="submit" class="btn animation" style="--i: 3">
        Login
      </button>
      <div class="logreg-link animation" style="--i: 4">
        <p>
          Don't have an account?
          <a href="#" class="register-link">SingUp</a>
        </p>
      </div>
    </form>
  </div>
  <div class="info-text login">
    <h2 class="animation" style="--i: 0">Welcome Back</h2>
    <p class="animation" style="--i: 1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit
    </p>
  </div>
  <div class="form-box register">
    <h2 class="animation" style="--i: 17">Sign Up</h2>
    <form action="#">
      <div class="input-box animation" style="--i: 18">
        <input type="text" required />
        <label>Username</label>
        <i class="bx bxs-user"></i>
      </div>
      <div class="input-box animation" style="--i: 19">
        <input type="email" required />
        <label>Email</label>
        <i class="bx bx-envelope"></i>
      </div>
      <div class="input-box animation" style="--i: 20">
        <input type="password" required />
        <label>Password</label>
        <i class="bx bxs-lock"></i>
      </div>
      <button type="submit" class="btn animation" style="--i: 21">
        Sign Up
      </button>
      <div class="logreg-link animation" style="--i: 22">
        <p>
          Already have an account?
          <a href="#" class="login-link">Login</a>
        </p>
      </div>
    </form>
  </div>
  <div class="info-text register">
    <h2 class="animation" style="--i: 17">Welcome Back</h2>
    <p class="animation" style="--i: 18">
      Lorem ipsum dolor sit amet consectetur adipisicing elit
    </p>
  </div>
  </div>
  <div>
    <h3 class="welcome">
    Hãy nhập email và mật khẩu của bạn để truy cập vào nền tảng Blogger, nơi bạn có thể tạo và chia sẻ những bài viết độc đáo của mình. Nếu bạn chưa có tài khoản, hãy đăng ký ngay để tham gia cộng đồng Blogger
    </h3>
  </div>
  `;

export const homeContent = `
      <div class="container">
          <div class="blog-login">
              <ul class="profile">
                  <li>Chào bạn: <b><span class="name"></span></b></li>
                  <li><a href="#" class="logout">Đăng xuất</a></li>
              </ul>
              <form class="post-article">
                <div class="form-group">
                  <label for="titleInput" class="label-form">Tiêu đề bài viết</label>
                  <input id="titleInput" placeholder="Nhập tiêu đề bài viết"/>
                </div>
                <div class="form-group">
                    <label for="contentInput" class="label-form">Nhập nội dung bài viết</label>
                    <textarea placeholder="Nhập nội dung bài viết" id="contentInput" cols="30" rows="10"></textarea>
                </div>
                <div class="form-group">
                    <label for="content" class="label-form">Chọn thời gian đăng bài (Nếu có)</label>
                    <input type="date" id="datetime-picker">
                </div>
                <button id="submitArticle" class="submit-article">Đăng bài viết</button>
                <span class="time-remain"></span>
              </form>
          </div>
          <div class="article-container"></div>
      </div>
  `;
