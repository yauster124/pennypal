"use client"

import { useGetExpenses } from "../api/get-expenses";
import { ArchiveX, Loader2Icon } from "lucide-react";
import { useCallback, useRef } from "react";
import { cn, groupByMonthAndDay } from "@/lib/utils";
import { useSearchFiltersStore } from "../store/search-filters-store";
import { format } from "date-fns";
import { ExpenseListRecord } from "./expense-list-record";
import { Separator } from "@/components/ui/separator";

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
    const groupedExpenses = groupByMonthAndDay(expenses || []);

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
        [expensesQuery]
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
        <>
            {Object.entries(groupedExpenses).map(([month, expensesByDay], index) => (
                <div key={index}>
                    <div className="flex justify-between">
                        <h3 className="text-sm text-muted-foreground font-semibold mb-2 ml-2 mt-2">{month}</h3>
                        <h3 className="text-sm text-muted-foreground font-semibold mb-2 ml-2 mt-2">{expensesByDay.total.toLocaleString("en-GB", {
                            style: "currency",
                            currency: "GBP",
                        })}</h3>
                    </div>
                    <div className="rounded-lg bg-card">
                        {Object.entries(expensesByDay.expenses).map(([day, expenses], index) => (
                            <div key={index} className={cn(
                                "p-4",
                                index < Object.entries(expensesByDay.expenses).length ? "border-b" : ""
                            )}>
                                <div className="flex justify-between">
                                    <h3 className="text-sm text-muted-foreground font-semibold mb-6">{day}</h3>
                                    <h3 className="text-xs text-muted-foreground mb-2 ml-2 mt-2">{expenses.total.toLocaleString("en-GB", {
                                        style: "currency",
                                        currency: "GBP",
                                    })}</h3>
                                </div>
                                <div className="flex flex-col gap-5">
                                    {expenses.expenses.map(exp => (
                                        <ExpenseListRecord
                                            key={exp.id}
                                            expense={exp}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div ref={lastExpenseRef} />
            {expensesQuery.isFetchingNextPage && (
                <div className="flex justify-center">
                    <Loader2Icon className="animate-spin" />
                </div>
            )}
            {!expensesQuery.hasNextPage && (
                <div className="flex justify-center">
                    <span className="text-muted-foreground">
                        No more results
                    </span>
                </div>
            )}
        </>
    )
}