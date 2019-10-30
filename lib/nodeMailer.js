var nodemailer = require('nodemailer');
var hbs = require('handlebars');
var EmailTemplate = require('./shoutTemplate')
var accountTemplate = require('./accountCreationTemplate')
var transporter = nodemailer.createTransport({
  pool: true,
  port: 587,
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  },
});
var template = hbs.compile(EmailTemplate.htmlPage);
var accountTemplate = hbs.compile(accountTemplate.htmlPage);

var mailOptions = {
  from: '' + process.env.APPNAME + '<' + process.env.NODEMAILER_USER + '>',
  to: '',
  subject: 'Credits Redemption : DO NOT REPLY',
  html: EmailTemplate.htmlPage
};

var accountMailOptions = {
  from: "" + process.env.APPNAME + "<" + process.env.NODEMAILER_USER + ">",
  to: "",
  subject: "ACCOUNT CREATION : DO NOT REPLY",
  //text: 'This is an automated email to confirm your OTP which is :'
  html: accountTemplate.htmlPage
};

var sendAccountMail = function (to, pass) {
  accountMailOptions.to = to;
  var data = {
    InitialPassword: pass
  }
  console.log(pass)
  //mailOptions.text = mailOptions.text.concat(' ',text);
  accountMailOptions.html = accountTemplate(data);


  transporter.sendMail(accountMailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

var sendMail = function (data) {
  mailOptions.to = data.receiversEmail;
  data.storeLink = "www.shoutStoreLocations.com"
  //mailOptions.text = mailOptions.text.concat(' ',text);
  mailOptions.html = template(data);
  console.log(data);

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendMail: sendMail,
  sendAccountMail: sendAccountMail
}