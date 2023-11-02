import "./App.scss";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Search from "./components/Search";
import LoginPage from "./components/LoginPage";
import { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false); // Thêm trạng thái đăng nhập

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const handleLogin = (apiKey) => {
    // Đã đăng nhập thành công
    setLoggedIn(true);
  };
  return loading ? (
    <div className="loader-container">
      <HashLoader
        color={"#36d7b7"} // Thay đổi màu sắc tùy ý
        loading={loading}
        size={150}
      />
    </div>
  ) : (
    <div className="container">
      <h1>Welcome to Todo App!</h1>
      <TodoForm />
      <Search />
      <TodoList />
    </div>
  );
}

export default App;
