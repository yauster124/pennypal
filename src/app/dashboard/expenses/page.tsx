import { SearchInput } from "@/components/ui/search-input";
import { ExpensesList } from "@/features/expenses/components/expenses-list";
import { SearchSection } from "@/features/expenses/components/search-section/search-section";

const ExpensesPage = () => {
    return (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            <SearchSection />
            <ExpensesList />
        </div>
    )
}

export default ExpensesPage;