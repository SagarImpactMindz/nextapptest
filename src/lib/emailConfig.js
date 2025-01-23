import nodemailer from 'nodemailer'
const {EMAIL_HOST,EMAIL_PORT,EMAIL_USER,EMAIL_PASS,EMAIL_FROM}=process.env
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false, //true for 465,false for other ports
    auth: {
      user: EMAIL_USER,//Admin Gmail ID
      pass: EMAIL_PASS,//Admin Gmail ID Password
    },
  });

export default transporter

// Function to send an email
export const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: EMAIL_FROM, // sender address
        to, 
        subject, // Subject line
        html, // html body
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
        return info;
      } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error('Email could not be sent.');
      }
    
}