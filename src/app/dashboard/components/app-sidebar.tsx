"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { CreateExpense } from "@/features/expenses/components/create-expense/create-expense";
import { useGetCurrentUser } from "@/features/users/api/get-current-user";
import { useLogout } from "@/lib/auth";
import { User } from "@/types/api";
import { BanknoteArrowDownIcon, CircleUserIcon, EllipsisVerticalIcon, GaugeIcon, LogOutIcon, LucideIcon, PiggyBankIcon, PlusCircleIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const getUser = useGetCurrentUser();
    const user = getUser.data;

    const navHome = [
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
        {
            title: "Budgeting",
            url: "/dashboard/budgeting",
            icon: PiggyBankIcon
        }
    ]

    const navBottom = [
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: SettingsIcon
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
                            <Link href="/dashboard/home">
                                <PiggyBankIcon className="!size-5" />
                                <span className="text-base font-semibold">PennyPal</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavHome items={navHome} />
                <NavBottom items={navBottom} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                {user && (
                    <NavUser
                        user={user}
                    />
                )}
            </SidebarFooter>
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
                        <CreateExpense
                            trigger={
                                <SidebarMenuButton
                                    tooltip="Create expense"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                                >
                                    <PlusCircleIcon />
                                    <span>Create expense</span>
                                </SidebarMenuButton>
                            }
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} asChild>
                                <Link href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

const NavBottom = ({
    items,
    ...props
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
    }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

const NavUser = ({
    user,
}: {
    user: User
}) => {
    const { isMobile } = useSidebar()
    const logout = useLogout();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.profilePictureUrl} alt={user.alias} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.alias}</span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {user.username}
                                </span>
                            </div>
                            <EllipsisVerticalIcon className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.profilePictureUrl} alt={user.alias} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.alias}</span>
                                    <span className="text-muted-foreground truncate text-xs">
                                        {user.username}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <CircleUserIcon />
                                Account
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logout.mutate()}>
                            <LogOutIcon />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}