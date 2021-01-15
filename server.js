const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(logger("dev"));

app.post("/send", function (req, res, next) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
});
const mailOptions = {
  from: `${req.body.email}`,
  to: process.env.EMAIL,
  subject: `${req.body.name}`,
  text: `${req.body.message}`,
  replyTo: `${req.body.email}`,
};
transporter.sendMail(mailOptions, function (err, res) {
  if (err) {
    console.error("there was an error: ", err);
  } else {
    console.log("here is the res: ", res);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log(`Express is running on port: ${port}`);
});
