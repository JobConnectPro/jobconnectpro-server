const nodemailer = require('nodemailer');
const { ClientBase } = require('pg');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jobconnexpro@gmail.com',
    pass: 'tykqjfxyklitidog',
  },
});

const sendMailForgotPassword = async (emailData, resetLink, host) => {
  console.log(host);

  const mailOptions = {
    from: 'Job Connect Pro',
    to: `${emailData.email}`,
    subject: `password reset`,
    text: 'You are receiving this email. Please click on the email for password reset ' + `${host}/reset-password/${resetLink}` + '\n\n' + 'If you did not request this, please ignore this email',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendMailForgotPassword;
