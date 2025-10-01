import { cn } from "@/lib/utils";
import NumberFlow, { Format } from "@number-flow/react";
import { useState, useEffect } from "react";

export default function AnimatedNumber({
    target,
    className,
    format = true,
    dynamicColour = true,
    padZero = false
}: {
    target: number,
    className?: string,
    format?: boolean,
    dynamicColour?: boolean,
    padZero?: boolean
}) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(target);
    }, [target]);

    const formatterOptions: Format = format
        ? {
            style: "currency",
            currency: "GBP",
            trailingZeroDisplay: "stripIfInteger",
            signDisplay: "always",
        }
        : {}

    if (padZero) {
        formatterOptions.minimumIntegerDigits = 2
    }

    return (
        <NumberFlow
            value={value}
            format={formatterOptions}
            spinTiming={{ duration: 1000 }}
            className={cn(
                "text-2xl font-bold",
                value < 0 && dynamicColour && "text-destructive",
                value > 0 && dynamicColour && "text-constructive",
                className
            )}
        />
    );
}