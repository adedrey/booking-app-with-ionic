const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    placeId: {
        type: String,
        required: true
    },
    placeImage: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    placeTitle: {
        type: String,
        required: true
    },
    guestNumber: {
        type: Number,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    bookedFrom: {
        type: Date,
        required: true
    },
    bookedTo: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);