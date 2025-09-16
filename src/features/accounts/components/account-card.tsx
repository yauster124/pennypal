import { cn } from "@/lib/utils";
import { Account } from "@/types/api";
import { useAccountStore } from "../store/account-store";

export const AccountCard = ({
    account
}: {
    account: Account
}) => {
    const toggle = useAccountStore((s) => s.toggle);
    const isSelected = useAccountStore((s) => s.isSelected);
    const selectedIds = useAccountStore((s) => s.selectedIds);

    const active = isSelected(account.id);

    return (
        <button
            onClick={() => {
                toggle(account.id);
            }}
            className={cn(
                "w-full text-left px-4 py-2 rounded-xl transition",
                active ? "bg-primary border border-primary text-primary-foreground" : "border hover:bg-muted"
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