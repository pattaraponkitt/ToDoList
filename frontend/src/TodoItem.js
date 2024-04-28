import React, { useState } from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleUpdate = async () => {
    await updateTodo(todo.id, { title, completed: todo.completed });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <span>{todo.title}</span>
      )}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo(todo.id, { ...todo, completed: !todo.completed })}
      />
      <button onClick={() => setEditing(!editing)}>{editing ? 'Save' : 'Edit'}</button>
      {editing && <button onClick={handleUpdate}>Update</button>}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;