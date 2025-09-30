"use client"

import { format, subMonths, subYears } from "date-fns";
import { useEffect, useState } from "react"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AccountValuesChart } from "./account-values-chart";
import { useGetAccountValues } from "@/features/accounts/api/get-account-values";
import { Loader2Icon } from "lucide-react";
import { NumberDisplay } from "@/components/ui/number-display";
import { useGetTotal } from "../../api/get-total";
import { useAccountStore } from "@/features/accounts/store/account-store";

type ExpenseTotalTimeRange = "1m" | "6m" | "1y" | "max";

export const ExpenseTotalSection = () => {
    const [timeRange, setTimeRange] = useState<ExpenseTotalTimeRange>("1m");
    const [startDate, setStartDate] = useState(() => computeStartDate(timeRange));
    const selectedIds = useAccountStore((s) => s.selectedIds);
    const getAccountValues = useGetAccountValues(
        { startDate: startDate || undefined },
        { placeholderData: (prev) => prev }
    );
    const getTotalQuery = useGetTotal(
        {
            accountIds: selectedIds,
            startDate: startDate || undefined,
            endDate: format(new Date(), "yyyy-MM-dd"),
        },
        { placeholderData: (prev) => prev }
    );

    useEffect(() => {
        setStartDate(computeStartDate(timeRange));
    }, [timeRange]);

    return (
        <Card className="@container/card flex-1">
            <CardHeader>
                <CardTitle>Account Growth</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        {timeRange === "1m" && "Account growth over the last month"}
                        {timeRange === "6m" && "Account growth over the last 6 months"}
                        {timeRange === "1y" && "Account growth over the last year"}
                        {timeRange === "max" && "Account growth since inception"}
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
                        onValueChange={(value) => setTimeRange(value as ExpenseTotalTimeRange)}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-6 @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="1m">Last month</ToggleGroupItem>
                        <ToggleGroupItem value="6m">Last 6 months</ToggleGroupItem>
                        <ToggleGroupItem value="1y">Last year</ToggleGroupItem>
                        <ToggleGroupItem value="max">Max</ToggleGroupItem>
                    </ToggleGroup>
                </CardAction>
            </CardHeader>
            <CardContent>
                {getAccountValues.data && getTotalQuery.data ? (
                    <div className="flex flex-col gap-4">
                        <NumberDisplay amount={getTotalQuery.data.total} animate={true} />
                        <AccountValuesChart chartData={getAccountValues.data} />
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