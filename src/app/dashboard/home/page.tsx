import { AccountListSection } from "@/features/accounts/components/account-list-section"
import { CategoryTotalsSection } from "@/features/expenses/components/category-totals-section/category-totals-section";
import { ExpenseTotalSection } from "@/features/expenses/components/expense-total-section/expense-total-section";
import { RecentExpensesSection } from "@/features/expenses/components/recent-expenses-section/recent-expenses-section";

const HomePage = () => {
    return (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            <AccountListSection />
            <RecentExpensesSection />
            <CategoryTotalsSection />
            <ExpenseTotalSection />
        </div>
    )
}

export default HomePage;