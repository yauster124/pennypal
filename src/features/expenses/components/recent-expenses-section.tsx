"use client"

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { CreateExpense } from "./add-expense";
import { useGetRecentExpenses } from "../api/get-recent-expenses";
import { useAccountStore } from "@/features/accounts/store/account-store";
import { ExpenseRecord } from "./expense-record";
import Link from "next/link";

export const RecentExpensesSection = () => {
    const selectedIds = useAccountStore((s) => s.selectedIds);
    const getRecentExpenses = useGetRecentExpenses({ accountIds: selectedIds });

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Recent expenses</CardTitle>
                <span className="text-muted-foreground text-sm">Last 30 days</span>
                <CardAction>
                    <Button variant="link">
                        <Link href="/dashboard/expenses">Show more</Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col">
                    {getRecentExpenses.data?.map((expense) => {
                        return (
                            <ExpenseRecord key={expense.id} expense={expense} />
                        )
                    })}
                    <CreateExpense
                        trigger={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-full"
                            >
                                <PlusIcon />
                                <span className="font-normal text-muted-foreground">Add another expense</span>
                            </Button>
                        }
                    />
                </div>
            </CardContent>
        </Card>
    );
}