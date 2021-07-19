const Place = require('../models/offers');
exports.postOffer = (req, res, next) => {
    // ....
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const availableFrom = req.body.availableFrom;
    const availableTo = req.body.availableTo;
    const userId = req.body.userId;
    const newPlace = new Place({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        availableFrom: availableFrom,
        availableTo: availableTo,
        userId: userId,
    });
    newPlace.save()
        .then(place => {
            res.status(200).json({
                place: place
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}
exports.getOfferById = (req, res, next) => {
    Place.findOne({
            _id: req.params.id
        })
        .then(place => {
            if (!place) {
                return res.status(401).json({
                    message: 'Unable to find a place'
                })
            }
            res.status(200).json({
                place: place
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}
exports.getOffers = (req, res, next) => {
    Place.find()
        .then(places => {
            res.status(200).json({
                places: places
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}
exports.postUpdateOffer = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    Place.findOne({
            _id: req.params.id
        })
        .then(place => {
            if (!place) {
                return res.status(401).json({
                    message: 'Unable to find a place'
                })
            }
            place.title = title;
            place.description = description;
            place.save().then(result => {
                res.status(200).json({
                    place: result
                })
            }).catch(err => {
                res.status(500).json({
                    message: err
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}
exports.deleteOffer = (req, res, next) => {
    Place.findOneAndDelete({_id: req.params.id})
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

