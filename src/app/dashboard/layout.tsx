import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // <div className="flex min-h-screen flex-col">
        //     <nav className="sticky top-0 z-50 w-full border-b bg-card">
        //         <div className="flex items-center justify-between px-4 h-14">
        //             <NavigationMenu>
        //                 <NavigationMenuList>
        //                     <NavigationMenuItem>
        //                         <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
        //                             <Link href="/dashboard/home">Home</Link>
        //                         </NavigationMenuLink>
        //                     </NavigationMenuItem>
        //                     <NavigationMenuItem>
        //                         <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
        //                             <Link href="/dashboard/expenses">Expenses</Link>
        //                         </NavigationMenuLink>
        //                     </NavigationMenuItem>
        //                 </NavigationMenuList>
        //             </NavigationMenu>
        //             <DarkModeToggle />
        //         </div>
        //     </nav>

        //     <main className="flex-1 p-4">
        //         {children}
        //     </main>
        // </div>
        <SidebarProvider
            defaultOpen={true}
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <div className="flex flex-1 flex-col">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}