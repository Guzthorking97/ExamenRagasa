const db = require("../models");
const Todoitem = db.todoitems;
// Create and Save a new Todoitem
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({ message: "No se puede enviar informacion vacia!" });
    return;
  }
  // Create a Todoitem
  const todoitem = new Todoitem({
    titulo: req.body.titulo,
    detalle: req.body.detalle,
    completada: req.body.completada ? req.body.completada : false
  });
  // Save Todoitem in the database
  todoitem
    .save(todoitem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algo pasó mientras se creaba la tarea."
      });
    });
};
// Retrieve all TodoList from the database.
exports.findAll = (req, res) => {
    const title = req.query.titulo;
    var condition = title ? { titulo: { $regex: new RegExp(title), $options: "i" } } : {};
    Todoitem.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algo pasó mientras se buscaban la tareas."
        });
      });
};
// Find a single Todoitem with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Todoitem.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "No se encontró el elemento con el id: " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error al buscar elemento con el id=" + id });
      });
};
// Update a Todoitem by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "La información a actualizar no puede estar vacía!"
        });
      }
      const id = req.params.id;
      Todoitem.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `No se pudo actualizar el elemento con el id=${id}. Quizas el elemento no fué encontrado!`
            });
          } else res.send({ message: "El elemento fue actualizado correctamente." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error al actualizar el elemento con el id=" + id
          });
        });
};
// Delete a Todoitem with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Todoitem.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se pudo eliminar el elemento con el id=${id}. Quizas el elemento no fué encontrado!`
          });
        } else {
          res.send({
            message: "El elemento fue eliminado correctamente."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al eliminar el elemento con el id=" + id
        });
      });
};
// Delete all TodoList from the database.
exports.deleteAll = (req, res) => {
    Todoitem.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Todos los elementos fueron eliminados correctamente!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los elementos."
      });
    });
};
// Find all completed Todoitems
exports.findAllCompleted = (req, res) => {
    Todoitem.find({ completada: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al buscar todos los elementos completados."
      });
    });
};