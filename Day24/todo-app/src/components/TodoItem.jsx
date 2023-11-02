import React, { useContext, useState } from "react";
import { TodoContext } from "../context/context";
import {
  deleteFormLocalStorage,
  editToLocalStorage,
  taskCompletedToLocalStorage,
} from "../localstorage/localstorage";

const TodoItem = ({ id, text, completed, search }) => {
  const { currentTodo, setCurrentTodo } = useContext(TodoContext);
  const [checked, setChecked] = useState(completed);
  const [outputValue, setOutputValue] = useState(text);
  const [editTodo, setEditTodo] = useState(false);
  const taskCompleteHandler = (e) => {
    setChecked(!checked);
    setCurrentTodo(
      currentTodo.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          taskCompletedToLocalStorage(id);
        }
        return todo;
      })
    );
  };
  const editHandler = (e) => {
    setEditTodo(!editTodo);
    if (editTodo) {
      setCurrentTodo(
        currentTodo.map((todo) => {
          if (todo.id === id) {
            todo.text = outputValue;
            editToLocalStorage(outputValue, id);
          }
          return todo;
        })
      );
    }
  };
  const deleteHandler = (e) => {
    const deleteTalks = currentTodo.filter((todo) => todo.id !== id);
    setCurrentTodo(deleteTalks);
    deleteFormLocalStorage(deleteTalks);
  };

  return (
    <div className={`todo-item ${search ? "hide" : "show"}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={checked}
        onChange={taskCompleteHandler}
      />
      <input
        type="text"
        className={`todo-text ${checked ? "completed" : ""}`}
        value={outputValue}
        onChange={(e) => setOutputValue(e.target.value)}
        disabled={editTodo ? false : true}
      />
      {!editTodo ? (
        <button className="edit-item" onClick={editHandler}>
          Edit
        </button>
      ) : (
        <button className="edit-item" onClick={editHandler}>
          Done
        </button>
      )}
      <button className="delete-button" onClick={deleteHandler}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
