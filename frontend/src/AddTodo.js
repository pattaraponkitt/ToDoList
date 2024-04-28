import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;