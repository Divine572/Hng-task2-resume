const express = require('express');
const mongoose = require('mongoose');

app = express();




// Middleware
app.use(express.static('public'));
app.use(express.json());



mongoose.connect('mongodb://localhost/resume',
    { useNewUrlParser: true },
    { useUnifiedTopology: true })
    .then(() => console.log('Connected to mongodb..'))
    .catch(err => console.error('Could not connect to mongodb server..'));


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 5,
        required: true
    },
    email: {
        type: String,
        maxlength: 50,
        minlength: 5,
        required: true
    },
    message: {
        type: String,
        maxlength: 250,
        minlength: 5,
        required: true
    }
});const express = require('express');
const mongoose = require('mongoose');

app = express();




// Middleware
app.use(express.static('public'));
app.use(express.json());



mongoose.connect('mongodb://localhost/resume',
    { useNewUrlParser: true },
    { useUnifiedTopology: true })
    .then(() => console.log('Connected to mongodb..'))
    .catch(err => console.error('Could not connect to mongodb server..'));


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 5,
        required: true
    },
    email: {
        type: String,
        maxlength: 50,
        minlength: 5,
        required: true
    },
    message: {
        type: String,
        maxlength: 250,
        minlength: 5,
        required: true
    }
});