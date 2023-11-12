import React from "react";
import { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState();

  const handleAdd = () => {
    if (task.length > 0) {
      axios
        .post("http://localhost:3001/add", { task: task })
        .then((result) => {
          setTask("");
          // location.reload(); // it will refresh the whole page.
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="create_form">
      <input
        type="text"
        name=""
        id=""
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
