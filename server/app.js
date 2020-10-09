const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const HttpError = require('./models/http-error');
const listingRoutes = require('./routes/listingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/api/listings', listingRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});


app.use((error, req, res, next) => {

    if(req.file){
        fs.unlink(req.file.path, (err) => {console.log(err)});
    }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    console.log(error.message);
    res.json({ message: error.message || 'An unknown error occurred!' });
});


const port = process.env.PORT || 5000;


mongoose.connect(
    'mongodb+srv://dotWaterloo:dotProjects@cluster0.j86my.mongodb.net/listings?retryWrites=true&w=majority', 
    { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex:true, })
.then(() => {
    app.listen(port);
})
.catch( err => {
    console.log(err);
});