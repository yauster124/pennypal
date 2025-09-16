"use client"

import { Spinner } from "@/components/ui/spinner";
import { useGetExpenses } from "../api/get-expenses";
import { ArchiveX } from "lucide-react";
import { ExpenseRecord } from "./expense-record";
import { useCallback, useRef } from "react";
import { groupByMonth } from "@/lib/utils";

export const ExpensesList = () => {
    const expensesQuery = useGetExpenses();

    const expenses = expensesQuery.data?.pages.flatMap((page) => page.content);
    const groupedExpenses = groupByMonth(expenses || []);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastExpenseRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (expensesQuery.isFetchingNextPage) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && expensesQuery.hasNextPage) {
                    expensesQuery.fetchNextPage();
                }
            });

            if (node) observer.current.observe(node);
        },
        [expensesQuery.isFetchingNextPage, expensesQuery.hasNextPage, expensesQuery.fetchNextPage]
    );

    if (expensesQuery.isLoading) {
        return (
            <div className="flex h-48 w-full items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    if (!expenses?.length) {
        return (
            <div
                role="list"
                aria-label="expenses"
                className="flex h-40 flex-col items-center justify-center bg-white text-gray-500"
            >
                <ArchiveX className="size-10" />
                <h4>No expenses found</h4>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {Object.entries(groupedExpenses).map(([month, expenses]) => (
                <div key={month}>
                    <h3 className="text-sm text-muted-foreground font-semibold mb-2">{month}</h3>
                    <div className="flex flex-col rounded-lg bg-card">
                        {expenses.map(exp => (
                            <ExpenseRecord key={exp.id} expense={exp} />
                        ))}
                    </div>
                </div>
            ))}
            {expensesQuery.isFetchingNextPage && (
                <div className="flex w-full justify-center py-4">
                    <Spinner size="sm" />
                </div>
            )}
        </div>
    )
}