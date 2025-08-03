import { requireAuth } from '@/lib/apiAuth'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

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
