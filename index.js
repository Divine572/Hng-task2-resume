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
});

const Contact = mongoose.model('Contact', contactSchema);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});


app.post('/', async (req, res) => {
    try {
        let contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message     
        })
        await contact.save();
        res.redirect('/');
    }
    catch (err) {
        // console.error(err)
        // res.render('error/400')
        res.send(err.message);
    } 
});





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});