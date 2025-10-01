import { PolarViewBox } from "recharts/types/util/types"

export const CategoryTotalsChartLabel = ({
    amount,
    viewBox
}: {
    amount: number,
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
        </text>
    )
}