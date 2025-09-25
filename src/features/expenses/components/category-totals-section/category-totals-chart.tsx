import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Label, Pie, PieChart } from "recharts";
import { CategoryTotalsChartLabel } from "./category-totals-chart-label";

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
                    content={
                        <ChartTooltipContent
                            hideLabel={false}
                            valueFormatter={(value) => value.toLocaleString("en-GB", {
                                style: "currency",
                                currency: "GBP",
                            })}
                        />}
                />
                <Pie
                    data={chartData}
                    dataKey="amount"
                    nameKey="category"
                    innerRadius={90}
                    strokeWidth={5}
                    outerRadius={130}
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
                                    // <text
                                    //     x={viewBox.cx}
                                    //     y={viewBox.cy}
                                    //     textAnchor="middle"
                                    //     dominantBaseline="middle"
                                    // >
                                    //     <tspan
                                    //         x={viewBox.cx}
                                    //         y={viewBox.cy}
                                    //         className="fill-foreground text-2xl font-semibold"
                                    //     >
                                    //         {expenseTotal.toLocaleString("en-GB", {
                                    //             style: "currency",
                                    //             currency: "GBP",
                                    //         })}
                                    //     </tspan>
                                    // </text>
                                    <CategoryTotalsChartLabel amount={expenseTotal} viewBox={viewBox} />
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