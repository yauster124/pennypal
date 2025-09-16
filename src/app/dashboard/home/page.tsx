import { AccountListSection } from "@/features/accounts/components/account-list-section"
import { CategoryTotalsSection } from "@/features/expenses/components/category-totals-section";
import { ExpenseTotalSection } from "@/features/expenses/components/expense-total-section";
import { RecentExpensesSection } from "@/features/expenses/components/recent-expenses-section";

const HomePage = () => {
    return (
        <div className="flex flex-col gap-4 max-w-xl mx-auto">
            <AccountListSection />
            <ExpenseTotalSection />
            <CategoryTotalsSection />
            <RecentExpensesSection />
        </div>
    )
}

export default HomePage;