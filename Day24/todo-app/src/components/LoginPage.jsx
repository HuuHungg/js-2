import React from "react";
import Login from "./Login";

function LoginPage({ onLogin }) {
  return (
    <div>
      <h1>Welcome to Todo App!</h1>
      <Login onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;
