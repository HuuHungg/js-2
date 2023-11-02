import React, { useContext, useEffect } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context/context";
import { viewFromLocalStorage } from "../localstorage/localstorage";

const TodoList = () => {
  const { currentTodo, setCurrentTodo } = useContext(TodoContext);
  useEffect(() => {
    const tasks = viewFromLocalStorage();
    setCurrentTodo(tasks);
  }, []);
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
