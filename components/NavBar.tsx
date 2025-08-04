import { signOut } from '@/lib/auth'
import Link from 'next/link'
import { Session } from 'next-auth'

// Components
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, ChevronDown, LogOut } from 'lucide-react'

// Types
interface MenuItem {
    title: string
    url: string
    description?: string
    icon?: React.ReactNode
    items?: MenuItem[]
}

interface LogoConfig {
    url: string
    src: string
    alt: string
    title: string
}

interface AuthConfig {
    login: {
        title: string
        url: string
    }
}

interface NavbarProps {
    logo?: LogoConfig
    menu?: MenuItem[]
    auth?: AuthConfig
    session?: Session | null
}

// Constants
const DEFAULT_LOGO: LogoConfig = {
    url: '/',
    src: 'logo.svg',
    alt: 'logo',
    title: 'Agatha',
}

const DEFAULT_MENU: MenuItem[] = [
    { title: 'Home', url: '#' },
    { title: 'Pricing', url: '#' },
]

const DEFAULT_AUTH: AuthConfig = {
    login: { title: 'Sign in', url: '/signin' },
}

// Helper function to get user display data
function getUserDisplayData(session: Session | null) {
    const user = session?.user
    return {
        isSignedIn: !!user,
        imageUrl: user?.image || '',
        fullName: user?.name || '',
        email: user?.email || '',
        initials: user?.name ? user.name.charAt(0).toUpperCase() : 'A',
    }
}

// Logo Component
const Logo = ({ logo }: { logo: LogoConfig }) => (
    <Link href={logo.url} className="flex items-center gap-2">
        <img src={logo.src} className="max-h-8" alt={logo.alt} />
        <span className="text-lg font-semibold tracking-tighter text-primary">{logo.title}</span>
    </Link>
)

// User Profile Component
const UserProfile = ({ user }: { user: ReturnType<typeof getUserDisplayData> }) => (
    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer">
        <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.imageUrl} alt={user.fullName} />
            <AvatarFallback className="rounded-lg bg-primary text-white">
                {user.initials}
            </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.fullName}</span>
        </div>
        <ChevronDown className="ml-auto size-4" />
    </div>
)

// User Dropdown Component
const UserDropdown = ({ user }: { user: ReturnType<typeof getUserDisplayData> }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <UserProfile user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.imageUrl} alt={user.fullName} />
                        <AvatarFallback className="rounded-lg">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{user.fullName}</span>
                        <span className="truncate text-xs">{user.email}</span>
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <form
                action={async () => {
                    'use server'
                    await signOut()
                }}>
                <DropdownMenuItem asChild>
                    <button
                        type="submit"
                        className="w-full flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                        <LogOut />
                        Sign out
                    </button>
                </DropdownMenuItem>
            </form>
        </DropdownMenuContent>
    </DropdownMenu>
)

// Auth Section Component
const AuthSection = ({
    user,
    authConfig,
}: {
    user: ReturnType<typeof getUserDisplayData>
    authConfig: AuthConfig
}) => (
    <div className="flex gap-2">
        {user.isSignedIn ? (
            <UserDropdown user={user} />
        ) : (
            <Button asChild variant="outline" className="bg-white">
                <Link href={authConfig.login.url}>{authConfig.login.title}</Link>
            </Button>
        )}
    </div>
)

// Desktop Navigation Component
const DesktopNavigation = ({
    logo,
    menu,
    user,
    authConfig,
}: {
    logo: LogoConfig
    menu: MenuItem[]
    user: ReturnType<typeof getUserDisplayData>
    authConfig: AuthConfig
}) => (
    <nav className="hidden justify-between lg:flex">
        <div className="flex items-center gap-6">
            <Logo logo={logo} />
            <div className="flex items-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        {menu.map((item) => renderMenuItem(item))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
        <AuthSection user={user} authConfig={authConfig} />
    </nav>
)

// Mobile Navigation Component
const MobileNavigation = ({
    logo,
    menu,
    user,
    authConfig,
}: {
    logo: LogoConfig
    menu: MenuItem[]
    user: ReturnType<typeof getUserDisplayData>
    authConfig: AuthConfig
}) => (
    <div className="block lg:hidden">
        <div className="flex items-center justify-between">
            <Logo logo={logo} />
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>
                            <Logo logo={logo} />
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-6 p-4">
                        <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                            {menu.map((item) => renderMobileMenuItem(item))}
                        </Accordion>
                        <div className="flex flex-col gap-3">
                            {user.isSignedIn ? (
                                <form
                                    action={async () => {
                                        'use server'
                                        await signOut()
                                    }}>
                                    <Button type="submit" className="w-full">
                                        <LogOut />
                                        Sign out
                                    </Button>
                                </form>
                            ) : (
                                <Button asChild>
                                    <Link href={authConfig.login.url}>
                                        {authConfig.login.title}
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    </div>
)

// Link to the full code of the component:
// https://www.shadcnblocks.com/block/navbar1
const Navbar = async ({
    logo = DEFAULT_LOGO,
    menu = DEFAULT_MENU,
    auth: authConfig = DEFAULT_AUTH,
    session = null,
}: NavbarProps) => {
    const user = getUserDisplayData(session)

    return (
        <section className="py-4">
            <div className="container">
                <DesktopNavigation logo={logo} menu={menu} user={user} authConfig={authConfig} />
                <MobileNavigation logo={logo} menu={menu} user={user} authConfig={authConfig} />
            </div>
        </section>
    )
}

// Menu rendering functions
const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-80">
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        )
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors">
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    )
}

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        )
    }

    return (
        <Link key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </Link>
    )
}

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <Link
            className="hover:bg-muted hover:text-accent-foreground flex select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
            href={item.url}>
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-muted-foreground text-sm leading-snug">{item.description}</p>
                )}
            </div>
        </Link>
    )
}

export default Navbar
