const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Server is running' }));

// Availability storage (in-memory)
let availability = {
  unavailableDates: [],
  message: 'We are currently booking events! Contact us to check availability for your date.'
};

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email transporter error:', error);
  } else {
    console.log('Email transporter is ready');
  }
});

// Book Now form submission endpoint
app.post('/api/book-now', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      eventDate,
      eventType,
      guestCount,
      venue,
      message,
      agreeToTexts
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !eventDate || !eventType) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Format the email content
    const emailContent = `
New Booking Inquiry - Project Party Productions

CONTACT INFORMATION:
Name: ${name}
Email: ${email}
Phone: ${phone}

EVENT DETAILS:
Event Date: ${eventDate}
Event Type: ${eventType}
Expected Guest Count: ${guestCount || 'Not specified'}
Venue/Location: ${venue || 'Not specified'}

ADDITIONAL DETAILS:
${message || 'No additional details provided'}

TEXT MESSAGE CONSENT:
${agreeToTexts ? 'Yes, customer agrees to receive text messages' : 'No, customer does not want text messages'}

---
This inquiry was submitted through the Project Party Productions website.
Please respond to the customer within 24 hours.
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Booking Inquiry - ${name} (${eventDate})`,
      text: emailContent,
      replyTo: email
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for your inquiry - Project Party Productions',
      text: `
Dear ${name},

Thank you for your inquiry about our photobooth services for your ${eventType} on ${eventDate}.

We have received your booking request and will review the details. Our team will contact you within 24 hours to discuss your event and provide a custom quote.

Event Details Received:
- Date: ${eventDate}
- Type: ${eventType}
- Guest Count: ${guestCount || 'Not specified'}
- Venue: ${venue || 'Not specified'}

If you have any immediate questions, please don't hesitate to contact us:
Phone: 647-957-2057
Email: info@projectpartyproductions.com

We look forward to making your event unforgettable!

Best regards,
Project Party Productions Team
      `
    };

    await transporter.sendMail(customerMailOptions);

    res.json({
      success: true,
      message: 'Your inquiry has been submitted successfully! We will contact you within 24 hours.'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error submitting your inquiry. Please try again or contact us directly.'
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter-subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Email content for confirmation
    const emailContent = `
Thank you for subscribing to Project Party Productions Newsletter!

We're excited to have you join our community! You'll now receive:

• Latest news and updates about our services
• Special offers and promotions
• Event inspiration and tips
• Behind-the-scenes content from our team

Stay tuned for amazing content coming your way!

Best regards,
The Project Party Productions Team

---
If you no longer wish to receive these emails, please contact us at info@projectpartyproductions.com
    `;

    // Email options for subscriber
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to Project Party Productions Newsletter!',
      text: emailContent
    };

    // Send confirmation email
    await transporter.sendMail(mailOptions);

    // Optional: Send notification to admin about new subscriber
    const adminNotification = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'New Newsletter Subscription',
      text: `New newsletter subscription from: ${email}`
    };

    await transporter.sendMail(adminNotification);

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error subscribing to our newsletter. Please try again.'
    });
  }
});

// Password reset code endpoint
app.post('/api/send-reset-code', async (req, res) => {
  try {
    const { email, code } = req.body;

    // Validate email domain
    if (!email.endsWith('@projectpartyproductions.com')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email domain'
      });
    }

    // Email content
    const emailContent = `
Password Reset Request - Project Party Productions Admin

You have requested to reset your admin password.

Your verification code is: ${code}

This code will expire in 10 minutes.

If you did not request this password reset, please ignore this email.

---
Project Party Productions Admin System
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Admin Password Reset - Verification Code',
      text: emailContent
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Verification code sent successfully'
    });

  } catch (error) {
    console.error('Error sending reset code:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send verification code'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});
// Get availability
app.get('/api/availability', (req, res) => {
  res.json(availability);
});

// Update availability
app.post('/api/availability', (req, res) => {
  const { unavailableDates, message } = req.body;
  availability = { unavailableDates, message };
  res.json({ success: true, availability });
});

const PORT = process.env.PORT || 4180;
app.listen(PORT, () => {
  console.log(`✅ API listening on :${PORT}`);
});

