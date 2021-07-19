const Booking = require('../models/bookings');
exports.getBookings = (req, res, next) => {
    Booking.find({userId: req.params.userId})
    .then(bookings => {
        res.status(200).json({
            bookings: bookings
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err
        });
    })
}
exports.postBooking = (req, res, next) => {
    const placeId = req.body.placeId;
    const placeImage = req.body.placeImage;
    const userId = req.body.userId;
    const placeTitle = req.body.placeTitle;
    const guestNumber = req.body.guestNumber;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const bookedFrom = req.body.bookedFrom;
    const bookedTo = req.body.bookedTo;
    const booking = new Booking({
        placeId: placeId,
        placeImage: placeImage,
        userId: userId,
        placeTitle: placeTitle,
        guestNumber: guestNumber,
        first_name: first_name,
        last_name: last_name,
        bookedFrom: bookedFrom,
        bookedTo: bookedTo
    });
    booking.save()
    .then(booking => {
        res.status(200).json({
            booking: booking
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
}
exports.deleteBookings = (req, res, next) => {
    Booking.findOneAndDelete({_id: req.params.id})
    .then(result => {
        if(!result) {
            return res.status(401).json({
                message: 'Unable to delete'
            });
        }
        res.status(200).json({
            result: 'Deleted Successfully'
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
}