module.exports = app => {
    const todolist = require("../controllers/todoitem.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", todolist.create);
    // Retrieve all todolist
    router.get("/", todolist.findAll);
    // Retrieve all published todolist
    router.get("/completed", todolist.findAllCompleted);
    // Retrieve a single Tutorial with id
    router.get("/:id", todolist.findOne);
    // Update a Tutorial with id
    router.put("/:id", todolist.update);
    // Delete a Tutorial with id
    router.delete("/:id", todolist.delete);
    // Create a new Tutorial
    router.delete("/", todolist.deleteAll);
    app.use('/api/todolist', router);
  };