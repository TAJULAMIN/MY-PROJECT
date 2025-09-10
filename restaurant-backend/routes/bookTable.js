const express = require("express");
const router = express.Router();
const TableBooking = require("../models/TableBooking");


/**
 * =========================
 * USER ROUTES
 * =========================
 */



// POST - Book a table
router.post("/", async (req, res) => {
  try {
    console.log("Incoming booking data:", req.body);

    const newBooking = new TableBooking(req.body);
    const savedBooking = await newBooking.save();

    console.log("Booking saved successfully:", savedBooking);
    res.status(201).json({ message: "Table booked!", booking: savedBooking });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(400).json({ error: err.message, details: err.errors });
  }
});

// GET - Fetch reservations for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const reservations = await TableBooking.find({ userId: req.params.userId });

    if (reservations.length > 0) {
      res.json({ reservationExists: true, reservations });
    } else {
      res.json({ reservationExists: false, reservations: [] });
    }
  } catch (err) {
    console.error("Error fetching user reservations:", err);
    res.status(500).json({ error: "Server error" });
  }
});
/**
 * =========================
 * ADMIN ROUTES
 * =========================
 */
const { verifyToken, verifyAdmin } = require("../middleware/auth");
router.get("/admin/reservations", verifyToken, verifyAdmin, async (req, res) => {
  const bookings = await TableBooking.find();
  res.json(bookings);
});


// DELETE - Remove a booking (Admin only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const booking = await TableBooking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
