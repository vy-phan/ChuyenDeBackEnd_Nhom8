import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MAILTRAP_ENDPOINT || !process.env.MAILTRAP_TOKEN) {
	throw new Error('Missing required Mailtrap configuration');
}

console.log("Mailtrap config:", {
	endpoint: process.env.MAILTRAP_ENDPOINT,
	hasToken: !!process.env.MAILTRAP_TOKEN
});

export const mailtrapClient = new MailtrapClient({
	endpoint: process.env.MAILTRAP_ENDPOINT,
	token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
	email: "mailtrap@demomailtrap.com",
	name: "Website NetTrom",
};
