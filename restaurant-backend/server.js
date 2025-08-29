const TableBooking = require('./models/TableBooking');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const bookTableRoutes = require('./routes/bookTable');
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Fetch data
async function fetchBookings() {
  const bookings = await TableBooking.find();
  // console.log(bookings);
}
fetchBookings();

// Route for Booking list
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await TableBooking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Route for single booking
app.get("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await TableBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

/// ✅ Update a booking by ID
app.put("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await TableBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});




// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
  });

// API Routes
app.use('/api/book-table', bookTableRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
