import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('https://localhost:5000/api/todos');
    setTodos(res.data);
  };

  const addTodo = async (title) => {
    const res = await axios.post('https://localhost:5000/api/todos', { title });
    setTodos([...todos, { id: res.data.id, title, completed: false }]);
  };

  const updateTodo = async (id, data) => {
    await axios.put(`https://localhost:5000/api/todos/${id}`, data);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
};

export default TodoList;