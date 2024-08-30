import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index]);
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === editingIndex ? editingText : todo
    );
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Todo App</h1>
      <div className="todo-input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="add-button">Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {editingIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="edit-input"
                />
                <button onClick={handleSaveEdit} className="save-button">Save</button>
              </div>
            ) : (
              <>
                <span>{todo}</span>
                <div className="todo-actions">
                  <button onClick={() => handleEditTodo(index)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteTodo(index)} className="delete-button">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
