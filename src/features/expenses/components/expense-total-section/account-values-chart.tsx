import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { chartColours } from "@/lib/generate-chart-config"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { AccountValueChartData } from "./account-value-types"

export const AccountValuesChart = ({
    chartConfig,
    chartData
}: {
    chartConfig: ChartConfig,
    chartData: AccountValueChartData
}) => {
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
                    interval="preserveStartEnd"
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