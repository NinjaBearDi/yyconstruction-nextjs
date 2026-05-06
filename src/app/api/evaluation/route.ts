import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const personTitle = formData.get('personTitle') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const wechat = formData.get('wechat') as string
    const projectType = formData.get('projectType') as string
    const startDate = formData.get('startDate') as string
    const contactMethods = formData.getAll('contactMethods') as string[]
    const address = formData.get('address') as string
    const description = formData.get('description') as string

    if (!firstName || !lastName || !email || !phone || !projectType || !address || !description) {
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
      <h2>New Free Evaluation Request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${personTitle} ${firstName} ${lastName}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Wechat</td><td style="padding:8px;border:1px solid #ddd;">${wechat || 'N/A'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Project Type</td><td style="padding:8px;border:1px solid #ddd;">${projectType}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Preferred Start Date</td><td style="padding:8px;border:1px solid #ddd;">${startDate || 'Not specified'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Contact Method</td><td style="padding:8px;border:1px solid #ddd;">${contactMethods.join(', ') || 'Not specified'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Address</td><td style="padding:8px;border:1px solid #ddd;">${address}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Description</td><td style="padding:8px;border:1px solid #ddd;">${description}</td></tr>
      </table>
    `

    const attachments: { filename: string; content: Buffer }[] = []
    const files = formData.getAll('files') as File[]
    for (const file of files) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer())
        attachments.push({ filename: file.name, content: buffer })
      }
    }

    await transporter.sendMail({
      from: `"Y&Y Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Free Evaluation Request - ${firstName} ${lastName} - ${projectType}`,
      html: htmlBody,
      attachments,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Evaluation email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
