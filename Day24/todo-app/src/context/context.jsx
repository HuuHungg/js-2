import React, { useState, createContext } from "react";

export const TodoContext = createContext({
  currentTodo: [],
  setCurrentTodo: () => {},
});

export const TodoProvider = ({ children }) => {
  const [currentTodo, setCurrentTodo] = useState([]);
  return (
    <>
      <TodoContext.Provider value={{ currentTodo, setCurrentTodo }}>
        {children}
      </TodoContext.Provider>
    </>
  );
};
