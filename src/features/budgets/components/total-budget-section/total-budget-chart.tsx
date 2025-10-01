import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
import { TotalBudgetChartLabel } from "./total-budget-chart-label";

type TotalBudgetChartDatum = {
    category: string
    amount: number,
    fill: string
}
export type TotalBudgetChartData = TotalBudgetChartDatum[];

const chartConfig = {
    amount: {
        label: "Amount",
    },
    overall: {
        label: "Overall",
        color: "var(--primary)",
    },
} satisfies ChartConfig

export const TotalBudgetChart = ({
    chartData,
    totalAmount
}: {
    chartData: TotalBudgetChartData,
    totalAmount: number
}) => {
    const endAngle = totalAmount === 0
        ? 0
        : (Number(chartData[0].amount) / totalAmount) * 360;

    return (
        <ChartContainer
            config={chartConfig}
            className="w-full h-[400px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    data={chartData}
                    endAngle={endAngle}
                    innerRadius={120}
                    outerRadius={170}
                >
                    <PolarGrid
                        gridType="circle"
                        radialLines={false}
                        stroke="none"
                        className="first:fill-muted last:fill-background"
                        polarRadius={[130, 110]}
                    />
                    <RadialBar dataKey="amount" background cornerRadius={10} />
                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <TotalBudgetChartLabel
                                            amount={Number(chartData[0].amount)}
                                            viewBox={viewBox}
                                            budget={totalAmount}
                                        />
                                    )
                                }
                            }}
                        />
                    </PolarRadiusAxis>
                </RadialBarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}