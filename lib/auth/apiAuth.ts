import { auth } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'

export async function requireAuth() {
    const session = await auth()

    if (!session || !session.user) {
        return {
            isAuthenticated: false,
            response: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }),
        }
    }

    return {
        isAuthenticated: true,
        session,
        user: session.user,
    }
}
