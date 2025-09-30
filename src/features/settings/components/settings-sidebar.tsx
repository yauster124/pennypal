import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { LucideIcon, PaletteIcon, ShieldIcon, UserRoundIcon } from "lucide-react"
import { useState } from "react";

export const SettingsSidebar = ({
    selected,
    onChange,
}: {
    selected: string;
    onChange: (value: string) => void;
}) => {
    return (
        <Card className="py-0 lg:w-64">
            <CardContent className="p-2">
                <nav className="flex flex-col space-y-0.5 space-x-2 lg:space-x-0">
                    <NavOption
                        label="Profile"
                        icon={UserRoundIcon}
                        value="profile"
                        selected={selected === "profile"}
                        onChange={onChange}
                    />
                    <NavOption
                        label="Account"
                        icon={ShieldIcon}
                        value="account"
                        selected={selected === "account"}
                        onChange={onChange}
                    />
                    <NavOption
                        label="Appearance"
                        icon={PaletteIcon}
                        value="appearance"
                        selected={selected === "appearance"}
                        onChange={onChange}
                    />
                </nav>
            </CardContent>
        </Card>
    )
}

const NavOption = ({
    label,
    icon: Icon,
    value,
    selected,
    onChange,
}: {
    label?: string;
    icon?: LucideIcon;
    value: string;
    selected?: boolean;
    onChange?: (value: string) => void;
}) => {
    return (
        <button
            type="button"
            onClick={() => onChange?.(value)}
            className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[>svg]:px-3 hover:bg-muted justify-start cursor-pointer",
                selected && "bg-accent text-accent-foreground"
            )}
        >
            {Icon && <Icon />}
            {label}
        </button>
    )
}