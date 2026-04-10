import nodemailer from 'nodemailer'

export async function POST(request) {
  const { name, email, company, phone, message } = await request.json()

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: 'arbaek@octrtech.com',
    replyTo: email, // 👈 여기 추가
    subject: `Demo Request from ${name} – ${company}`,
    text: `
Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${phone || 'N/A'}
Message: ${message || 'N/A'}
    `.trim(),
    html: `
      <h2>New Demo Request</h2>
      <table>
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Company</strong></td><td>${company}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${phone || 'N/A'}</td></tr>
        <tr><td><strong>Message</strong></td><td>${message || 'N/A'}</td></tr>
      </table>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return Response.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return Response.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}
