const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const mailOptions = {
  from: "dkoski4@yahoo.com",
  to: "dkoski426@gmail.com",
  subject: "Testing 123",
  text: "Is it really working?",
  // from: `${req.body.email}`,
  // to: process.env.EMAIL,
  // subject: `${req.body.name}`,
  // text: `${req.body.message}`,
  // replyTo: `${req.body.email}`,
};

// app.post("/send", (req, res, next) => {
//   let mail = {
//     from: `${req.body.emailState.email}`,
//     to: process.env.EMAIL,
//     subject: `Message From: ${req.body.emailState.email}, Yoga Poses`,
//     text: `${req.body.emailState.email} says, ${req.body.message.message}`,
//   };
transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    res.json({
      status: "error",
    });
  } else {
    res.json({
      status: "success",
    });
  }
});
// });

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("== server is ready to take messages ==");
//   }
// });

// app.post("/", function (req, res, next) {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });
// });
// const mailOptions = {
//   from: `${req.body.email}`,
//   to: process.env.EMAIL,
//   subject: `${req.body.name}`,
//   text: `${req.body.message}`,
//   replyTo: `${req.body.email}`,
// };
// transporter.sendMail(mailOptions, function (err, res) {
//   if (err) {
//     console.error("There was an error: ", err);
//   } else {
//     console.log("Here is the res: ", res);
//   }
// });

const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log(`Express is running on port: ${port}`);
});
