import React, { useContext, useState } from "react";
import { TodoContext } from "../context/context";
import { addToLocalStorage } from "../localstorage/localstorage";

const TodoForm = () => {
  // Khởi tạo state
  const [input, setInput] = useState("");
  const { currentTodo, setCurrentTodo } = useContext(TodoContext); // Sử dụng useContext để lấy giá trị của currentTodo và setCurrentTodo từ todoContext
  const submitHandler = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi của Form giữ trang không bị tải lại khi nhấn nút
    const newTask = { id: Math.random(), text: input, completed: false }; // id được lấy ngẫu nhiên,text là giá trị của ô input, complex là false vì gía trị mới chưa hoàn thành
    if (currentTodo === null) {
      // Nếu currentTodo là null danh sách công việc chưa được khởi tạo
      // Thiết lâpj một mảng mới
      setCurrentTodo([newTask]);
    } else {
      // Nếu công việc được khởi tạo trước đó thì thêm công việc vào cuối mảng
      setCurrentTodo([...currentTodo, newTask]);
    }
    addToLocalStorage(newTask); // Lưu các công việc vào localStorage, giúp giữ lại dữ liệu kể cả khi trang web được làm mới
    setInput(""); // Đặt giá trị về rỗng để khi thêm công việc người dùng có thể nhập công việc mới
  };

  return (
    <form onSubmit={submitHandler}>
      {console.log(currentTodo)}
      <input
        type="text"
        name="input"
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default TodoForm;
