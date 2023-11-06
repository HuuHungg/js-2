import React, { useState, createContext } from "react";

export const TodoContext = createContext({
  currentTodo: [], // Khởi tạo trạng thái công việc cần làm bằng mảng rỗng
  setCurrentTodo: () => {}, // Khởi tạo hàm để cập nhập trạng thái
});

export const TodoProvider = ({ children }) => {
  // Tạo State
  const [currentTodo, setCurrentTodo] = useState([]);
  return (
    <>
      <TodoContext.Provider value={{ currentTodo, setCurrentTodo }}>
        {children}
      </TodoContext.Provider>
    </>
  );
};
