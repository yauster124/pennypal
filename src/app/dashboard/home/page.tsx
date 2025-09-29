import { AccountListSection } from "@/features/accounts/components/account-list-section"
import { CategoryTotalsSection } from "@/features/expenses/components/category-totals-section/category-totals-section";
import { ExpenseTotalSection } from "@/features/expenses/components/expense-total-section/expense-total-section";
import { RecentExpensesSection } from "@/features/expenses/components/recent-expenses-section/recent-expenses-section";

const HomePage = () => {
    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="flex justify-center px-4 lg:px-6">
                    <AccountListSection />
                </div>
                <div className="px-4 lg:px-6">
                    <RecentExpensesSection />
                </div>
                <div className="flex flex-col gap-4 px-4 lg:px-6 2xl:flex-row items-stretch">
                    <div className="flex flex-1">
                        <ExpenseTotalSection />
                    </div>
                    <div className="flex flex-1">
                        <CategoryTotalsSection />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;