"use client"

import AnimatedNumber from "@/components/ui/animated-number"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetTotal } from "../api/get-total"
import { useAccountStore } from "@/features/accounts/store/account-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { format, subMonths, subYears } from "date-fns";

export const ExpenseTotalSection = () => {
    const selectedIds = useAccountStore((s) => s.selectedIds);
    const today = new Date()
    const [dateRange, setDateRange] = useState({
        startDate: subMonths(today, 1),
        endDate: today,
    })
    const startDateStr = format(dateRange.startDate, "yyyy-MM-dd")
    const endDateStr = format(dateRange.endDate, "yyyy-MM-dd")

    const getTotalQuery = useGetTotal({
        accountIds: selectedIds,
        startDate: startDateStr,
        endDate: endDateStr,
    })

    const tabs = [
        { value: "1m", label: "1M" },
        { value: "6m", label: "6M" },
        { value: "1y", label: "1Y" },
        { value: "max", label: "Max" },
    ];

    const handleTabChange = (value: string) => {
        switch (value) {
            case "1m":
                setDateRange({ startDate: subMonths(today, 1), endDate: today })
                break
            case "6m":
                setDateRange({ startDate: subMonths(today, 6), endDate: today })
                break
            case "1y":
                setDateRange({ startDate: subYears(today, 1), endDate: today })
                break
            case "max":
                setDateRange({ startDate: new Date(1970, 0, 1), endDate: today })
                break
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
                        <TabsContent key={tab.value} value={tab.value}>
                            <div className="flex justify-center">
                                {getTotalQuery.isSuccess && getTotalQuery.data && (
                                    <AnimatedNumber target={Number(getTotalQuery.data.total)} />
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}