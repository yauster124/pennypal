"use client";

import { useEffect, useState } from "react";
import { useGetMonthlyIncome, useGetMonthlyTotals } from "../../api/get-monthly-totals";
import { addMonths, format, startOfMonth, subMonths, subYears } from "date-fns";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Loader2Icon } from "lucide-react";
import { MonthlyTotalsChart } from "../monthly-totals-section/monthly-totals-chart";
import { toUTCDateAtMidnight } from "@/lib/utils";

type MonthlyTotalTimeRange = "6m" | "1y" | "5y" | "max";

export const MonthlyIncomeSection = () => {
    const [timeRange, setTimeRange] = useState<MonthlyTotalTimeRange>("6m");
    const [startDate, setStartDate] = useState(() => computeStartDate(timeRange));
    const getMonthlyIncome = useGetMonthlyIncome(
        { startDate: startDate || undefined },
        { placeholderData: (prev) => prev }
    );

    useEffect(() => {
        setStartDate(computeStartDate(timeRange));
    }, [timeRange]);

    return (
        <Card className="@container/card flex-1">
            <CardHeader>
                <CardTitle>Monthly Income</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        {timeRange === "6m" && "Income per month over the last 6 months"}
                        {timeRange === "1y" && "Income per month over the last year"}
                        {timeRange === "5y" && "Income per month over the last 5 years"}
                        {timeRange === "max" && "Income per month since inception"}
                    </span>
                    <span className="@[540px]/card:hidden">
                        {timeRange === "6m" && "Last 6 months"}
                        {timeRange === "1y" && "Last year"}
                        {timeRange === "5y" && "Last 5 years"}
                        {timeRange === "max" && "Since inception"}
                    </span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={(value) => setTimeRange(value as MonthlyTotalTimeRange)}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-6 @[200px]/card:flex"
                    >
                        <ToggleGroupItem value="6m">6M</ToggleGroupItem>
                        <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
                        <ToggleGroupItem value="5y">5Y</ToggleGroupItem>
                        <ToggleGroupItem value="max">Max</ToggleGroupItem>
                    </ToggleGroup>
                </CardAction>
            </CardHeader>
            <CardContent>
                {getMonthlyIncome.data && getMonthlyIncome.data.length > 0 ? (
                    <MonthlyTotalsChart
                        chartData={getMonthlyIncome.data}
                        type="income"
                    />
                ) : getMonthlyIncome.data && getMonthlyIncome.data.length <= 0 ? (
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
        case "6m":
            return format(toStartOfNextMonth(subMonths(today, 6)), "yyyy-MM-dd");
        case "1y":
            return format(toStartOfNextMonth(subYears(today, 1)), "yyyy-MM-dd");
        case "5y":
            return format(toStartOfNextMonth(subYears(today, 5)), "yyyy-MM-dd");
        case "max":
        default:
            return null;
    }
}

const toStartOfNextMonth = (date: Date) =>
    startOfMonth(addMonths(date, 1))