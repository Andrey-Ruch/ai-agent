import { redirect } from 'next/navigation'
import { signIn, auth, providerMap } from '@/lib/auth'
// import { AuthError } from 'next-auth'
import Image from 'next/image'

// UI Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// const SIGNIN_ERROR_URL = '/error'

const providerIcons: Record<string, string> = {
    google: 'https://authjs.dev/img/providers/google.svg',
}

export default async function SignInPage(props: {
    searchParams: { callbackUrl: string | undefined; error?: string }
}) {
    const session = await auth()

    console.log('[Signin page] session', session)

    if (session) {
        redirect('/dashboard')
    }

    const searchParams = await props.searchParams

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className="flex flex-col gap-6">
                    {/* {Object.values(providerMap).map((provider) => (
                        <form
                            key={provider.id}
                            action={async () => {
                                'use server'
                                try {
                                    await signIn(provider.id, {
                                        redirectTo: searchParams?.callbackUrl ?? '',
                                    })
                                } catch (error) {
                                    // Signin can fail for a number of reasons, such as the user
                                    // not existing, or the user not having the correct role.
                                    // In some cases, you may want to redirect to a custom error
                                    if (error instanceof AuthError) {
                                        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                                    }

                                    // Otherwise if a redirects happens Next.js can handle it
                                    // so you can just re-thrown the error and let Next.js handle it.
                                    // Docs:
                                    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                                    throw error
                                }
                            }}>
                            <button type="submit">
                                <span>Sign in with {provider.name}</span>
                            </button>
                        </form>
                    ))} */}

                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl text-main font-semibold">Welcome to Agatha</CardTitle>
                            <CardDescription>Continue with your account</CardDescription>

                            {searchParams.error && (
                                <p className="text-sm text-red-500">
                                    {searchParams.error === 'OAuthSignin'
                                        ? 'Error signing in'
                                        : searchParams.error}
                                </p>
                            )}
                        </CardHeader>

                        <CardContent>
                            <div className="grid gap-2">
                                {Object.values(providerMap)
                                    .filter((provider) => provider.id !== 'resend')
                                    .map((provider) => (
                                        <form
                                            key={provider.id}
                                            action={async () => {
                                                'use server'
                                                try {
                                                    await signIn(provider.id, {
                                                        redirectTo: searchParams.callbackUrl ?? '/dashboard',
                                                    })
                                                } catch (error) {
                                                    // Signin can fail for a number of reasons, such as the user
                                                    // not existing, or the user not having the correct role.
                                                    // In some cases, you may want to redirect to a custom error
                                                    // if (error instanceof AuthError) {
                                                    //     return redirect(
                                                    //         `${SIGNIN_ERROR_URL}?error=${error.type}`
                                                    //     )
                                                    // }

                                                    // Docs:
                                                    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                                                    throw error
                                                }
                                            }}>
                                            <Button
                                                type="submit"
                                                variant="outline"
                                                size="lg"
                                                className="w-full bg-white text-main text-base cursor-pointer hover:text-main">
                                                {providerIcons[provider.id.toLowerCase()] && (
                                                    <Image
                                                        src={
                                                            providerIcons[provider.id.toLowerCase()]
                                                        }
                                                        alt={provider.name}
                                                        width={16}
                                                        height={16}
                                                    />
                                                )}
                                                {provider.name}
                                            </Button>
                                        </form>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-balance text-center text-xs text-muted-foreground">
                        By signing in, you agree to our{' '}
                        <a href="#" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </a>
                        .
                    </div>
                </div>
            </div>
        </div>
    )
}
