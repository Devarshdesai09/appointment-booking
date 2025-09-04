const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

//Configure Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: true, // True for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Function to Send Email
const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: `"Animal Husbandry" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log("📩 Email sent successfully to:", to);
    } catch (error) {
        console.error("🚨 Error sending email:", error);
    }
};

module.exports = sendEmail;
