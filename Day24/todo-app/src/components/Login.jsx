import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    fetch(`https://api-todo-ebon.vercel.app/api/v1/api-key?email=${email}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi lấy API Key");
        }
        return response.json();
      })
      .then((data) => {
        const apiKey = data.data.apiKey;
        setApiKey(apiKey);
        // Lưu API Key và email trong localStorage hoặc state
        localStorage.setItem("apiKey", apiKey);
        localStorage.setItem("email", email);
        // Gọi hàm callback để thông báo đã đăng nhập
        onLogin(apiKey);
      })
      .catch((error) => {
        // console.error("Lỗi khi lấy API Key: ", error);
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  return (
    <div className="loginForm">
      <input
        type="text"
        className="login"
        placeholder="Email...."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className="inputForm" onClick={handleSubmit}>
        Login
      </button>
      <div className="showError">
        {error && <p style={{ color: "#CB3B31" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
