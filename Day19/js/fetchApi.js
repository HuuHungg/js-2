const apiUrl = "https://tt97q2-8080.csb.app/users";

// Get USer
export const getUser = async () => {
  const res = await fetch(apiUrl);
  const users = await res.json();
  return users;
};

// Post USer
export const postUser = async (task) => {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

// Edit User
export const editUser = async (id, name, done) => {
  const res = await fetch(apiUrl + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, done }),
  });
  const data = await res.json();
  return data;
};

// Delete User
export const deleteUser = async (id) => {
  const res = await fetch(apiUrl + "/" + id, {
    method: "DELETE",
  });
  return res;
};

// Get DELETE Detail;
export const getUserDetails = async (userId) => {
  const res = await fetch(`${apiUrl}/${userId}`, {
    method: "GET",
    header: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  const task = await res.json();
  return task;
};
