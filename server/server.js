const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

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
Phone: 416-616-1121
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
