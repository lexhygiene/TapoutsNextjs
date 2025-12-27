import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("📝 [API] Received Form Submission:", body); // Log for debugging
        const { name, email, phone, topic, message, gdprConsent, newsletter, recaptchaToken } = body;

        // Allow bypassing reCAPTCHA for local testing
        if (recaptchaToken !== 'bypass') {
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
        } else {
            console.log("⚠️ [API] Skipping reCAPTCHA verification (Bypass Token utilized)");
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
            from: '"Tapouts Website" <info@tapouts.co>',
            to: process.env.SMTP_USER || "info@tapouts.co",
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

        const sendEmailPromise = transporter.sendMail(mailOptions);

        // Save to Sanity
        const sanityPromise = (async () => {
            if (!process.env.SANITY_API_TOKEN) {
                console.warn('SANITY_API_TOKEN not found, skipping lead capture to Sanity');
                return;
            }
            try {
                const { createClient } = await import('next-sanity');
                const { apiVersion, dataset, projectId } = await import('../../../sanity/env');

                const writeClient = createClient({
                    projectId,
                    dataset,
                    apiVersion,
                    token: process.env.SANITY_API_TOKEN,
                    useCdn: false,
                });

                await writeClient.create({
                    _type: 'lead',
                    name,
                    email,
                    phone,
                    topic,
                    message,
                    gdprConsent,
                    newsletter,
                    status: 'new',
                });
                console.log('Lead saved to Sanity');
            } catch (sanityError) {
                console.error('Error saving lead to Sanity:', sanityError);
                // Don't block the response if Sanity fails, but log it
            }
        })();

        // Push to GoHighLevel
        const ghlPromise = (async () => {
            const apiKey = process.env.GHL_API_KEY;

            if (!apiKey) {
                console.warn('⚠️ GHL_API_KEY not found, skipping GHL push');
                return;
            }

            try {
                // Split name into First and Last
                const nameParts = name.trim().split(' ');
                const firstName = nameParts[0];
                const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

                const ghlPayload = {
                    firstName,
                    lastName,
                    email,
                    phone,
                    tags: ['website-lead', topic],
                    source: 'Tapouts Website',
                    locationId: 'yff1Mji6qXOEUZ85xpwg'
                };

                const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Version': '2021-07-28',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(ghlPayload)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`❌ GHL API Failed: ${response.status} ${response.statusText}`, errorText);
                } else {
                    console.log('✅ Lead pushed to GoHighLevel successfully');
                }
            } catch (ghlError) {
                console.error('❌ Error pushing to GHL:', ghlError);
            }
        })();

        await Promise.all([sendEmailPromise, sanityPromise, ghlPromise]);

        return NextResponse.json({ message: 'Email sent, lead saved to Sanity and GHL' }, { status: 200 });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
    }
}
