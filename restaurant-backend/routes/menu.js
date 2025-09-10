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

// Delete a section by ID
// --------------------
router.delete("/:id", async (req, res) => {
  try {
    const deletedSection = await Menu.findByIdAndDelete(req.params.id);

    if (!deletedSection) {
      return res.status(404).json({ error: "Section not found" });
    }

    res.json({ message: "Section deleted successfully" });
  } catch (err) {
    console.error("Error deleting section:", err);
    res.status(500).json({ error: "Failed to delete section" });
  }
});


// Add a new item to a section
router.post("/:id/items", async (req, res) => {
  const section = await Menu.findById(req.params.id);
  section.items.push(req.body);
  await section.save();
});




// Delete item in a section
router.delete("/:sectionId/items/:itemId", async (req, res) => {
  try {
    const { sectionId, itemId } = req.params;
    const section = await Menu.findById(sectionId);
    if (!section) return res.status(404).json({ error: "Menu section not found" });

    // Remove the item from the array
    section.items = section.items.filter(item => item._id.toString() !== itemId);
    await section.save();

    res.json({ message: "Item deleted successfully", section });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});


module.exports = router;
