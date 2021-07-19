const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const offerRouter = require('./routes/offers');
const bookingRouter = require('./routes/bookings');
const MongoDBURI = 'mongodb://127.0.0.1:27017/ionic-course';
// const MongoDBURI = 'mongodb+srv://klez:kleztech@cluster0-nm91y.mongodb.net/ionic-course';
const app = express();

mongoose.connect(MongoDBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(connect => {
        console.log('Connected to Database');
    })
    .catch(err => {
        console.log('Connection failed');
    })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, AdminAuthorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(offerRouter);
app.use(bookingRouter);

module.exports = app;