import { CategoryIcon, getCategoryIcon } from "@/features/categories/components/get-category-icon"
import { Expense } from "@/types/api"
import { UpdateExpense } from "./update-expense/update-expense";
import { NumberDisplay } from "@/components/ui/number-display";

export const ExpenseListRecord = ({
    expense
}: {
    expense: Expense
}) => {
    return (
        <div className="flex items-center justify-between w-full rounded-lg bg-card">
            <div className="flex items-center space-x-3">
                <CategoryIcon category={expense.category} />
                <div className="flex flex-col">
                    <UpdateExpense
                        expense={expense}
                        trigger={
                            <button
                                type="button"
                                className="w-fit text-left text-sm font-semibold text-secondary-foreground underline-offset-4 hover:underline transition-colors"
                            >
                                {expense.name}
                            </button>
                        }
                    />
                    <span className="text-xs text-muted-foreground">{expense.account.name}</span>
                </div>
            </div>
            <div className="flex items-end items-center h-full">
                <NumberDisplay amount={expense.amount} />
            </div>
        </div>
    )
}