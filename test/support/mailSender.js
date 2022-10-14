const nodemailer = require('nodemailer');
const staticData = require('./staticData');
const dynamicData = require('./dynamicData');

class MailSender {
    async sendEmailAboutDateChange(...recepients) {
        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: 'datacheckernotif@outlook.com',
                pass: 'DataCheckerN123456'
            },
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
