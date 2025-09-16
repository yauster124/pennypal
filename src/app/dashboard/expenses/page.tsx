import { ExpensesList } from "@/features/expenses/components/expenses-list";

const ExpensesPage = () => {
    return (
        <div className="flex flex-col gap-4 max-w-xl mx-auto">
            <ExpensesList />
        </div>
    )
}

export default ExpensesPage;