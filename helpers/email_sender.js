const { text } = require('body-parser');
const nodemailer = require('nodemailer');

exports.sendMail = async(email,subject,body,successMessage,errorMessage)=>{
    
    
    return new Promise((resolve,reject)=> {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            }
        })
        console.log(email);
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: body,
        }
        return transporter.sendMail(mailOptions,(error,info)=> {

            if(error){
                console.error('error sending mail',error);
                reject(Error('Error sending email'));
            }
            console.log('Email sent',info.response);
            resolve({message: 'password reset OTP sent to your email',statusCode: 200})
        });
        
    })
    
}