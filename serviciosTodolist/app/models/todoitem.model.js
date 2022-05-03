module.exports = mongoose => {
    const Todoitem = mongoose.model(
      "todoitem",
      mongoose.Schema(
        {
          titulo: String,
          detalle: String,
          completada: Boolean
        },
        { timestamps: true }
      )
    );
    return Todoitem;
  };