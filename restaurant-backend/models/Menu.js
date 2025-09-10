const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String }, // store icon name like "LocalDining"
  items: [
    {
      name: { type: String, required: true },
      price: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Menu", menuSchema);
