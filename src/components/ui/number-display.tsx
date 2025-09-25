import { cn } from "@/lib/utils";

export const NumberDisplay = ({
    amount
}: {
    amount: string
}) => {
    const formattedAmount = Math.abs(Number(amount)).toFixed(2);

    const [pounds, pence] = formattedAmount.split(".");
    const formattedPounds = Number(pounds).toLocaleString("en-GB");

    return (
        <div className={cn(
            Number(amount) > 0 ? "text-constructive" : "",
            "flex items-end"
        )}>
            {Number(amount) > 0 ? "+" : ""}
            £
            <span className="ml-[0.1em] text-xl">
                {formattedPounds}
            </span>
            <span>
                .{pence}
            </span>
        </div>
    )
}