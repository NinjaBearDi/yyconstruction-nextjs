import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const position = formData.get('position') as string
    const message = formData.get('message') as string
    const resume = formData.get('resume') as File | null

    if (!firstName || !lastName || !email || !phone) {
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

    const htmlBody = `
      <h2>New Job Application</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${firstName} ${lastName}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Position</td><td style="padding:8px;border:1px solid #ddd;">${position || 'Not specified'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #ddd;">${message || 'No message'}</td></tr>
      </table>
    `

    const attachments: { filename: string; content: Buffer }[] = []
    if (resume && resume.size > 0) {
      const buffer = Buffer.from(await resume.arrayBuffer())
      attachments.push({ filename: resume.name, content: buffer })
    }

    await transporter.sendMail({
      from: `"Y&Y Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Job Application - ${firstName} ${lastName}${position ? ` - ${position}` : ''}`,
      html: htmlBody,
      attachments,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Join Us email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
