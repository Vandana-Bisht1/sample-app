import React, { useState, useEffect } from "react";
import { createDatabase } from "./dexie";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      const database = await createDatabase();
      setDb(database);
      const todosList = await database.todos.find().exec();
      setTodos(todosList);
    };
    initializeDatabase();
  }, []);

  const addTodo = async () => {
    if (!name.trim()) {
      alert('Please enter a valid todo item.');
      return;
    }
    if (db) {
    const id = todos.length + 1;
      await db.todos.insert({
        id: id.toString(),
        name,
        done: false,
        timestamp: new Date().toISOString(),
      });
      const todoList = await db.todos.find().exec();
      setTodos(todoList);
      setName("");
    }
  };

  const deleteTodo = async (id) => {
    if (db) {
      const todo = await db.todos.findOne(id).exec();
      await todo.remove();
      const todoList = await db.todos.find().exec();
      setTodos(todoList);
    }
  };

  const toggleTodo = async (id) => {
    if (db) {
      const todo = await db.todos.findOne(id).exec();
      await todo.patch({
        done: !todo.done, // Toggle the 'done' status
      });
      const updatedTodos = await db.todos.find().exec();
      updatedTodos.sort((a, b) => {
        if (a.done && !b.done) return 1; // a is done, b is not done (move a to bottom)
        if (!a.done && b.done) return -1; // a is not done, b is done (keep a above)
        return 0;
      });
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="todo-list">
      <h2>Todo List (RxDB Example)</h2>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Add a todo"
          value={name}
          onChange={(e) => setName(e.target.value)}/>
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              className={todo.done ? "todo-name done" : "todo-name"}
              onClick={() => toggleTodo(todo.id)}>
              {todo.name}
            </span>
            <div className="todo-buttons">
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
              <button className="done-btn" onClick={() => toggleTodo(todo.id)}>
                {todo.done ? "Undo" : "Done"}
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default TodoList;