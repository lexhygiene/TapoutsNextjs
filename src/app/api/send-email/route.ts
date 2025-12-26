import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, phone, topic, message, gdprConsent, newsletter, recaptchaToken } = await request.json();

        if (!recaptchaToken) {
            return NextResponse.json({ error: 'reCAPTCHA token is missing' }, { status: 400 });
        }

        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
        const verificationResponse = await fetch(verificationUrl, { method: 'POST' });
        const verificationData = await verificationResponse.json();

        if (!verificationData.success) {
            console.error('reCAPTCHA verification failed:', verificationData);
            return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: '"Tapouts Website" <connect@komaknexus.com>',
            to: process.env.SMTP_USER || "connect@komaknexus.com",
            subject: `New Enquiry: ${topic} from ${name}`,
            html: `
              <h2>New Website Enquiry</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Topic:</strong> ${topic}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
              <br>
              <p><strong>GDPR Consent:</strong> ${gdprConsent ? 'Yes' : 'No'}</p>
              <p><strong>Newsletter:</strong> ${newsletter ? 'Yes' : 'No'}</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
