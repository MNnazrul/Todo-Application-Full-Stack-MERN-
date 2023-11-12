import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/get");
        setTodos(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [todos]);

  const handleEdit = async (id) => {
    try {
      const result = axios.put("http://localhost:3001/update/" + id);
      // location.reload(); // it will refresh the whole page.
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      axios.delete("http://localhost:3001/delete/" + id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      {todos.length == 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task">
            <div className="checkbox">
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill
                  className="icon"
                  onClick={() => handleEdit(todo._id)}
                />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
