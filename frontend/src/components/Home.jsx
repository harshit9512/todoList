/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const [editedTodoText, setEditedTodoText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        if (!localStorage.getItem("token")) {
          navigate("/login", { replace: true });
          return;
        }
        setLoading(true);
        const response = await axios.get("http://localhost:4001/todo/fetch", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTodos(response.data.todoList);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const createTodo = async () => {
    try {
      if (!newTodo) return;
      const response = await axios.post(
        "http://localhost:4001/todo/create",
        { text: newTodo },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create Todo");
    }
  };

  const updateTodoStatus = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      if (todo) {
        const response = await axios.put(
          `http://localhost:4001/todo/update/${id}`,
          { ...todo, isComplete: !todo.isComplete },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
      }
    } catch (error) {
      setError("Failed to update todo status");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/todo/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to delete Todo");
    }
  };

  const logout = async () => {
    try {
      await axios.get(`http://localhost:4001/user/logout`);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      setError("Logout failed");
    }
  };

  const updateTodoText = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      if (todo) {
        const response = await axios.put(
          `http://localhost:4001/todo/update/${id}`,
          { ...todo, text: editedTodoText },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
        setEditedTodoText(""); // Clear input after update
        setEditingTodoId(null); // Reset editing ID
      }
    } catch (error) {
      setError("Failed to update todo text");
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.isComplete).length;

  return (
    <div className="mt-4 bg-white shadow-md rounded-lg max-w-lg lg:max-w-xl mx-8 sm:mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-5">
        Todo App
      </h1>
      <div className="flex flex-col sm:flex-row mb-4">
        <input
          type="text"
          placeholder="Add a new Todo"
          value={newTodo}
          className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0 sm:mr-2"
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && createTodo()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition duration-200"
          onClick={createTodo}
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li
            key={todo._id || index}
            className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm hover:shadow-md transition duration-200"
          >
            <div className="flex items-center flex-grow">
              <input
                type="checkbox"
                className="mr-3 rounded focus:ring-2 focus:ring-blue-500"
                checked={todo.isComplete}
                onChange={() => updateTodoStatus(todo._id)}
              />
              {editingTodoId === todo._id ? (
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  className="text-lg p-2 border border-gray-300 rounded mr-2 flex-grow" // Ensure it takes available space
                />
              ) : (
                <span
                  className={`text-lg ${
                    todo.isComplete
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>
              )}
            </div>
            <div className="flex items-center mt-2 sm:mt-0 sm:ml-2">
              {editingTodoId === todo._id ? (
                <button
                  className="text-green-600 hover:text-green-800 duration-200 mr-2"
                  onClick={() => updateTodoText(todo._id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="text-yellow-600 hover:text-yellow-800 duration-200 mr-2"
                  onClick={() => {
                    setEditedTodoText(todo.text); // Set the current text for editing
                    setEditingTodoId(todo._id); // Set the editing ID
                  }}
                >
                  Edit
                </button>
              )}
              <button
                className="text-red-600 hover:text-red-800 duration-200"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-center text-sm text-gray-600">
        {remainingTodos} Todos remaining
      </p>
      <button
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 mx-auto block"
        onClick={logout}
      >
        Logout
      </button>
      {error && <p className="text-red-500 text-center mt-3">{error}</p>}
    </div>
  );
}

export default Home;
