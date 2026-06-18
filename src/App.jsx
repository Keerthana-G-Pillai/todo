import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue.trim(), done: false }])
      setInputValue('')
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>
          <span className="emoji">📝</span>
          Todo List
        </h1>
        <p className="subtitle">Stay organized and productive!</p>
      </div>
      
      <form className="todo-form" onSubmit={addTodo}>
        <div className="input-wrapper">
          <input
            type="text"
            className="todo-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What do you need to do today?"
          />
        </div>
        <button type="submit" className="add-button">
          <span className="plus">+</span>
          Add Task
        </button>
      </form>

      {todos.length > 0 && (
        <div className="stats">
          <span className="stat-item">
            Total: <strong>{todos.length}</strong>
          </span>
          <span className="stat-item">
            Done: <strong>{todos.filter(t => t.done).length}</strong>
          </span>
        </div>
      )}

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
            <div className="todo-content" onClick={() => toggleTodo(todo.id)}>
              <div className="checkbox">
                <svg className="checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="todo-text">{todo.text}</span>
            </div>
            <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <div className="empty-state">
          <div className="empty-emoji">✨</div>
          <p>No tasks yet. Add one above!</p>
        </div>
      )}
    </div>
  )
}

export default App
