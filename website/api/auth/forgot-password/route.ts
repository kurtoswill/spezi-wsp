import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = body?.email?.toLowerCase()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if user exists (but don't reveal if they don't for security)
    const { data: user } = await supabase
        .from('users')
        .select('id, first_name')
        .eq('email', email)
        .eq('is_active', true)
        .single()

    // Always return success to prevent email enumeration
    if (user) {
      try {
        // Generate reset token via Supabase stored procedure
        const { data: token, error: tokenError } = await supabase
            .rpc('create_password_reset_token', {
              user_email: email
            })

        if (!token || tokenError) {
          console.error('Token generation error:', tokenError)
        } else {
          await sendPasswordResetEmail(email, token, user.first_name)
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError)
      }
    }

    return NextResponse.json({
      message: 'If an account with that email exists, we\'ve sent a password reset link.'
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
