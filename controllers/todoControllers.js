const Todo = require("../models/Todo");

const getAllToDoHandler = async (req, res) => {
  try {
    const todos = await Todo.find({ author: req.params.id });
    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
};

const addTodoHandler = async (req, res) => {
  const NewTodo = new Todo({
    title: req.body.title,
    checked: req.body.checked,
    author: req.body.author,
  });

  try {
    const savedTodo = await NewTodo.save();
    res.send(savedTodo);
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteSpecificTodoHandler = async (req, res) => {
  try {
    const removedTodo = await Todo.remove({ _id: req.params.todoId });
    res.status(200).send(removedTodo);
  } catch (err) {
    res.json({ message: err });
  }
};

const updateCheckedHandler = async (req, res) => {
  try {
    const updateTodo = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      { checked: req.body.checked }
    );
    res.json(updateTodo);
  } catch (err) {
    res.json({ message: err });
  }
};

const updateCheckAllHandler = async (req, res) => {
  try {
    const updateTodoCheckAll = await Todo.updateMany({
      $set: {
        checked: req.body.checked,
      },
    });
    res.json(updateTodoCheckAll);
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteAllCheckedHandler = async (req, res) => {
  try {
    const removedTodo = await Todo.remove({ checked: true });
    res.status(200).send(removedTodo);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  getAllToDoHandler,
  addTodoHandler,
  deleteSpecificTodoHandler,
  updateCheckedHandler,
  updateCheckAllHandler,
  deleteAllCheckedHandler,
};
