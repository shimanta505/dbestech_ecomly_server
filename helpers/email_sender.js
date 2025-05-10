const { text } = require('body-parser');
const nodemailer = require('nodemailer');

exports.sendMail = async(res,email,subject,body,successMessage,errorMessage)=>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: body,
    }

   return transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error('Error sending email:',error);
            return {message: errorMessage,statusCode: 500};

        }

        return {message: info.response,statusCode: 200};
    });
}