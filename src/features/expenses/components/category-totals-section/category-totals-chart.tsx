import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Label, LegendProps, Pie, PieChart, ResponsiveContainer } from "recharts";
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
        <ChartContainer config={chartConfig} className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
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
                        innerRadius="70%"
                        outerRadius="100%"
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
                        content={
                            <CustomChartLegendContent chartData={chartData} chartConfig={chartConfig} />
                        }
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

const CustomChartLegendContent = ({
    className,
    hideIcon = false,
    payload,
    verticalAlign = "bottom",
    nameKey,
    chartData,
    chartConfig
}: React.ComponentProps<"div"> &
    Pick<LegendProps, "payload" | "verticalAlign"> & {
        hideIcon?: boolean
        nameKey?: string
    } & { chartData: CategoryTotalsChartData[], chartConfig: ChartConfig }) => {
    return (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
            {chartData.map((entry) => {
                const config = chartConfig[entry.category];
                return (
                    <div
                        key={entry.category}
                        className="flex items-center gap-1 text-sm px-2 py-1 rounded-md bg-muted/50"
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: config?.color ?? "#ccc" }}
                        />
                        <span>{entry.category}</span>
                    </div>
                );
            })}
        </div>
    )
}