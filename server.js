const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3000;

// SendGrid API Key
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

app.use(bodyParser.json());

// Welcome email endpoint
app.post('/sendWelcomeEmail', (req, res) => {
    const { email } = req.body;

    const msg = {
        to: email,
        from: 'your-email@example.com',
        subject: 'Welcome to DEV@Deakin',
        text: 'Thank you for subscribing to DEV@Deakin!',
        html: '<strong>Thank you for subscribing to DEV@Deakin!</strong>',
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).send('Welcome email sent successfully');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error sending welcome email');
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



