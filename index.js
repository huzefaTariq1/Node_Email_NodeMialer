const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
var cors = require('cors')
const nodemailer=require("nodemailer")


app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
    res.render("mail");
});


app.post("/email-sent",async(req,res)=>{
    const { name, email, message } = req.body;
   

    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });


      const mailOptions = {
           // to send email to User
        // from: process.env.EMAIL,
        // to: email,
           // to receive email with user data
        from: email,
        to: process.env.EMAIL,
        subject: name,
  
        html: `My name is ${name} and my testing message is a ${message} and sender is ${email}`,
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(400).json({ messgae: "Error" });
        }
        return res.status(200).json({ messgae: "Email Sent" });
      });
})

port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is running on to port  ${port}`)
})

