const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jobconnexpro@gmail.com',
    pass: 'tykqjfxyklitidog',
  },
});

const sendMail = async (obj) => {
  const mailOptions = {
    from: 'Job Connect Pro',
    to: `${obj.email}`,
    subject: `Application Status ${obj.title} ${obj.company}`,
    html: `<html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            body {
              margin-top: 50px;
              font-family: Arial, Helvetica, sans-serif;
            }
            .content {
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              justify-content: center;
              align-content: center;
              margin-left: auto;
              margin-right: auto;
              width: 50%;
              text-align: justify;
              border: 2px solid black;
              border-radius: 10px;
              padding: 30px;
            }
            .text-blue {
              color: rgb(29 78 216);
            }
            .text-center {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div>
            <div class="text-center">
              <h1>Job Connect</h1>
            </div>
            <div class="content">
              <h3>Hi, ${obj.name}!</h3>
              <p>Your Application Status as a <b>${obj.title}</b> at <b>${obj.company}</b> is:</p>
              <h3 class="text-blue text-center">
                <i>"${obj.status}"</i>
              </h3>
              <p>
                <span><b>Message:</b></span
                ><br />
                ${obj.description}
              </p>
            </div>
          </div>
        </body>
      </html>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendMail;
