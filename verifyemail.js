import nodemailer from 'nodemailer';
const myemail= process.env.EMAIL;
const mypass = process.env.APP_PASSWORD;
const emailSender= nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:myemail,
    pass: mypass
  }
})

async function sendEmail(to, code) {
  try {
   const send= await emailSender.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject:"verify your email",
      text:`Your Email verifacation code is ${code}`
    })
    if (send) {
      return {
        message: 'email has been sent'
      }
    }
  } catch (error) {
    console.log(error.message);
       return {
        message: 'error sending mail'
      }
  }
}



export default sendEmail;