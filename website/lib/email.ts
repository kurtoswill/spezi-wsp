import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

export async function sendVerificationEmail(email: string, token: string, firstName: string) {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: email,
        subject: 'Verify your Spezi account',
        html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #232C4F 0%, #6EB1D6 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Spezi</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">AI-Powered Speech Analysis</p>
        </div>
        
        <div style="padding: 40px 30px; background: white;">
          <h2 style="color: #232C4F; margin-bottom: 20px;">Hi ${firstName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            Welcome to Spezi! Please verify your email address to complete your account setup and start analyzing your speech patterns.
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${verificationUrl}" 
               style="background: #232C4F; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #999; font-size: 14px; line-height: 1.5;">
            This link will expire in 24 hours. If you didn't create a Spezi account, you can safely ignore this email.
          </p>
          
          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #6EB1D6; word-break: break-all;">${verificationUrl}</a>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 0;">© 2025 Spezi. All rights reserved.</p>
        </div>
      </div>
    `
    }

    await transporter.sendMail(mailOptions)
}

export async function sendPasswordResetEmail(email: string, token: string, firstName: string) {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`

    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: email,
        subject: 'Reset your Spezi password',
        html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #232C4F 0%, #6EB1D6 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Spezi</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">AI-Powered Speech Analysis</p>
        </div>
        
        <div style="padding: 40px 30px; background: white;">
          <h2 style="color: #232C4F; margin-bottom: 20px;">Hi ${firstName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            We received a request to reset your password for your Spezi account. Click the button below to create a new password.
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${resetUrl}" 
               style="background: #232C4F; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #999; font-size: 14px; line-height: 1.5;">
            This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
          </p>
          
          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #6EB1D6; word-break: break-all;">${resetUrl}</a>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 0;">© 2025 Spezi. All rights reserved.</p>
        </div>
      </div>
    `
    }

    await transporter.sendMail(mailOptions)
}