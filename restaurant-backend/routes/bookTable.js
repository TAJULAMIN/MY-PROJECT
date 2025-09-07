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

// GET - Fetch all reservations (Admin only)
router.get("/admin/reservations", async (req, res) => {
  const userEmail = req.query.email; // ?email=admin@gmail.com

  if (userEmail !== "admin@gmail.com") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const reservations = await TableBooking.find();
    res.json(reservations);
  } catch (err) {
    console.error("Error fetching all reservations:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
