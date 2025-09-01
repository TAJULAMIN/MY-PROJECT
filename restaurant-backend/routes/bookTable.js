const express = require('express');
const router = express.Router();
const TableBooking = require('../models/TableBooking');

// POST - Book a table
router.post('/', async (req, res) => {
  try {
    // Log incoming request body
    console.log('Incoming booking data:', req.body);

    // Create a new booking
    const newBooking = new TableBooking(req.body);

    // Save to DB
    const savedBooking = await newBooking.save();

    console.log('Booking saved successfully:', savedBooking);
    res.status(201).json({ message: 'Table booked!', booking: savedBooking });
  } catch (err) {
    console.error('Error saving booking:', err);

    // Send detailed error
    res.status(400).json({ error: err.message, details: err.errors });
  }
});

// GET reservations for a user
router.get('/:userId', async (req, res) => {
  try {
    const reservations = await TableBooking.find({ userId: req.params.userId });
    if (reservations.length > 0) {
      res.json({ reservationExists: true, reservations });
    } else {
      res.json({ reservationExists: false, reservations: [] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
