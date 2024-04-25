import React, { useState, useEffect } from "react";
import { addTodo, removeTodo, toggleTodo, setTodos } from "./features/todo/todosSlice";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoCard = ({ todo, onToggle, title, text, dispatch }) => (
  <div
    className={`card flex w-full h-52 shadow-xl h-56 ${
      todo.completed
        ? "bg-red-500 text-white border-red-500"
        : "bg-base-100 border-gray-300"
    }`}
  >
    <div className="card-body w-full grid grid-cols-4 gap-4">
      <div>
        <h2 className="card-title">{title}</h2>
        <p className="text-left">{text.slice(0, 25)}</p>
      </div>
      <div>
        <p className="text-left">{text.slice(25, 50)}</p>
      </div>
      <div>
        <p className="text-left">{text.slice(50, 75)}</p>
      </div>
      <div>
        <p className="text-left">{text.slice(75)}</p>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">Completed</span>
        </label>
        <div className="card-action justify-end">
          <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className="btn btn-primary"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      dispatch(setTodos(savedTodos));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        id: uuidv4(),
        text,
        title,
        completed: false,
      })
    );

    setText("");
    setTitle("");
    toast.success("Todo added successfully");
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className="align-el">
      <h1 className="text-3xl font-bold mb-4 text-center">Todos</h1>
      <form onSubmit={handleSubmit} className="mb-4 text-center">
        <div className="form-control">
          <div className="input-group">
            <label className="block">Title</label>
            <input
              type="text"
              placeholder="Type here"
              className="input w-56 input-bordered mb-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="block">Text</label>
            <input
              type="text"
              placeholder="Type here"
              className="input ml-16 mr-4 input-bordered w-56"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTodo}
            title={todo.title}
            text={todo.text}
            dispatch={dispatch}
          />
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
