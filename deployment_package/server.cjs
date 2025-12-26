const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({ static: './public' }); // Serve frontend from ./public
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Security Middleware
server.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for simplicity in this demo, enable and configure in production
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
server.use(limiter);

server.use(cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'http://localhost:3001', 'https://komaknexus.com', 'https://www.komaknexus.com', 'https://admin.komaknexus.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
server.use(bodyParser.json());

// Serve Admin Panel
server.use('/admin', jsonServer.defaults({ static: './admin' }));

// Custom route for sending emails - MUST be before router
server.post('/api/send-email', async (req, res) => {
    const { name, email, phone, topic, message, gdprConsent, newsletter } = req.body;

    // Create a transporter
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Email content
    const mailOptions = {
        from: '"Komak Nexus Website" <connect@komaknexus.com>',
        to: "connect@komaknexus.com", // Send to yourself
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

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Retell API Proxy Routes
server.post('/api/retell/create-web-call', async (req, res) => {
    const { agent_id } = req.body;
    const apiKey = process.env.RETELL_API_KEY;

    if (!apiKey) {
        console.error('RETELL_API_KEY is missing in environment variables');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const response = await fetch('https://api.retellai.com/v2/create-web-call', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ agent_id }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Retell API Error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error creating web call:', error);
        res.status(500).json({ error: 'Failed to create web call' });
    }
});

server.post('/api/retell/create-phone-call', async (req, res) => {
    const { from_number, to_number, agent_id, retell_llm_dynamic_variables } = req.body;
    const apiKey = process.env.RETELL_API_KEY;

    if (!apiKey) {
        console.error('RETELL_API_KEY is missing in environment variables');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const response = await fetch('https://api.retellai.com/v2/create-phone-call', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from_number,
                to_number,
                agent_id,
                retell_llm_dynamic_variables
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Retell API Error: ${errorText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error creating phone call:', error);
        res.status(500).json({ error: 'Failed to create phone call' });
    }
});

// Gemini API Proxy Route
const { GoogleGenerativeAI } = require("@google/generative-ai");

server.post('/api/gemini/chat', async (req, res) => {
    const { history, message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('GEMINI_API_KEY is missing');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are a helpful, friendly customer support agent for a WordPress website. Keep your answers concise and helpful."
        });

        const chat = model.startChat({
            history: history.map(h => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: h.parts
            })),
        });

        const result = await chat.sendMessageStream(message);

        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(chunkText);
        }
        res.end();

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

// API Routes
server.use('/api', router);

// Catch-all for Admin Panel SPA
server.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Catch-all for Frontend SPA (must be last)
server.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
        // If it's an API request that didn't match, let it 404 naturally or handle it
        res.status(404).json({ error: "API endpoint not found" });
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
