const mongoose = require('mongoose');

const TableBookingSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1, max: 20 },
    branch: { type: String, required: true, enum: ["Swabi", "Karachi", "Lahore"] }, // ✅ Branch
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TableBooking', TableBookingSchema);
