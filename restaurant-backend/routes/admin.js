const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// simple admin check by email
router.get("/admin/reservations", async (req, res) => {
  const userEmail = req.query.email; // client will send ?email=...

  if (userEmail !== "admin@gmail.com") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
