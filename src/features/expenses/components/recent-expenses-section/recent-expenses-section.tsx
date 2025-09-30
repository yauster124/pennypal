"use client"

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { CreateExpense } from "../create-expense/create-expense";
import { useGetRecentExpenses } from "../../api/get-recent-expenses";
import { useAccountStore } from "@/features/accounts/store/account-store";
import { ExpenseRecord } from "../expense-record";
import Link from "next/link";
import { ExpenseRecordSkeleton } from "../expense-record-skeleton";

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
                {getRecentExpenses.isPending ? (
                    <div className="flex flex-col">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <ExpenseRecordSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        {getRecentExpenses.data?.map((expense) => {
                            return (
                                <ExpenseRecord key={expense.id} expense={expense} />
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}