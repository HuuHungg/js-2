import React, { useContext, useState } from "react";
import { TodoContext } from "../context/context";
import { addToLocalStorage } from "../localstorage/localstorage";

const TodoForm = () => {
  const [input, setInput] = useState("");
  const { currentTodo, setCurrentTodo } = useContext(TodoContext);
  const submitHandler = (e) => {
    e.preventDefault();
    const newTask = { id: Math.random(), text: input, completed: false };
    if (currentTodo === null) {
      setCurrentTodo([newTask]);
    } else {
      setCurrentTodo([...currentTodo, newTask]);
    }
    addToLocalStorage(newTask);
    setInput("");
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
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
