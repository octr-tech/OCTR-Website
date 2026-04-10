import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  const { name, email, company, phone, message } = await request.json()

  try {
    await resend.emails.send({
      from: 'OCTR Demo Request <onboarding@resend.dev>',
      to: 'arbaek@octrtech.com',
      replyTo: email,
      subject: `Demo Request from ${name} – ${company}`,
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
    })
    return Response.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return Response.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}
