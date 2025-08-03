import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from './supabase/supabase'
import {NextRequest} from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface AuthUser {
    id: string
    email: string
    firstName: string
    lastName: string
    emailVerified: boolean
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

        const { data: user, error } = await supabase
            .from('users')
            .select('id, email, first_name, last_name, email_verified, is_active')
            .eq('id', decoded.userId)
            .eq('is_active', true)
            .single()

        if (error || !user) return null

        return {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            emailVerified: user.email_verified
        }
    } catch (err) {
        return null
    }
}

export async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
    const token = req.cookies?.accessToken
    if (!token) return null
    return await verifyToken(token)
}

// 🛡️ Route guard for /pages/api routes
export function requireAuth(handler: (req: NextApiRequest, res: NextApiResponse) => any) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const user = await getAuthUser(req)
        if (!user) {
            return res.status(401).json({ error: 'Authentication required' })
        }

        // @ts-ignore
        req.user = user
        return handler(req, res)
    }
}
