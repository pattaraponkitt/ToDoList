import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import api from '../services/api';


const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

 const fetchTodos = async () => {
    const res = await api.get('/todos');
    setTodos(res.data);
  };
  
  const addTodo = async (title) => {
    const res = await api.post('/todos', { title });
    setTodos([...todos, { id: res.data.id, title, completed: false }]);
  };
  

  const updateTodo = async (id, data) => {
    await api.put(`/todos/${id}`, data);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
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