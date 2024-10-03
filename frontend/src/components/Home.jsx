import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4001/todo/fetch", {
        //   withCredentials: true, // Set to true after JWT authentication is complete
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log(response);
        setTodos(response.data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return <div>Home</div>;
}

export default Home;
