import { Expense } from "@/types/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const groupByMonth = (expenses: Expense[]) => {
  return expenses.reduce((groups, expense) => {
    const month = new Date(expense.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!groups[month]) groups[month] = [];
    groups[month].push(expense);

    return groups;
  }, {} as Record<string, Expense[]>);
};