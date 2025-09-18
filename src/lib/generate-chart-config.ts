import { ChartConfig } from "@/components/ui/chart"
import { AccountValuePoint } from "@/types/api";

export const chartColours = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
    "var(--chart-7)",
    "var(--chart-8)",
];

export const buildChartConfig = <T>(
    data: T[] | undefined,
    keySelector: (item: T) => string | number,
    labelSelector: (item: T) => string
): ChartConfig => {
    if (!data) return {}

    return data.reduce((acc, item, idx) => {
        const key = String(keySelector(item))
        acc[key] = {
            label: labelSelector(item),
            color: chartColours[idx % chartColours.length],
        }
        return acc
    }, {} as ChartConfig)
}
