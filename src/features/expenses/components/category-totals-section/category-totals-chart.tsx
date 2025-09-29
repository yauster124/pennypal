import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Label, Pie, PieChart } from "recharts";
import { CategoryTotalsChartLabel } from "./category-totals-chart-label";
import { chartColours } from "@/lib/generate-chart-config";

export type CategoryTotalsChartData = {
    category: string;
    amount: string;
}
const generateChartConfig = (
    data: CategoryTotalsChartData[]
): ChartConfig => {
    if (!data) {
        return {};
    }

    return data.reduce((acc, item, idx) => {
        const key = String(item.category);
        acc[key] = {
            label: key,
            color: chartColours[idx % chartColours.length]
        }

        return acc;
    }, {} as ChartConfig)
}

export const CategoryTotalChart = ({
    chartData,
    expenseTotal
}: {
    chartData: CategoryTotalsChartData[],
    expenseTotal: number
}) => {
    const chartConfig = generateChartConfig(chartData);

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