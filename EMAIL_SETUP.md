# Email Notification System Setup Guide

## Overview

This guide explains how to configure and use the email notification system for course bookings in the SchermBlij website. The system automatically sends confirmation emails to customers and notification emails to administrators when a course booking is submitted.

## Features

### 🔄 Automatic Email Notifications
- **Customer Confirmation Email**: Sent immediately after booking submission
- **Admin Notification Email**: Sent to administrators for follow-up action
- **Professional Dutch Templates**: Branded emails in Dutch language
- **Error Handling**: Robust error handling to prevent booking failures

### 📧 Email Templates

#### Customer Confirmation Email
- Professional branded layout
- Course and session details
- List of registered children
- Clear next steps and expectations
- Contact information

#### Admin Notification Email  
- Urgent notification styling
- Complete customer contact details
- Booking details and preferences
- Action checklist for follow-up
- Direct links to admin panel

## Setup Instructions

### 1. Environment Configuration

Copy the example environment file and configure your email settings:

```bash
cp .env.example .env.local
```

Configure the following email environment variables in `.env.local`:

```bash
# Required Email Settings
EMAIL_HOST=smtp.gmail.com              # Your SMTP server
EMAIL_PORT=587                         # SMTP port (587 for TLS, 465 for SSL)
EMAIL_SECURE=false                     # true for port 465, false for others
EMAIL_USER=your-email@gmail.com        # SMTP username
EMAIL_PASS=your-app-password           # SMTP password
EMAIL_FROM=info@schermblij.nl          # From address for emails
ADMIN_EMAIL=info@schermblij.nl         # Admin email for notifications
```

### 2. Email Provider Setup

#### Gmail Configuration
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password as `EMAIL_PASS`

```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

#### Outlook/Hotmail Configuration
```bash
EMAIL_HOST=smtp.live.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

#### Professional Email Providers
For production environments, consider using professional email services:

**SendGrid**:
```bash
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

**Mailgun**:
```bash
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-username
EMAIL_PASS=your-mailgun-password
```

### 3. Testing Email Configuration

You can test the email configuration by submitting a test course booking through the website. Check the server logs for any email errors:

```bash
pnpm dev
```

Look for these log messages:
- ✅ `Email sent successfully: [message-id]`
- ✅ `Course booking emails sent successfully for submission [id]`
- ❌ `Failed to send course booking emails: [error]`

## System Architecture

### Email Service (`src/services/email.ts`)
- **EmailService class**: Main service for sending emails
- **Template methods**: Specialized methods for different email types
- **Error handling**: Robust error handling and logging
- **Configuration**: Automatic environment-based configuration

### Integration Points

#### Form Submissions Collection Hook
The email system integrates via a Payload CMS hook in `src/collections/FormSubmissions.ts`:

```typescript
afterChange: [
  async ({ doc, req, operation }) => {
    if (operation === 'create' && doc.form_type === 'enrollment') {
      // Send both customer and admin emails
    }
  }
]
```

#### Course Booking Form
The front-end form (`src/components/CourseBookingForm/index.tsx`) provides user feedback about email delivery.

## Troubleshooting

### Common Issues

#### 1. Authentication Errors
**Error**: `Invalid login: 535-5.7.8 Username and Password not accepted`

**Solutions**:
- For Gmail: Use App Password instead of regular password
- For Outlook: Ensure SMTP authentication is enabled
- Check username/password are correct

#### 2. Connection Errors  
**Error**: `Connection timeout` or `ENOTFOUND`

**Solutions**:
- Check `EMAIL_HOST` is correct
- Verify `EMAIL_PORT` matches your provider
- Check firewall settings
- Ensure `EMAIL_SECURE` setting matches port (true for 465, false for 587)

#### 3. Emails Not Received
**Possible Causes**:
- Check spam/junk folders
- Verify `EMAIL_FROM` address is valid
- Check email provider limits
- Review server logs for sending confirmation

### Debugging

Enable verbose logging by adding debug output to your email service:

```bash
# In development, check console logs
pnpm dev
```

### Production Considerations

#### 1. Environment Variables
Ensure production environment has all required email variables:
```bash
EMAIL_HOST=your-production-smtp-host
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-password
EMAIL_FROM=info@schermblij.nl
ADMIN_EMAIL=info@schermblij.nl
```

#### 2. Email Delivery Monitoring
- Monitor server logs for email failures
- Set up alerts for email delivery issues
- Consider using email service with delivery tracking

#### 3. Performance
- Email sending is asynchronous and won't block form submission
- Failed emails are logged but don't prevent booking creation
- Consider implementing retry logic for production

## Security Best Practices

1. **Never commit email credentials** to version control
2. **Use App Passwords** for Gmail and similar providers
3. **Restrict SMTP access** to your server's IP if possible
4. **Monitor email logs** for suspicious activity
5. **Use secure connections** (TLS/SSL) when available

## Email Content Customization

### Modifying Email Templates

Email templates are defined in `src/services/email.ts`. To customize:

1. Update the HTML template in `sendCustomerConfirmation()` or `sendAdminNotification()`
2. Update the corresponding text version
3. Test changes in development environment

### Adding New Email Types

To add new email notifications:

1. Create a new method in the `EmailService` class
2. Add the necessary hook in the appropriate collection
3. Update environment documentation

## Maintenance

### Regular Tasks
- **Monitor email delivery rates**
- **Update email templates** as needed  
- **Review and rotate** SMTP credentials periodically
- **Test email functionality** after system updates

### Backup Plans
- Have alternative SMTP provider configured
- Document manual email process for emergencies
- Monitor admin email inbox for booking notifications

## Support

If you encounter issues with the email system:

1. Check this documentation first
2. Review server logs for specific error messages
3. Test with a simple email client using the same SMTP settings
4. Consider using a different email provider temporarily

For SchermBlij-specific questions, contact the development team or update this documentation with new findings.