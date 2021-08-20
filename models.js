
const mongoose = require('mongoose');
let emailRegexVal = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;



const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 5,
        required: true
    },
    email: {
        type: String,
         validate: {
        validator: function(v) {
            return emailRegexVal.test(v);
            },
        },
        message: (mail) => `${mail.value} is not a valid email address !`,
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
module.exports = Contact;
