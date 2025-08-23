import { auth } from '@/lib/auth/auth'
import { getUser } from '@/lib/database/mongodb'
import { isEmpty } from 'lodash'
import { UserData } from '@/interfaces/documents'
import AccountTabs from '@/components/account/AccountTabs'
import { Suspense } from 'react'

export default async function AccountPage() {
    const session = await auth()

    async function getUserData(): Promise<UserData> {
        try {
            const user = await getUser()

            const usr = user.user as UserData

            if (session && session.user) {
                usr.email = session.user.email || ''
                if (isEmpty(usr.name)) {
                    usr.name = session.user.name || ''
                }
            }

            return usr
        } catch (error) {
            console.error('Error fetching user data: ' + error)
            return {} as UserData
        }
    }

    return (
        <div className="container max-w-7xl mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl text-main font-bold mt-2 tracking-tight">
                    Account Settings
                </h1>
                {/* <p className="text-gray-600 mt-1">Update your profile information</p> */}
            </div>

            {session && session.user ? (
                <Suspense fallback={<div>Loading account information...</div>}>
                    <AccountFormWrapper getUserData={getUserData} />
                </Suspense>
            ) : (
                <div className="text-center py-8">
                    <p>Please sign in to access your account settings.</p>
                    {/* If we want, we can add a login button here */}
                </div>
            )}
        </div>
    )
}

async function AccountFormWrapper({ getUserData }: { getUserData: () => Promise<UserData> }) {
    const userData = await getUserData()

    return (
        <AccountTabs
            name={userData.name || ''}
            phone={userData.phone || ''}
            language={userData.language || ''}
            gender={userData.gender || ''}
            assistant={userData.assistant || ''}
        />
    )
}
