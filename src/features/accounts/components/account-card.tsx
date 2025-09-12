import { cn } from "@/lib/utils";
import { Account } from "@/types/api"
import { useState } from "react";

export const AccountCard = ({
    account,
    onToggle
}: {
    account: Account,
    onToggle?: (id: string | number, active: boolean) => void
}) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        const newActive = !active;
        setActive(newActive);
        onToggle?.(account.id, newActive);
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "w-full text-left px-4 py-2 rounded-xl border transition",
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            )}

        >
            <div className="flex flex-col items-start">
                <span
                    className={cn("text-sm", {
                        "text-primary-foreground/80": active,
                        "text-muted-foreground": !active,
                    })}

                >
                    {account.name}
                </span>
                <span className="font-semibold">
                    {new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                    }).format(Number(account.balance))}
                </span>
            </div>
        </button>
    );
}