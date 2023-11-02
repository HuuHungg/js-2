import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = () => {
    fetch(
      `https://api-todo-ebon.vercel.app/api/v1/api-key?email=${email}`, // Thay email mẫu bằng email thực
      {
        method: "GET",
      }
    )
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
        console.error("Lỗi khi lấy API Key: ", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;
