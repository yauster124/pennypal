"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetCategoryTotals } from "../api/get-category-totals";
import { useAccountStore } from "@/features/accounts/store/account-store";
import { CategoryTotalChart } from "./category-total-chart";
import { useState } from "react";
import { format, subMonths, subYears } from "date-fns";
import { buildChartConfig } from "@/lib/generate-chart-config";

export const CategoryTotalsSection = () => {
    const today = new Date()
    const [startDate, setStartDate] = useState(subMonths(today, 1));
    const startDateStr = format(startDate, "yyyy-MM-dd")
    const selectedIds = useAccountStore((s) => s.selectedIds);
    const getCategoryTotals = useGetCategoryTotals({ accountIds: selectedIds, startDate: startDateStr });

    const chartConfig: ChartConfig = buildChartConfig(
        getCategoryTotals.data,
        (entry) => entry.categoryId,
        (entry) => entry.categoryName
    );

    const chartData = getCategoryTotals.data?.map((entry) => {
        return {
            category: String(entry.categoryId),
            amount: entry.totalAmount
        }
    })
    const expenseTotal = chartData?.reduce((acc, curr) => acc + Number(curr.amount), 0)

    const tabs = [
        { value: "1m", label: "1M" },
        { value: "6m", label: "6M" },
        { value: "1y", label: "1Y" },
        { value: "max", label: "Max" },
    ];

    const handleTabChange = (value: string) => {
        switch (value) {
            case "1m":
                setStartDate(subMonths(today, 1))
                break
            case "6m":
                setStartDate(subMonths(today, 6))
                break
            case "1y":
                setStartDate(subYears(today, 1))
                break
            case "max":
                setStartDate(new Date(1970, 0, 1))
                break
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Expenses structure</CardTitle>
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
                        <TabsContent key={tab.value} value={tab.value}>
                            {chartData && chartData.length > 0 ? (
                                <CategoryTotalChart
                                    chartConfig={chartConfig}
                                    chartData={chartData}
                                    expenseTotal={expenseTotal || 0}
                                />
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