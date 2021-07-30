const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const verifyToken = require("../middlewares/verifyToken");

const {
  getAllToDoHandler,
  addTodoHandler,
  deleteSpecificTodoHandler,
  updateCheckedHandler,
  updateCheckAllHandler,
  deleteAllCheckedHandler,
} = require("../controllers/todoControllers");

//Get Back All the todos
router.get("/getAllToDos/:id", verifyToken, getAllToDoHandler);

//Submits a todo
router.post("/addtodohandler", addTodoHandler);

//delete Specific todo
router.delete("/deleteTodo/:todoId", deleteSpecificTodoHandler);

//update specific todo title
router.put("/edittodo/:id", async (req, res) => {
  try {
    const updateTodoEdited = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      { title: req.body.title }
    );
    res.json(updateTodoEdited);
  } catch (err) {
    res.json({ message: err });
  }
});

//

//update specific todo checked
router.put("/checktodos/:id", updateCheckedHandler);

//update todos with check all
router.put("/checkalltodos", updateCheckAllHandler);

//delete todos by delete all checked
router.delete("/deletealltodoschecked", deleteAllCheckedHandler);

module.exports = router;
