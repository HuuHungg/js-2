import React, { useContext, useState } from "react";
import { TodoContext } from "../context/context";

const Search = () => {
  const { currentTodo, setCurrentTodo } = useContext(TodoContext);
  const [searchInput, setSearchInput] = useState("");

  const searchHandler = (e) => {
    let term = e.target.value;
    setSearchInput(term);
    term = term.toLowerCase();
    setCurrentTodo(
      currentTodo.map((todo) => {
        if (todo.text.search(term) < 0) {
          todo.search = true;
        } else {
          todo.search = false;
        }
        return todo;
      })
    );
  };
  return (
    <>
      {currentTodo && currentTodo.length > 0 && (
        <input
          type="search"
          className="search"
          value={searchInput}
          onChange={searchHandler}
          placeholder="Search"
        />
      )}
    </>
  );
};

export default Search;
