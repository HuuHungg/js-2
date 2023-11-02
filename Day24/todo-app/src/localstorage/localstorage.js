export const addToLocalStorage = (newTask) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = [];
  }
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const editToLocalStorage = (editValue, id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      task.text = editValue;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};

export const deleteFormLocalStorage = (deletedTask) => {
  localStorage.setItem("tasks", JSON.stringify(deletedTask));
};

export const viewFromLocalStorage = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  return tasks;
};

export const taskCompletedToLocalStorage = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};
