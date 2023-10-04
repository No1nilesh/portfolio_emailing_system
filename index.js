const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const port = process.env.PORT;
const pass = process.env.APP_PASS;

app.use(cors());
app.use(bodyParser.json());

app.post("/send-mail", (req, res) => {

    let success = false;
  const { name, email, questions } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "portfolioemailsend",
      pass: pass,
    },
  });

  const mailOptions = {
    from: "portfolioemailsend",
    to: "gautamnilesh084@gmail.com",
    subject: "New Contact form submission",
    text: `
        Name: ${name},
        Email: ${email},
        Questions: ${questions}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

   
    res.status(200).json({success:true, info : info.response , message : "Email sent successfully"})
  });
});

app.listen(port, () => {
  console.log(`This app is listining on ${port}`);
});
