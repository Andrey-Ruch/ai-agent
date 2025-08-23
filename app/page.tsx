import Link from 'next/link'
import { auth } from '@/lib/auth/auth'
import { getResources } from '@/locales'

// Components
import NavBar from '@/components/navbar/NavBar'
// import { Button } from '@/components/ui/button'

import ResponsiveImg from '@/components/ui/ResponsiveImg'
import BooksRow from '@/components/homePage/BooksRow/BooksRow'
import FeatureCard from '@/components/homePage/FeatureCard'
import AssistantSlider from '@/components/homePage/AssistantSlider'
import Footer from '@/components/homePage/Footer'
import mainImg from '@/public/images/homepage/main.jpg'
// Data
import { booksData } from '@/data/books'
import { assistantsData } from '@/data/assistants'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
    const session = await auth()
    const locale = 'en-US'
    //   let hasbook = false;
    //   if (session && session.user) {
    //     locale = session.user.clientLanguage || "en-US";
    //     if (session.user.bookId) {
    //       hasbook = true;
    //     }

    //   }
    // Get resources for the user's language
    const resources = getResources(locale)

    return (
        <div className="container mx-auto px-4">
            <NavBar session={session} />

            <>
                <div className="container mt-6 mx-auto max-w-6xl px-4" dir={resources.direction}>
                    <div className="flex justify-center mb-6">
                        <ResponsiveImg
                            title="Agata"
                            className="rounded-2xl"
                            mobile={{
                                width: 800,
                                height: 250,
                                src: mainImg,
                            }}
                            desktop={{
                                width: 1200,
                                height: 500,
                                src: mainImg,
                            }}
                        />
                    </div>

                    <div className="text-center">
                        <h1 className="text-balance tracking-tight text-3xl sm:text-6xl font-semibold text-main">
                            {resources.home.title}
                        </h1>

                        <p className="mt-6 px-12 text-pretty max-sm:text-sm font-normal text-main sm:text-xl/8">
                            {resources.home.description}
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-x-6">
                            <Button size="lg" asChild>
                                <Link href="/dashboard/books">{resources.home.buttonText}</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 mb-32">
                        <BooksRow books={booksData} />
                    </div>

                    <div className={resources.direction === 'ltr' ? 'text-left' : 'text-right'}>
                        {resources.homepageCards.cards.map((card, index) => (
                            <FeatureCard
                                key={index}
                                index={index}
                                imgSrc={card.imgSrc}
                                title={card.title}
                                description={card.description}
                            />
                        ))}
                    </div>

                    <div className="text-center mt-32">
                        <AssistantSlider
                            assistants={assistantsData}
                            title={resources.home.assistants}
                        />
                    </div>
                </div>
                <div className="footer">
                    <Footer resources={resources} />
                </div>
            </>
        </div>
    )
}
