import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

export interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export class EmailService {
  private transporter: Transporter | null = null
  private fromAddress: string
  private isConfigured: boolean = false

  constructor() {
    this.fromAddress = process.env.EMAIL_FROM || 'noreply@schermblij.nl'
    
    // Check if email configuration is available
    if (
      process.env.EMAIL_HOST &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS
    ) {
      try {
        // Initialize email configuration from environment variables
        const emailConfig: EmailConfig = {
          host: process.env.EMAIL_HOST,
          port: parseInt(process.env.EMAIL_PORT || '587'),
          secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        }

        // Create reusable transporter object using SMTP
        this.transporter = nodemailer.createTransport({
          host: emailConfig.host,
          port: emailConfig.port,
          secure: emailConfig.secure,
          auth: {
            user: emailConfig.auth.user,
            pass: emailConfig.auth.pass,
          },
        })
        
        this.isConfigured = true
      } catch (error) {
        console.warn('Email service configuration failed:', error)
        this.isConfigured = false
      }
    } else {
      console.warn('Email service not configured. Missing required environment variables.')
      this.isConfigured = false
    }
  }

  /**
   * Send an email
   */
  async sendEmail(
    to: string | string[],
    subject: string,
    html: string,
    text?: string,
    replyTo?: string
  ): Promise<void> {
    if (!this.isConfigured || !this.transporter) {
      console.warn('Email service is not configured. Skipping email send to:', to)
      return
    }

    try {
      const mailOptions = {
        from: this.fromAddress,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        text: text || this.stripHtml(html),
        replyTo: replyTo || this.fromAddress,
      }

      const result = await this.transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', result.messageId)
    } catch (error) {
      console.error('Error sending email:', error)
      throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Send customer confirmation email for course booking
   */
  async sendCustomerConfirmation(
    customerEmail: string,
    customerName: string,
    courseTitle: string,
    sessionDate: string,
    sessionLocation: string,
    children: Array<{ name: string; age: number }>
  ): Promise<void> {
    const childrenList = children
      .map(child => `• ${child.name || 'Naamloos'} (${child.age} jaar)`)
      .join('\n')

    const subject = `Bevestiging cursusboeking: ${courseTitle}`
    
    const html = `
      <!DOCTYPE html>
      <html lang="nl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
          .children-list { background-color: #e7f3ff; padding: 15px; border-radius: 6px; margin: 10px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e5e5; font-size: 14px; color: #666; }
          .logo { max-width: 200px; height: auto; }
          .highlight { color: #2563eb; font-weight: bold; }
          .warning { background-color: #fff3cd; border: 1px solid #ffecb5; color: #856404; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Bedankt voor je boeking!</h1>
          <p>Schermblij - Mediawijs voor kinderen</p>
        </div>
        
        <div class="content">
          <p>Beste ${customerName},</p>
          
          <p>Bedankt voor je interesse in onze cursus! We hebben je boeking ontvangen en zullen binnen 1 werkdag contact met je opnemen om deze te bevestigen.</p>
          
          <div class="info-box">
            <h3>📚 Cursus Details</h3>
            <p><strong>Cursus:</strong> ${courseTitle}</p>
            <p><strong>Datum:</strong> ${sessionDate}</p>
            <p><strong>Locatie:</strong> ${sessionLocation}</p>
          </div>
          
          <div class="info-box">
            <h3>👶 Deelnemende kinderen</h3>
            <div class="children-list">
              <p><strong>Aantal kinderen:</strong> ${children.length}</p>
              <pre>${childrenList}</pre>
            </div>
          </div>
          
          <div class="warning">
            <strong>⏰ Let op:</strong> Deze boeking is nog niet definitief bevestigd. We nemen binnen 1 werkdag contact met je op om de beschikbaarheid te controleren en de boeking te bevestigen.
          </div>
          
          <h3>🔄 Wat gebeurt er nu?</h3>
          <ol>
            <li>We controleren de beschikbaarheid voor de gewenste datum</li>
            <li>Je ontvangt binnen 1 werkdag een telefoontje of e-mail van ons</li>
            <li>We bespreken eventuele praktische zaken</li>
            <li>Je boeking wordt definitief bevestigd</li>
          </ol>
          
          <div class="footer">
            <h4>Contact</h4>
            <p>
              <strong>Schermblij</strong><br>
              Website: <a href="https://schermblij.nl">www.schermblij.nl</a><br>
              E-mail: <a href="mailto:info@schermblij.nl">info@schermblij.nl</a>
            </p>
            
            <p><em>Dit is een automatisch gegenereerde e-mail. Bij vragen kun je contact met ons opnemen via bovenstaande gegevens.</em></p>
          </div>
        </div>
      </body>
      </html>
    `

    const text = `
Bevestiging cursusboeking: ${courseTitle}

Beste ${customerName},

Bedankt voor je interesse in onze cursus! We hebben je boeking ontvangen en zullen binnen 1 werkdag contact met je opnemen om deze te bevestigen.

Cursus Details:
- Cursus: ${courseTitle}
- Datum: ${sessionDate}
- Locatie: ${sessionLocation}

Deelnemende kinderen (${children.length}):
${childrenList}

LET OP: Deze boeking is nog niet definitief bevestigd. We nemen binnen 1 werkdag contact met je op om de beschikbaarheid te controleren en de boeking te bevestigen.

Wat gebeurt er nu?
1. We controleren de beschikbaarheid voor de gewenste datum
2. Je ontvangt binnen 1 werkdag een telefoontje of e-mail van ons
3. We bespreken eventuele praktische zaken
4. Je boeking wordt definitief bevestigd

Contact:
Schermblij
Website: www.schermblij.nl
E-mail: info@schermblij.nl

Dit is een automatisch gegenereerde e-mail. Bij vragen kun je contact met ons opnemen via bovenstaande gegevens.
    `

    await this.sendEmail(customerEmail, subject, html, text)
  }

  /**
   * Send admin notification email for new course booking
   */
  async sendAdminNotification(
    adminEmail: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    courseTitle: string,
    sessionDate: string,
    sessionLocation: string,
    children: Array<{ name: string; age: number }>,
    additionalInfo?: string
  ): Promise<void> {
    const childrenList = children
      .map(child => `• ${child.name || 'Naamloos'} (${child.age} jaar)`)
      .join('\n')

    const subject = `🚨 Nieuwe cursusboeking: ${courseTitle}`
    
    const html = `
      <!DOCTYPE html>
      <html lang="nl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
          .urgent { background-color: #fee2e2; border: 1px solid #fecaca; color: #b91c1c; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center; }
          .contact-box { background-color: #ecfdf5; border: 1px solid #a7f3d0; padding: 15px; border-radius: 6px; margin: 10px 0; }
          .children-list { background-color: #e7f3ff; padding: 15px; border-radius: 6px; margin: 10px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e5e5; font-size: 14px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚨 Nieuwe Cursusboeking</h1>
          <p>Actie vereist binnen 1 werkdag</p>
        </div>
        
        <div class="content">
          <div class="urgent">
            <strong>⚡ ACTIE VEREIST:</strong> Neem binnen 1 werkdag contact op met deze klant om de boeking te bevestigen!
          </div>
          
          <div class="info-box">
            <h3>👤 Klantgegevens</h3>
            <div class="contact-box">
              <p><strong>Naam:</strong> ${customerName}</p>
              <p><strong>E-mail:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
              <p><strong>Telefoon:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></p>
            </div>
          </div>
          
          <div class="info-box">
            <h3>📚 Cursus Details</h3>
            <p><strong>Cursus:</strong> ${courseTitle}</p>
            <p><strong>Gewenste datum:</strong> ${sessionDate}</p>
            <p><strong>Locatie:</strong> ${sessionLocation}</p>
          </div>
          
          <div class="info-box">
            <h3>👶 Deelnemende kinderen</h3>
            <div class="children-list">
              <p><strong>Aantal kinderen:</strong> ${children.length}</p>
              <pre>${childrenList}</pre>
            </div>
          </div>
          
          ${additionalInfo ? `
          <div class="info-box">
            <h3>💬 Aanvullende informatie</h3>
            <p style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; white-space: pre-line;">${additionalInfo}</p>
          </div>
          ` : ''}
          
          <div class="urgent">
            <h3>📋 Checklist voor follow-up:</h3>
            <ul style="text-align: left; display: inline-block;">
              <li>Controleer beschikbaarheid voor gewenste datum</li>
              <li>Bel klant binnen 1 werkdag</li>
              <li>Bevestig praktische details</li>
              <li>Update boekingsstatus in admin panel</li>
              <li>Verstuur definitieve bevestiging</li>
            </ul>
          </div>
          
          <div class="footer">
            <p><strong>Schermblij Admin Notificatie</strong></p>
            <p><em>Deze e-mail is automatisch gegenereerd door het boekingssysteem.</em></p>
            <p>Bekijk de volledige boeking in het <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/form_submissions">admin panel</a>.</p>
          </div>
        </div>
      </body>
      </html>
    `

    const text = `
🚨 NIEUWE CURSUSBOEKING - ACTIE VEREIST

⚡ URGENT: Neem binnen 1 werkdag contact op met deze klant!

Klantgegevens:
- Naam: ${customerName}
- E-mail: ${customerEmail}
- Telefoon: ${customerPhone}

Cursus Details:
- Cursus: ${courseTitle}
- Gewenste datum: ${sessionDate}
- Locatie: ${sessionLocation}

Deelnemende kinderen (${children.length}):
${childrenList}

${additionalInfo ? `Aanvullende informatie:\n${additionalInfo}\n` : ''}

Checklist voor follow-up:
☐ Controleer beschikbaarheid voor gewenste datum
☐ Bel klant binnen 1 werkdag
☐ Bevestig praktische details  
☐ Update boekingsstatus in admin panel
☐ Verstuur definitieve bevestiging

Bekijk de volledige boeking in het admin panel:
${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/form_submissions

Schermblij Admin Notificatie
Deze e-mail is automatisch gegenereerd door het boekingssysteem.
    `

    await this.sendEmail(adminEmail, subject, html, text, customerEmail)
  }

  /**
   * Verify email configuration
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter?.verify()
      console.log('Email server connection verified successfully')
      return true
    } catch (error) {
      console.error('Email server connection failed:', error)
      return false
    }
  }

  /**
   * Simple HTML to text converter
   */
  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim()
  }
}

// Export singleton instance with lazy initialization
let emailServiceInstance: EmailService | null = null

export const getEmailService = (): EmailService => {
  if (!emailServiceInstance) {
    emailServiceInstance = new EmailService()
  }
  return emailServiceInstance
}

// Export for backward compatibility
export const emailService = getEmailService()