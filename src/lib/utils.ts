import { Expense } from "@/types/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const groupByMonthAndDay = (expenses: Expense[]) => {
  return expenses.reduce((groups, expense) => {
    const today = new Date();
    const date = new Date(expense.date);
    const sameYear = date.getFullYear() === today.getFullYear();
    const month = date.toLocaleString("default", sameYear
      ? { month: "long" }
      : { month: "long", year: "numeric" });
    const day = date.toLocaleString("default", { day: "2-digit", month: "short" });

    if (!groups[month]) {
      groups[month] = { total: 0, expenses: {}} as { total: number, expenses: Record<string, {total: number, expenses: Expense[]}>};
    }

    if (!groups[month].expenses[day]) {
      groups[month].expenses[day] = {total: 0, expenses: []}
    }

    groups[month].expenses[day].expenses.push(expense);
    groups[month].total += Number(expense.amount);
    groups[month].expenses[day].total += Number(expense.amount);

    return groups;
  }, {} as Record<string, { total: number, expenses: Record<string, {total: number, expenses: Expense[]}>}>);
};

export const toUTCDateAtMidnight = (date: Date): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
}