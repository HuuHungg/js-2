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
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setShowLogin(true); // Show Login after loader
    }, 2000);
  }, []);

  const handleLogin = (apiKey) => {
    setLoggedIn(true); // Đã đăng nhập thành công
    setShowLogin(false);
  };

  return loading ? (
    <div className="loader-container">
      <HashLoader color={"#36d7b7"} loading={loading} size={150} />
    </div>
  ) : (
    <div className="container">
      {showLogin ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <h1>Welcome to Todo App!</h1>
          <TodoForm />
          <Search />
          <TodoList />
        </>
      )}
    </div>
  );
}

export default App;
