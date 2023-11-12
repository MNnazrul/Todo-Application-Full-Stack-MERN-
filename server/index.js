const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test");

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => {
  res.json("it's working");
});

app.get("/get", async (req, res) => {
  try {
    const result = await TodoModel.find();
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id; // req.params("id");
  try {
    await TodoModel.findByIdAndDelete({ _id: id });
    res.json({ result: "success" });
  } catch (err) {
    console.log(err);
  }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const result = await TodoModel.findByIdAndUpdate({ _id: id }, { done: true });
  // .then((result) => res.json(result))
  // .then((err) => res.json(err));
  res.json(result);
});

app.listen(3001, () => {
  console.log(`server is running on port 3001`);
});
