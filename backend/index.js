const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appRouter = require('./routeNotes');
const Note = require('./note');
const logger = require('./loggerAppend');

const uri = "mongodb+srv://ronhpersonal:123456789David@cluster0.yyfs3xy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || env.MONGODBURL; //uri from .env doesnt work

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
