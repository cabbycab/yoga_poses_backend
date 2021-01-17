const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Welcome to the backend!");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/send", (req, res, next) => {
  const mailOptions = {
    from: `${req.body.emailState.email}`,
    to: process.env.EMAIL,
    subject: `Yoga Poses Message From: ${req.body.emailState.email}`,
    text: `${req.body.emailState.email} says, ${req.body.message.message}`,
  };

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
});

const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log(`Express is running on port: ${port}`);
});
