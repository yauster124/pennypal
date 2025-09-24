import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { useState, useEffect } from "react";

export default function AnimatedNumber({
    target
}: {
    target: number
}) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(target);
    }, [target]);

    return (
        <NumberFlow
            value={value}
            format={{ style: "currency", currency: "GBP", trailingZeroDisplay: "stripIfInteger", signDisplay: "always" }}
            spinTiming={{ duration: 1000 }}
            className={cn(
                "text-2xl font-semibold",
                value < 0 ? "text-destructive" : "text-constructive"
            )}
        />
    );
}