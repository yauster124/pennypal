import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BanknoteArrowDownIcon, GaugeIcon, LucideIcon, PiggyBankIcon, PlusCircleIcon } from "lucide-react";

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const navMain = [
        {
            title: "Dashboard",
            url: "/dashboard/home",
            icon: GaugeIcon
        },
        {
            title: "Expenses",
            url: "/dashboard/expenses",
            icon: BanknoteArrowDownIcon
        },
    ]

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <div>
                                <PiggyBankIcon className="!size-5" />
                                <span className="text-base font-semibold">PennyPal</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavHome items={navMain} />
            </SidebarContent>
        </Sidebar>
    )
}

const NavHome = ({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
    }[]
}) => {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton
                            tooltip="Quick Create"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                        >
                            <PlusCircleIcon />
                            <span>Quick Create</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}