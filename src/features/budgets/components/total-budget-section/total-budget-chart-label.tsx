import { PolarViewBox } from "recharts/types/util/types"

export const TotalBudgetChartLabel = ({
    amount,
    budget,
    viewBox
}: {
    amount: number,
    budget: number,
    viewBox: PolarViewBox
}) => {
    const formattedAmount = Math.abs(amount).toFixed(2);

    const [pounds, pence] = formattedAmount.split(".");
    const formattedPounds = Number(pounds).toLocaleString("en-GB");

    return (
        <text
            x={viewBox.cx}
            y={viewBox.cy}
            textAnchor="middle"
            dominantBaseline="middle"
        >
            <tspan className="text-xl fill-foreground">£</tspan>
            <tspan dy="-0.1em" dx="0.1em" className="font-bold text-3xl fill-foreground">{formattedPounds}</tspan>
            <tspan dy="0.15em" className="font-bold text-xl fill-foreground">.{pence}</tspan>
            <tspan
                x={viewBox.cx}
                y={(viewBox.cy || 0) + 24}
                className="fill-muted-foreground"
            >
                £{(budget - amount).toFixed(2)} remaining
            </tspan>
        </text>
    )
}