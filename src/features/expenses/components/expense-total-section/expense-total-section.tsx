"use client"

import AnimatedNumber from "@/components/ui/animated-number"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetTotal } from "../../api/get-total"
import { useAccountStore } from "@/features/accounts/store/account-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { format, subMonths, subYears } from "date-fns";
import { useGetAccountValues } from "@/features/accounts/api/get-account-values";
import { chartColours } from "@/lib/generate-chart-config";
import { AccountValuesChart } from "./account-values-chart";
import { ChartConfig } from "@/components/ui/chart";
import { Loader2Icon } from "lucide-react";
import { NumberDisplay } from "@/components/ui/number-display";

export const ExpenseTotalSection = () => {
    const selectedIds = useAccountStore((s) => s.selectedIds);
    const today = new Date();
    const [startDate, setStartDate] = useState<Date | null>(subMonths(today, 1));
    const startDateStr = startDate ? format(startDate, "yyyy-MM-dd") : undefined;

    const getTotalQuery = useGetTotal({
        accountIds: selectedIds,
        startDate: startDateStr,
        endDate: format(today, "yyyy-MM-dd"),
    });

    const getAccountValues = useGetAccountValues({ startDate: startDateStr });
    const chartData = getAccountValues.data;
    const chartConfig: ChartConfig = (getAccountValues.data?.length
        ? Object.keys(getAccountValues.data[0]).filter(k => k !== "date")
        : []
    ).reduce((acc, key, idx) => {
        acc[key] = {
            label: key,
            color: chartColours[idx % chartColours.length],
        }
        return acc
    }, {} as ChartConfig);

    const tabs = [
        { value: "1m", label: "1M" },
        { value: "6m", label: "6M" },
        { value: "1y", label: "1Y" },
        { value: "max", label: "Max" },
    ];

    const handleTabChange = (value: string) => {
        switch (value) {
            case "1m":
                setStartDate(subMonths(today, 1));
                break;
            case "6m":
                setStartDate(subMonths(today, 6));
                break;
            case "1y":
                setStartDate(subYears(today, 1));
                break;
            case "max":
                setStartDate(null);
                break;
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Total growth</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="1m" onValueChange={handleTabChange}>
                    <TabsList>
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value}>
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {tabs.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value} className="min-h-[400px]">
                            {getTotalQuery.isPending ? (
                                <div className="flex justify-center">
                                    <Loader2Icon className="animate-spin" />
                                </div>
                            ) : getTotalQuery.isSuccess && getTotalQuery.data ? (
                                <div className="flex flex-col justify-center">
                                    <div className="flex justify-center">
                                        {/* <AnimatedNumber target={Number(getTotalQuery.data.total)} /> */}
                                        <NumberDisplay amount={getTotalQuery.data.total} variant="large" animate={true} />
                                    </div>
                                    <AccountValuesChart chartConfig={chartConfig} chartData={chartData || []} />
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <span className="text-sm text-muted-foreground">Nothing to show</span>
                                </div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}