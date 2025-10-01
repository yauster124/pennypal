import { ExpensesList } from "@/features/expenses/components/expenses-list";
import { SearchSection } from "@/features/expenses/components/search-section/search-section";

const ExpensesPage = () => {
    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4">
                <div className="flex justify-center px-4 lg:px-6">
                    <SearchSection />
                </div>
                <div className="px-4 lg:px-6">
                    <ExpensesList />
                </div>
            </div>
        </div>
    )
}

export default ExpensesPage;