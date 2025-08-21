import mongoose from 'mongoose'
import { auth } from '@/lib/auth/auth'
import User from './models/User'
import { isEmpty } from 'lodash'
import { UserData } from '@/interfaces/documents'
const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const options = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn
}
async function getUser() {
    await connectDB()

    try {
        const session = await auth()

        let usrData = null
        if (session?.user) {
            const usr = session.user
            usrData = await User.findOne({ email: usr.email }).lean()
            if (isEmpty(usrData)) {
                return { user: {} }
            }
            // logToFile('User: ' + JSON.stringify(usrData), logType.info)
            return { user: usrData }
        } else {
            return { user: {} }
        }
    } catch (error) {
        console.error('Error fetching user:', error)
        return { user: {} }
    }
}
async function updateUser(user: UserData) {
    await connectDB()
    try {
        const session = await auth()
        let usrData = null
        if (session?.user) {
            const usr = session.user
            usrData = await User.findOne({ email: usr.email })
            if (isEmpty(usrData)) {
                // logToFile('User not found: ' + usr.email, logType.error)
                usrData = User.create({
                    name: user.name || usr.name,
                    email: usr.email,
                    icon: user.icon,
                    language: user.language,
                    phone: user.phone,
                    gender: user.gender,
                    status: 'active',
                    subscription: 'free',
                    assistant: user.assistant || 'Emma',
                })

            } else {
                usrData.name = user.name
                usrData.icon = user.icon
                usrData.language = user.language
                usrData.auth = user.auth
                usrData.phone = user.phone
                usrData.nickName = user.nickName
                usrData.gender = user.gender
                usrData.status = user.status
                usrData.assistant = user.assistant || 'Emma'
                // usrData.subscription = user.subscription;
                usrData.save();
                console.log("User updated:", usrData);

            }
        }
        // logToFile('User updated: ' + JSON.stringify(usrData), logType.debug)
    } catch (error) {
        console.error('Error updating user:', error)
        throw error
    }
}
export default connectDB
export { getUser, updateUser }