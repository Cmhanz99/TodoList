import React, { useState, useEffect } from 'react';
import "./Main.css";
//Const App
const App = () => {
  const [input, setInput] = useState("");
  const [todo, setToDo] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("myTodos");
    if (savedTodos !== null) {
      try {
        setToDo(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Failed to parse todos from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todo));
  }, [todo]);

  const handleClick = () => {
    if (input.trim() === "") {
      return;
    }
    setToDo([...todo, { text: input, done: false }]);
    setInput("");
  };

  const handleDelete = (index) => {
    const updateTodo = todo.filter((_, i) => i !== index);
    setToDo(updateTodo);
  };

  const handleMark = (index) => {
    const updatedTodo = todo.map((item, i) => {
      if (i === index) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setToDo(updatedTodo);
  };

  return (
    <>
      <div className="app_main">
        <div className="header_app">
          <h2>Todo List App</h2>
          <div className="input_todo">
            <input
              type="text"
              className="input_todo_user"
              placeholder="Add task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="add_todo" onClick={handleClick}>
              + Add
            </button>
          </div>
        </div>

        <div className="body_app">
          <ul>
            {todo.map((toDo, index) => (
              <li className="list_todo" key={index}>
                <p className={`mark ${toDo.done ? "done" : ""}`}>{toDo.text}</p>
                <div className="todo_actions">
                  <button
                    className="delete_todo"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  <span
                    className="mark_todo"
                    onClick={() => handleMark(index)}
                  ></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
