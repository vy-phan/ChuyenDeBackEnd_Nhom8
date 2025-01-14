// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv";

// dotenv.config();

// if (!process.env.MAILTRAP_ENDPOINT || !process.env.MAILTRAP_TOKEN) {
// 	throw new Error('Missing required Mailtrap configuration');
// }

// console.log("Mailtrap config:", {
// 	endpoint: process.env.MAILTRAP_ENDPOINT,
// 	hasToken: !!process.env.MAILTRAP_TOKEN
// });

// export const mailtrapClient = new MailtrapClient({
// 	endpoint: process.env.MAILTRAP_ENDPOINT,
// 	token: process.env.MAILTRAP_TOKEN,
// });

// export const sender = {
// 	email: "mailtrap@demomailtrap.com",
// 	name: "Website NetTrom",
// };

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

export const emailConfig = {
    from: {
        name: "Website NetTrom",
        email: process.env.EMAIL_USER
    }
};

export default transporter;