import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
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