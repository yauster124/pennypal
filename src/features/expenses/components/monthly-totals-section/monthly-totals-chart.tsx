import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MonthlyTotal } from "../../api/get-monthly-totals"
import { chartColours } from "@/lib/generate-chart-config";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const generateChartConfig = (
    data: MonthlyTotal[]
): ChartConfig => {
    if (!data) {
        return {};
    }

    return data.reduce((acc, item, idx) => {
        const key = String(item.month);
        acc[key] = {
            label: item.month.toLocaleString("en-GB", { month: "short" }),
            color: chartColours[idx % chartColours.length]
        }

        return acc;
    }, {} as ChartConfig)
}

export const MonthlyTotalsChart = ({
    chartData,
    type
}: {
    chartData: MonthlyTotal[]
    type: string
}) => {
    const chartConfig = generateChartConfig(chartData);
    const fill = type === "income" ? "var(--chart-2)" : "var(--chart-7)";

    return (
        <ChartContainer config={chartConfig} className="w-full h-[400px]">
            <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => new Date(value).toLocaleString("en-GB", { month: "short" })}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="total" fill={fill} radius={8} />
            </BarChart>
        </ChartContainer>
    )
}