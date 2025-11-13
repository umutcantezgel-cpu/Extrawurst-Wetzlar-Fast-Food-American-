/**
 * Netlify Contact Form Function - memobaut.com
 * Handles contact form submissions with validation and email notification
 */

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Honeypot check
    if (data.website) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid submission' }),
      };
    }

    // Basic validation
    if (!data.name || !data.email || !data.message || !data.privacy) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    // TODO: Implement email sending (e.g., SendGrid, Mailgun, AWS SES)
    // For now, log the submission
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      timestamp: new Date().toISOString(),
    });

    // Return success
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
      }),
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
