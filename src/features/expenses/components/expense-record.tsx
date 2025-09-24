import { getCategoryIcon } from "@/features/categories/components/get-category-icon"
import { Expense } from "@/types/api"
import { formatDate } from "date-fns";
import { UpdateExpense } from "./update-expense";
import { cn } from "@/lib/utils";

export const ExpenseRecord = ({
    expense
}: {
    expense: Expense
}) => {
    return (
        <div className="flex items-start justify-between w-full p-4 rounded-lg bg-card">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-full text-primary-foreground">
                    {getCategoryIcon({ categoryName: expense.category ? expense.category.name : "" })}
                </div>
                <div className="flex flex-col">
                    <UpdateExpense
                        expense={expense}
                        trigger={
                            <button
                                type="button"
                                className="w-fit text-left text-sm font-medium text-secondary-foreground underline-offset-4 hover:underline transition-colors"
                            >
                                {expense.name}
                            </button>
                        }
                    />
                    <span className="text-xs text-secondary-foreground">{expense.account.name}</span>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className={cn(
                    Number(expense.amount) > 0 ? "text-constructive" : "",
                    "font-semibold text-sm"
                )}>
                    {new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                        signDisplay: "always"
                    }).format(Number(expense.amount))}
                </span>
                <span className="text-xs text-secondary-foreground">
                    {formatDate(new Date(expense.date), "d MMM")}
                </span>
            </div>
        </div>
    )
}