import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { chartColours } from "@/lib/generate-chart-config"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { AccountValueChartData } from "./account-value-types"

const generateChartConfig = (chartData: AccountValueChartData): ChartConfig => {
    return (chartData.length
        ? Object.keys(chartData[0]).filter(k => k !== "date")
        : []
    ).reduce((acc, key, idx) => {
        acc[key] = {
            label: key,
            color: chartColours[idx % chartColours.length],
        }
        return acc
    }, {} as ChartConfig);
}

export const AccountValuesChart = ({
    chartData
}: {
    chartData: AccountValueChartData
}) => {
    const chartConfig = generateChartConfig(chartData);

    return (
        <ChartContainer config={chartConfig} className="min-w-[400px] min-h-[300px]">
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-GB", {
                            month: "short",
                            day: "numeric",
                        });
                    }}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent
                        valueFormatter={(value) => value.toLocaleString("en-GB", {
                            style: "currency",
                            currency: "GBP",
                        })}
                    />}
                />
                {Object.keys(chartConfig).map((account, index) => (
                    <Line
                        key={index}
                        dataKey={account}
                        type="monotone"
                        stroke={chartColours[index % chartColours.length]}
                        strokeWidth={2}
                        dot={false}
                    />
                ))}
            </LineChart>
        </ChartContainer>
    )
}