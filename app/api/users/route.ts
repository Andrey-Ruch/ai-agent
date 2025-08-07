import { requireAuth } from '@/lib/auth/apiAuth'
import connectDB from '@/lib/database/mongodb'
import { NextResponse } from 'next/server'
import User from '@/lib/database/models/User'

// TODO: The function is temporary and for testing! It needs to be changed.
export async function GET(request: Request) {
    const authResult = await requireAuth()

    if (!authResult.isAuthenticated) {
        return authResult.response
    }

    try {
        console.log('[api/users/route.ts] GET request', request)

        await connectDB()
        const users = await User.find()

        return NextResponse.json(users)
    } catch (error) {
        console.error('[api/users/route.ts] Error in GET request', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
