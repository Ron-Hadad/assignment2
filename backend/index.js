const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appRouter = require('./routeNotes');
const Note = require('./note');
const logger = require('./logger');

const uri = "mongodb+srv://test_user123:zBKvWonhCKg2rCiX@cluster0.r1sudcq.mongodb.net/presubmission?retryWrites=true&w=majority&appName=Cluster0" || env.MONGODBURL; //uri from .env doesnt work

const app = express();
app.use(cors());
app.use(express.json());
app.use(appRouter);
app.use(logger);

mongoose.connect(uri, {})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('MongoDB connection error', err);
    });

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
