import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
    const token = (await cookies()).get('accessToken')?.value
    const user = token ? await verifyToken(token) : null

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ user })
}
