import { handleError, throwError, defaultPromise } from '@utils';

export const getTodos = () => {
  const todos = localStorage.getItem('ToDo');
  return JSON.parse(todos);
};

export const addTodo = payload => {
  const prevTodos = getTodos() ?? [];
  const currTodos = prevTodos.concat(payload);
  localStorage.setItem('ToDo', JSON.stringify(currTodos));
  return currTodos;
};

export const toggleTodo = id => {
  const prevTodos = getTodos();
  const currTodos = prevTodos.map(todo =>
    todo.id === id ? { ...todo, complete: !todo.complete } : todo
  );
  localStorage.setItem('ToDo', JSON.stringify(currTodos));
  return currTodos;
};

export const deleteTodo = id => {
  const prevTodos = getTodos();
  const currTodos = prevTodos.filter(todo => todo.id !== id);
  localStorage.setItem('ToDo', JSON.stringify(currTodos));
  return currTodos;
};

export const deleteCompleteTodos = () => {
  const prevTodos = getTodos();
  const currTodos = prevTodos.filter(todo => !todo.complete);
  localStorage.setItem('ToDo', JSON.stringify(currTodos));
  return currTodos;
};

export const editTodo = ({ id, title }) => {
  const prevTodos = getTodos();
  const currTodos = prevTodos.map(todo =>
    todo.id === id ? { ...todo, title } : todo
  );
  localStorage.setItem('ToDo', JSON.stringify(currTodos));
  return currTodos;
};
