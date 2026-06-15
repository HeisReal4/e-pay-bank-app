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
      from:`E-pay Banking Service ${process.env.EMAIL} `,
      to: to,
      subject: "E-Pay Banking Service - Email Verification Code",
      text:`E-Pay Banking Service

Your verification code is: ${code}

This code will expire in 10 minutes.

If you did not request this code, please ignore this email.

Thank you.
`
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