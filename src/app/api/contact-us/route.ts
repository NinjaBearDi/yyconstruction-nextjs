import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { verifyRecaptcha } from '@/lib/recaptcha'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const recaptchaToken = formData.get('recaptchaToken') as string | null
    const captcha = await verifyRecaptcha(recaptchaToken, 'contact_us_submit')
    if (!captcha.ok) {
      console.warn('Contact Us reCAPTCHA rejected:', captcha.reason)
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 })
    }

    const name = formData.get('contactName') as string
    const email = formData.get('contactEmail') as string
    const phone = formData.get('contactPhone') as string
    const message = formData.get('contactMessage') as string

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const escapeHtml = (s: string) =>
      s.replace(/[&<>"']/g, (c) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c,
      )

    const htmlBody = `
      <h2>New Contact Us Message</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
      </table>
    `

    await transporter.sendMail({
      from: `"Y&Y Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Contact Us - ${name}`,
      html: htmlBody,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact Us email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
