import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import Google from 'next-auth/providers/google'
import type { Provider } from 'next-auth/providers'
import client from '@/lib/database/db'
import connectDB from '@/lib/database/mongodb'
import User from '@/models/User'

const providers: Provider[] = [Google]

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === 'function') {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
    })
    .filter((provider) => provider.id !== 'credentials')

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers,
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                // Only create custom user document for OAuth sign-ins
                if (account?.provider === 'google' && user.email) {
                    await connectDB()

                    // Check if custom user already exists
                    const existingUser = await User.findOne({ email: user.email })

                    if (!existingUser) {
                        // Create custom user document with available information
                        const newUser = new User({
                            email: user.email,
                            firstName: profile?.given_name || user.name?.split(' ')[0] || '',
                            lastName:
                                profile?.family_name ||
                                user.name?.split(' ').slice(1).join(' ') ||
                                '',
                            imageUrl: user.image || '',
                            // Set default values for required fields
                            gender: 'other', // You may want to prompt user for this
                            birthDate: new Date('1990-01-01'), // Default date
                            phone: '', // Empty until user provides
                            role: 'user',
                            isActive: true,
                            isVerified: false,
                            isDeleted: false,
                            isBlocked: false,
                        })

                        await newUser.save()
                        console.log(`Created custom user document for: ${user.email}`)
                    }
                }

                return true
            } catch (error) {
                console.error('Error creating custom user document:', error)
                // Return true to allow sign-in to continue even if custom
                return true
            }
        },
    },
    events: {
        async signIn({ user, account, profile, isNewUser }) {
            if (isNewUser) {
                console.log(`New user signed in: ${user.email}`)
                // You could trigger additional actions here like:
                // - Send welcome email
                // - Create default settings
                // - Log analytics event
            }
        },
    },
})
