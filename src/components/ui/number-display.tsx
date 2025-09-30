import { cn } from "@/lib/utils";
import AnimatedNumber from "./animated-number";

export type NumberDisplaySize = "small" | "large";

export const NumberDisplay = ({
    amount,
    variant = "small",
    animate = false,
    dynamicColour = true,
    format = true
}: {
    amount: string
    variant?: NumberDisplaySize,
    animate?: boolean,
    dynamicColour?: boolean,
    format?: boolean
}) => {
    const formattedAmount = Math.abs(Number(amount)).toFixed(2);

    const [pounds, pence] = formattedAmount.split(".");
    const formattedPounds = Number(pounds).toLocaleString("en-GB");

    return (
        <div className={cn(
            Number(amount) > 0 && dynamicColour ? "text-constructive" : "",
            "flex items-end"
        )}>
            <span className={cn(
                "translate-y-[-1px] mr-[1px]",
                variant === "large" && "text-xl"
            )}>
                {format && Number(amount) > 0 ? "+" : ""}
                £
            </span>
            {animate ? (
                <>
                    <AnimatedNumber
                        target={Number(pounds)}
                        format={false}
                        dynamicColour={false}
                        className={cn(
                            "translate-y-[3px]",
                            variant === "small" && "text-3xl",
                            variant === "large" && "text-5xl"
                        )}
                    />
                    <span className="text-xl">.</span>
                    <AnimatedNumber
                        target={Number(pence)}
                        format={false}
                        dynamicColour={false}
                        padZero={true}
                        className={cn(
                            variant === "small" && "text-xl",
                            variant === "large" && "text-3xl"
                        )}
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