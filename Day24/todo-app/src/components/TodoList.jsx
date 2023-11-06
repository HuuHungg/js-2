import React, { useContext, useEffect } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context/context";
import { viewFromLocalStorage } from "../localstorage/localstorage";

const TodoList = () => {
  const { currentTodo, setCurrentTodo } = useContext(TodoContext); // Sử dụng hook useContext để truy cập giá trị của currentTodo và setCurrentTodo từ context(TodoContext)
  useEffect(() => {
    const tasks = viewFromLocalStorage(); // lấy danh sách công việc từ localStorage
    setCurrentTodo(tasks); // Cập nhập danh sách công việc
  }, []); // Chỉ chạy 1 lần
  return (
    <div className="todo-list">
      {currentTodo &&
        currentTodo.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
    </div>
  );
};

export default TodoList;
