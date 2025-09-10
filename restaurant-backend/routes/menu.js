const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// Get all menu sections
router.get("/", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// Add a new section
router.post("/", async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new item to a section
router.post("/:id/items", async (req, res) => {
  try {
    const section = await Menu.findById(req.params.id);
    if (!section) return res.status(404).json({ error: "Menu section not found" });

    section.items.push(req.body); // { name, price, image }
    await section.save();
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ error: "Failed to add item" });
  }
});


// Update section by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Menu not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update menu" });
  }
});

// Delete section by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Menu.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Menu not found" });
    res.json({ message: "Menu deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete menu" });
  }
});

module.exports = router;
