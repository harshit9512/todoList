/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4001/todo/fetch", {
          //   withCredentials: true, // Set to true after JWT authentication is complete
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        console.log(response.data.todoList);
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
    console.log("In create-todo function",newTodo);
    try {
      if (!newTodo) return;
      const response = await axios.post(
        "http://localhost:4001/todo/create",
        {
          text: newTodo
        },
        {
          withCredentials: false,
        }
      );
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create Todo");
    }
  };

  /**
   * @param {string} id
   * Updates the isComplete status of the Todo
   */
  const updateTodoStatus = async (id) => {
    try {
      console.log("In update-todo-status function", id);
      const todo = todos.find((t) => t._id === id); // finds the todo to update from fetched todo list
      if (todo) {
        try {
          const response = await axios.put(
            `http://localhost:4001/todo/update/${id}`,
            {
              ...todo,
              isComplete: !todo.isComplete,
            }
          );
          console.log("test 1", response);
          setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
        } catch (error) {
          setError(error);
        }
      }
    } catch (error) {
      setError("Failed to update todo status", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      console.log("In deleteTodo function");

      const response = await axios.delete(
        `http://localhost:4001/todo/delete/${id}`
      );
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to delete Todo", error);
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.isComplete).length;

  return (
    <div className="mt-4 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center p-5">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="add a new Todo"
          value={newTodo}
          className="flex-grow p-2 border rounded-l-md focus:outline-none"
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key==="Enter" && createTodo()}
        />
        <button
          className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
          onClick={createTodo}
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li
            key={todo._id || index}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
          >
            <div className="flex items-center">
              {console.log(todo.isComplete)}
              <input
                type="checkbox"
                className="mr-2"
                checked={todo.isComplete}
                onChange={() => updateTodoStatus(todo._id)}
              />
              <span
                className={`${
                  todo.isComplete
                    ? "text-gray-500 font-semibold line-through"
                    : ""
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              className="text-red-500 hover:text-red-800 duration-300"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-center text-sm text-gray-800  ">
        {remainingTodos} Todos remaining
      </p>
      <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-300 mx-auto block">
        Logout
      </button>
    </div>
  );
}

export default Home;
