import { cn } from "@/lib/utils";
import AnimatedNumber from "./animated-number";

export type NumberDisplaySize = "small" | "large";

export const NumberDisplay = ({
    amount,
    variant = "small",
    animate = false
}: {
    amount: string
    variant?: NumberDisplaySize,
    animate?: boolean
}) => {
    const formattedAmount = Math.abs(Number(amount)).toFixed(2);

    const [pounds, pence] = formattedAmount.split(".");
    const formattedPounds = Number(pounds).toLocaleString("en-GB");

    return (
        <div className={cn(
            Number(amount) > 0 ? "text-constructive" : "",
            "flex items-end"
        )}>
            <span className={cn(variant === "large" && "text-xl")}>
                {Number(amount) > 0 ? "+" : ""}
                £
            </span>
            {animate ? (
                <>
                    <AnimatedNumber
                        target={Number(pounds)}
                        format={false}
                        className="text-3xl translate-y-[4px]"
                    />
                    <span className="text-xl">.</span>
                    <AnimatedNumber
                        target={Number(pence)}
                        format={false}
                        className="text-xl"
                    />
                </>
            ) : (
                <>
                    <span className={
                        cn(
                            "ml-[0.1em] tabular-nums",
                            variant === "small" && "text-xl",
                            variant === "large" && "text-3xl"
                        )}>
                        {formattedPounds}
                    </span>
                    <span className={cn(
                        "tabular-nums",
                        variant === "large" && "text-xl"
                    )}>
                        .{pence}
                    </span>
                </>
            )}
        </div >
    )
}