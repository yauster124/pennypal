import { Expense } from "@/types/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const groupByMonth = (expenses: Expense[]) => {
//   return expenses.reduce((groups, expense) => {
//     const today = new Date();
//     const date = new Date(expense.date);
//     const sameYear = date.getFullYear() === today.getFullYear();

//     const day = date.toLocaleString("default", sameYear
//       ? { day: "2-digit", month: "short" }
//       : { day: "2-digit", month: "short", year: "numeric" });

//     if (!groups[day]) groups[day] = [];
//     groups[day].push(expense);

//     return groups;
//   }, {} as Record<string, Expense[]>);
// };

export const groupByMonthAndDay = (expenses: Expense[]) => {
  return expenses.reduce((groups, expense) => {
    const today = new Date();
    const date = new Date(expense.date);
    const sameYear = date.getFullYear() === today.getFullYear();

    // Month string, e.g., "Jan" or "Jan 2025"
    const month = date.toLocaleString("default", sameYear
      ? { month: "long" }
      : { month: "long", year: "numeric" });

    // Day string, e.g., "01" or "01 Jan"
    const day = date.toLocaleString("default", { day: "2-digit", month: "short" });

    // Initialize month group if missing
    if (!groups[month]) groups[month] = {} as Record<string, Expense[]>;

    // Initialize day group if missing
    if (!groups[month][day]) groups[month][day] = [];

    groups[month][day].push(expense);

    return groups;
  }, {} as Record<string, Record<string, Expense[]>>);
};

export const toUTCDateAtMidnight = (date: Date): Date => {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();

  // Construct a UTC date at midnight
  return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
}