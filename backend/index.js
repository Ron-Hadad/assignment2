const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appRouter = require('./routeNotes');
const Note = require('./note');
const logger = require('./logger');

require('dotenv').config();


const uri =  process.env.MONGODB_CONNECTION_URL; 

const app = express();
app.use(cors());
app.use(express.json());
app.use(appRouter);
app.use(logger);

mongoose.connect(uri, {})
    .then(() => {
        console.log('Connected to MongoDB Serever');
    })
    .catch(err => {
        console.error('MongoDB connection error to server', err);
    });

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
