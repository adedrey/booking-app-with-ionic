const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');

router.get('/api/bookings/:userId', bookingController.getBookings);
router.post('/api/bookings/new-booking', bookingController.postBooking);
router.delete('/api/booking/:id', bookingController.deleteBookings);

module.exports = router