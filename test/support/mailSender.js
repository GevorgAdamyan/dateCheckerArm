const nodemailer = require('nodemailer');
const staticData = require('./staticData');
const dynamicData = require('./dynamicData');

class MailSender {
    async sendEmailAboutDateChange(...recepients) {
        let transporter = nodemailer.createTransport({
            host: "smtp.localhost",
            port: 25,
            secure: false,
            tls: { 
                rejectUnauthorized: false 
            } 
        });
        let info = await transporter.sendMail({
            from: staticData.outlookUsername,
            to: recepients,
            subject: dynamicData.mailSubject,
            text: dynamicData.mailContent
        });
        console.log("Message sent: %s", info.messageId);
    }
}

module.exports = new MailSender();
