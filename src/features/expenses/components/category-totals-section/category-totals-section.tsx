"use client"

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCategoryTotals } from "../../api/get-category-totals";
import { useAccountStore } from "@/features/accounts/store/account-store";
import { CategoryTotalChart, CategoryTotalsChartData } from "./category-totals-chart";
import { useEffect, useState } from "react";
import { format, subMonths, subYears } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type CategoryTotalTimeRange = "1m" | "6m" | "1y" | "max";

export const CategoryTotalsSection = () => {
    const selectedIds = useAccountStore((s) => s.selectedIds);
    const [timeRange, setTimeRange] = useState<CategoryTotalTimeRange>("1m");
    const [startDate, setStartDate] = useState(() => computeStartDate(timeRange));
    const getCategoryTotals = useGetCategoryTotals(
        { accountIds: selectedIds, startDate: startDate || undefined },
        { placeholderData: (prev) => prev }
    );
    const chartData = getCategoryTotals.data?.map((entry) => {
        return {
            category: String(entry.categoryName),
            amount: entry.totalAmount
        }
    }) as CategoryTotalsChartData[];
    const expenseTotal = chartData?.reduce((acc, curr) => acc + Number(curr.amount), 0).toFixed(2);

    useEffect(() => {
        setStartDate(computeStartDate(timeRange));
    }, [timeRange]);

    return (
        <Card className="@container/card flex-1">
            <CardHeader>
                <CardTitle>Expense Structure</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        {timeRange === "1m" && "Totals per category over the last month"}
                        {timeRange === "6m" && "Totals per category over the last 6 months"}
                        {timeRange === "1y" && "Totals per category over the last year"}
                        {timeRange === "max" && "Totals per category since inception"}
                    </span>
                    <span className="@[540px]/card:hidden">
                        {timeRange === "1m" && "Last month"}
                        {timeRange === "6m" && "Last 6 months"}
                        {timeRange === "1y" && "Last year"}
                        {timeRange === "max" && "Since inception"}
                    </span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={(value) => setTimeRange(value as CategoryTotalTimeRange)}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-6 @[200px]/card:flex"
                    >
                        <ToggleGroupItem value="1m">1M</ToggleGroupItem>
                        <ToggleGroupItem value="6m">6M</ToggleGroupItem>
                        <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
                        <ToggleGroupItem value="max">Max</ToggleGroupItem>
                    </ToggleGroup>
                </CardAction>
            </CardHeader>
            <CardContent>
                {getCategoryTotals.data && getCategoryTotals.data.length > 0 ? (
                    <CategoryTotalChart
                        chartData={chartData}
                        expenseTotal={Number(expenseTotal) || 0}
                    />
                ) : getCategoryTotals.data && getCategoryTotals.data.length <= 0 ? (
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-sm text-muted-foreground">Nothing to show</span>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Loader2Icon className="animate-spin" />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

const computeStartDate = (timeRange: string) => {
    const today = new Date();

    switch (timeRange) {
        case "1m":
            return format(subMonths(today, 1), "yyyy-MM-dd");
        case "6m":
            return format(subMonths(today, 6), "yyyy-MM-dd");
        case "1y":
            return format(subYears(today, 1), "yyyy-MM-dd");
        case "max":
        default:
            return null;
    }
}