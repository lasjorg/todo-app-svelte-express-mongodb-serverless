const BASE_URL = '/.netlify/functions/server';
// const BASE_URL = 'http://localhost:3000/.netlify/functions/server';

const getTodos = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

const addTodo = async (data) => {
  await fetch(BASE_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await getTodos();
};

const updateTodo = async (data) => {
  await fetch(BASE_URL, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await getTodos();
};

const deleteTodo = async (id) => {
  await fetch(BASE_URL + '/' + id, {
    method: 'DELETE',
  });
  return await getTodos();
};

export { getTodos, addTodo, updateTodo, deleteTodo };
