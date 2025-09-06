import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/services/email'

export async function POST(request: NextRequest) {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Email testing is not available in production' },
        { status: 403 }
      )
    }

    const { email, type } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Test email connection first
    const isConnected = await emailService.verifyConnection()
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Email server connection failed. Check your email configuration.' },
        { status: 500 }
      )
    }

    // Send test email based on type
    if (type === 'customer') {
      await emailService.sendCustomerConfirmation(
        email,
        'Test Klant',
        'Test Cursus: Mediawijsheid voor Kinderen',
        'maandag 15 januari 2024, 10:00-12:00',
        'Online via Zoom',
        [
          { name: 'Emma', age: 6 },
          { name: 'Max', age: 8 }
        ]
      )
    } else if (type === 'admin') {
      await emailService.sendAdminNotification(
        email,
        'Test Klant',
        'test@example.com',
        '06-12345678',
        'Test Cursus: Mediawijsheid voor Kinderen',
        'maandag 15 januari 2024, 10:00-12:00',
        'Online via Zoom',
        [
          { name: 'Emma', age: 6 },
          { name: 'Max', age: 8 }
        ],
        'Dit is een test boeking om het e-mailsysteem te controleren.'
      )
    } else {
      return NextResponse.json(
        { error: 'Invalid email type. Use "customer" or "admin".' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Test ${type} email sent successfully to ${email}`
    })

  } catch (error) {
    console.error('Test email failed:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send test email', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Email testing is not available in production' },
      { status: 403 }
    )
  }

  return NextResponse.json({
    message: 'Email test endpoint is available',
    usage: {
      method: 'POST',
      body: {
        email: 'test@example.com',
        type: 'customer | admin'
      }
    },
    config: {
      EMAIL_HOST: process.env.EMAIL_HOST || 'Not configured',
      EMAIL_PORT: process.env.EMAIL_PORT || 'Not configured',
      EMAIL_FROM: process.env.EMAIL_FROM || 'Not configured',
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'Not configured',
      EMAIL_USER: process.env.EMAIL_USER ? '***configured***' : 'Not configured',
    }
  })
}