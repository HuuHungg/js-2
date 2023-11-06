import React, { useContext, useState } from "react";
import { TodoContext } from "../context/context";

const Search = () => {
  const { currentTodo, setCurrentTodo } = useContext(TodoContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    // Clear the search input when toggling visibility
    setSearchInput("");
  };

  const searchHandler = (e) => {
    let term = e.target.value;
    setSearchInput(term);
    term = term.toLowerCase();
    setCurrentTodo(
      currentTodo.map((todo) => {
        if (todo.text.toLowerCase().includes(term)) {
          todo.search = false;
        } else {
          todo.search = true;
        }
        return todo;
      })
    );
  };

  return (
    <>
      <button onClick={toggleSearch} className="searchBtn">
        Search
      </button>
      {isSearchVisible && currentTodo && currentTodo.length > 0 && (
        <input
          type="search"
          className="search"
          value={searchInput}
          onChange={searchHandler}
          placeholder="Type to search"
        />
      )}
    </>
  );
};

export default Search;
