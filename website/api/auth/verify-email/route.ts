import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json()

        if (!token) {
            return NextResponse.json({ error: 'Verification token is required' }, { status: 400 })
        }

        // Look up token
        const { data: verificationToken, error: tokenError } = await supabase
            .from('email_verification_tokens')
            .select('*, users(*)')
            .eq('token', token)
            .is('used_at', null)
            .gt('expires_at', new Date().toISOString())
            .single()

        if (tokenError || !verificationToken) {
            return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 })
        }

        // Mark user as verified
        const { error: updateError } = await supabase
            .from('users')
            .update({
                email_verified: true,
                updated_at: new Date().toISOString()
            })
            .eq('id', verificationToken.user_id)

        if (updateError) {
            return NextResponse.json({ error: 'Failed to verify email' }, { status: 500 })
        }

        // Mark token as used
        await supabase
            .from('email_verification_tokens')
            .update({ used_at: new Date().toISOString() })
            .eq('id', verificationToken.id)

        return NextResponse.json({ message: 'Email verified successfully' })

    } catch (error) {
        console.error('Email verification error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
