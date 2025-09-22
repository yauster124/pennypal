"use client"

import { useGetExpenses } from "../api/get-expenses";
import { ArchiveX, Loader2Icon } from "lucide-react";
import { ExpenseRecord } from "./expense-record";
import { useCallback, useRef } from "react";
import { groupByMonth } from "@/lib/utils";
import { useSearchFiltersStore } from "../store/search-filters-store";
import { format } from "date-fns";

export const ExpensesList = () => {
    const searchQuery = useSearchFiltersStore((s) => s.searchQuery);
    const startDateQuery = useSearchFiltersStore((s) => s.startDate);
    const endDateQuery = useSearchFiltersStore((s) => s.endDate);
    const categoryIdsQuery = useSearchFiltersStore((s) => s.categoryIds);

    const expensesQuery = useGetExpenses({
        searchQuery: searchQuery,
        startDateQuery: startDateQuery ? format(startDateQuery, "yyyy-MM-dd") : undefined,
        endDateQuery: endDateQuery ? format(endDateQuery, "yyyy-MM-dd") : undefined,
        categoryIdsQuery: categoryIdsQuery
    });

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
            <div className="flex justify-center">
                <Loader2Icon className="animate-spin" />
            </div>
        )
    }

    if (!expenses?.length) {
        return (
            <div
                role="list"
                aria-label="expenses"
                className="flex h-40 flex-col items-center justify-center text-muted-foreground"
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
                            <ExpenseRecord
                                key={exp.id}
                                expense={exp}
                            />
                        )
                        )}
                    </div>
                </div>
            ))}
            <div ref={lastExpenseRef} />
            {expensesQuery.isFetchingNextPage && (
                <div className="flex justify-center">
                    <Loader2Icon className="animate-spin" />
                </div>
            )}
        </div>
    )
}