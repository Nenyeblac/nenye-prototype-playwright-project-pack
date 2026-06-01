const nodemailer = require('nodemailer');
const status = process.argv[2];

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'team@example.com',

    subject: `Playwright Tests - ${status.toUpperCase()}`,
    text: `Test run completed with status: ${status}`,
    html: `<h2>Test Results: ${status}</h2>`
};

transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        console.log('Error sending email: ', error);
    } else {
        console.log('Email sent: ', info.response);
    }
});