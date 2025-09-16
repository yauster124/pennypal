import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Label, Pie, PieChart } from "recharts";
import { CategoryExpenseSummary } from "@/features/expenses/api/get-category-totals"

type ChartData = {
    category: string;
    amount: string;
}

export const CategoryTotalChart = ({
    chartData,
    chartConfig,
    expenseTotal
}: {
    chartData: ChartData[],
    chartConfig: ChartConfig
    expenseTotal: number
}) => {
    return (
        <ChartContainer config={chartConfig}>
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="amount"
                    nameKey="category"
                    innerRadius={70}
                    strokeWidth={5}
                    outerRadius={110}
                >
                    {chartData?.map((entry) => {
                        const config = chartConfig[entry.category]
                        return (
                            <Cell
                                key={`cell-${entry.category}`}
                                fill={config?.color ?? "#ccc"}
                            />
                        )
                    })}
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            £{expenseTotal}
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </Pie>
                <ChartLegend
                    content={<ChartLegendContent nameKey="category" />}
                    verticalAlign="bottom"
                    align="center"
                    layout="horizontal"
                />
            </PieChart>
        </ChartContainer>
    )
}