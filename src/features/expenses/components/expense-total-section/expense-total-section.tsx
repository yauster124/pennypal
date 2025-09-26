"use client"

import { useAccountStore } from "@/features/accounts/store/account-store";
import { format, subMonths, subYears } from "date-fns";
import { useEffect, useState } from "react"
import { useGetTotal } from "../../api/get-total";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AccountValuesChart } from "./account-values-chart";
import { useGetAccountValues } from "@/features/accounts/api/get-account-values";
import { keepPreviousData } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useGetTotal } from "../../api/get-total"
// import { useAccountStore } from "@/features/accounts/store/account-store";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useState } from "react";
// import { format, subMonths, subYears } from "date-fns";
// import { useGetAccountValues } from "@/features/accounts/api/get-account-values";
// import { chartColours } from "@/lib/generate-chart-config";
// import { AccountValuesChart } from "./account-values-chart";
// import { ChartConfig } from "@/components/ui/chart";
// import { Loader2Icon } from "lucide-react";
// import { NumberDisplay } from "@/components/ui/number-display";

// export const ExpenseTotalSection = () => {
//     const selectedIds = useAccountStore((s) => s.selectedIds);
//     const today = new Date();
//     const [startDate, setStartDate] = useState<Date | null>(subMonths(today, 1));
//     const startDateStr = startDate ? format(startDate, "yyyy-MM-dd") : undefined;

//     const getTotalQuery = useGetTotal({
//         accountIds: selectedIds,
//         startDate: startDateStr,
//         endDate: format(today, "yyyy-MM-dd"),
//     });

//     const getAccountValues = useGetAccountValues({ startDate: startDateStr });
//     const chartData = getAccountValues.data;
//     const chartConfig: ChartConfig = (getAccountValues.data?.length
//         ? Object.keys(getAccountValues.data[0]).filter(k => k !== "date")
//         : []
//     ).reduce((acc, key, idx) => {
//         acc[key] = {
//             label: key,
//             color: chartColours[idx % chartColours.length],
//         }
//         return acc
//     }, {} as ChartConfig);

//     const tabs = [
//         { value: "1m", label: "1M" },
//         { value: "6m", label: "6M" },
//         { value: "1y", label: "1Y" },
//         { value: "max", label: "Max" },
//     ];

//     const handleTabChange = (value: string) => {
//         switch (value) {
//             case "1m":
//                 setStartDate(subMonths(today, 1));
//                 break;
//             case "6m":
//                 setStartDate(subMonths(today, 6));
//                 break;
//             case "1y":
//                 setStartDate(subYears(today, 1));
//                 break;
//             case "max":
//                 setStartDate(null);
//                 break;
//         }
//     }

//     return (
//         <Card className="w-full">
//             <CardHeader>
//                 <CardTitle>Total growth</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <Tabs defaultValue="1m" onValueChange={handleTabChange}>
//                     <TabsList>
//                         {tabs.map((tab) => (
//                             <TabsTrigger key={tab.value} value={tab.value}>
//                                 {tab.label}
//                             </TabsTrigger>
//                         ))}
//                     </TabsList>
//                     {tabs.map((tab) => (
//                         <TabsContent key={tab.value} value={tab.value} className="min-h-[400px]">
//                             {getTotalQuery.isPending ? (
//                                 <div className="flex justify-center">
//                                     <Loader2Icon className="animate-spin" />
//                                 </div>
//                             ) : getTotalQuery.isSuccess && getTotalQuery.data ? (
//                                 <div className="flex flex-col justify-center">
//                                     <div className="flex justify-center">
//                                         {/* <AnimatedNumber target={Number(getTotalQuery.data.total)} /> */}
//                                         <NumberDisplay amount={getTotalQuery.data.total} variant="large" animate={true} />
//                                     </div>
//                                     <AccountValuesChart chartConfig={chartConfig} chartData={chartData || []} />
//                                 </div>
//                             ) : (
//                                 <div className="flex justify-center">
//                                     <span className="text-sm text-muted-foreground">Nothing to show</span>
//                                 </div>
//                             )}
//                         </TabsContent>
//                     ))}
//                 </Tabs>
//             </CardContent>
//         </Card>
//     )
// }

type ExpenseTotalTimeRange = "1m" | "6m" | "1y" | "max";

export const ExpenseTotalSection = () => {
    const [timeRange, setTimeRange] = useState<ExpenseTotalTimeRange>("1m");
    const [startDate, setStartDate] = useState(() => computeStartDate(timeRange));
    const getAccountValues = useGetAccountValues(
        { startDate: startDate || undefined },
        { placeholderData: (prev) => prev }
    );

    useEffect(() => {
        setStartDate(computeStartDate(timeRange));
    }, [timeRange]);

    return (
        <Card className="@container/card">
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
                {getAccountValues.data ? (
                    <AccountValuesChart chartData={getAccountValues.data} />
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