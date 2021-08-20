const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Contact = require('./models')
const bodyparser = require('body-parser')
dotenv.config()
app = express();


// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))



mongoose.connect('mongodb://localhost:27017/resume',
    { useNewUrlParser: true ,
     useUnifiedTopology: true,useCreateIndex:true })
    .then(() => console.log('Connected to mongodb..'))
    .catch(err => console.error('Could not connect to mongodb server..'));

//create a tranporter object
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });



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
        let mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: req.body.email,
            subject: 'Enquiries As regards my CV',
            text: req.body.message
          };
         transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log("Error " + err);
            } else {
              console.log("Email sent successfully", data);
            }
          });
        return res.redirect('/');
    }
    catch (err) {
        console.error(err) // for monitoring errors
        // res.render('error/400')
        res.send(err.message);
        return res.redirect('/')
    } 
    
});





const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});