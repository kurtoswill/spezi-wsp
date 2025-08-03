import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase/supabase'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { token, password } = body

        if (!token || !password) {
            return NextResponse.json({ error: 'Token and password are required' }, { status: 400 })
        }

        if (password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
        }

        // Verify token
        const { data: resetToken, error: tokenError } = await supabase
            .from('password_reset_tokens')
            .select('*, users(*)')
            .eq('token', token)
            .is('used_at', null)
            .gt('expires_at', new Date().toISOString())
            .single()

        if (tokenError || !resetToken) {
            return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 })
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(password, 12)

        // Update user password
        const { error: updateError } = await supabase
            .from('users')
            .update({
                password_hash: passwordHash,
                updated_at: new Date().toISOString()
            })
            .eq('id', resetToken.user_id)

        if (updateError) {
            return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
        }

        // Mark token as used
        await supabase
            .from('password_reset_tokens')
            .update({ used_at: new Date().toISOString() })
            .eq('id', resetToken.id)

        // Invalidate all user sessions
        await supabase
            .from('user_sessions')
            .update({ is_active: false })
            .eq('user_id', resetToken.user_id)

        // Log security event
        await supabase
            .from('security_events')
            .insert({
                user_id: resetToken.user_id,
                event_type: 'password_reset',
                event_data: {
                    ip_address: req.headers.get('x-forwarded-for'),
                },
                ip_address: req.headers.get('x-forwarded-for'),
                user_agent: req.headers.get('user-agent'),
                severity: 'medium',
            })

        return NextResponse.json({ message: 'Password reset successfully' })

    } catch (error) {
        console.error('Reset password error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
