const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

//Get Back All the todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submits a todo
router.post("/addtodohandler", async (req, res) => {
  const NewTodo = new Todo({
    title: req.body.title,
    checked: req.body.checked,
  });

  console.log({ title: req.body.title, checked: req.body.checked });

  try {
    const savedTodo = await NewTodo.save();
    res.send(savedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

//Specific todo
router.get("/:todoId", async (req, res) => {
  const todo = await Todo.findById(req.params.todoId);
  try {
    res.json(todo);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete Specific todo
router.delete("/:todoId", async (req, res) => {
  try {
    const removedTodo = await Todo.remove({ _id: req.params.todoId });
    res.json(removedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

//update specific todo
router.put("/:todoId", async (req, res) => {
  try {
    const updatedTodo = await Todo.updateOne(
      { _id: req.params.todoId },
      { $set: { title: req.body.title, checked: req.body.checked } }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
