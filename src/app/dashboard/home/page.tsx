"use client"

import { AccountListSection } from "@/features/accounts/components/account-list-section"
import { AccountTotalCard } from "@/features/accounts/components/account-total-card";
import { CategoryTotalsSection } from "@/features/expenses/components/category-totals-section/category-totals-section";
import { ExpenseTotalSection } from "@/features/expenses/components/expense-total-section/expense-total-section";
import { MonthlyIncomeSection } from "@/features/expenses/components/monthly-income-section/monthly-income-section";
import { MonthlyTotalsSection } from "@/features/expenses/components/monthly-totals-section/monthly-totals-section";
import { RecentExpensesSection } from "@/features/expenses/components/recent-expenses-section/recent-expenses-section";

const HomePage = () => {
    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="flex justify-center px-4 lg:px-6">
                    <AccountListSection />
                </div>
                <div className="flex flex-col gap-4 px-4 lg:px-6 2xl:flex-row items-stretch">
                    <div className="flex flex-3">
                        <ExpenseTotalSection />
                    </div>
                    <div className="flex flex-col flex-1 gap-4">
                        <AccountTotalCard className="h-full" />
                        <RecentExpensesSection />
                    </div>
                </div>
                <div className="flex flex-col gap-4 px-4 lg:px-6 2xl:flex-row items-stretch">
                    <div className="flex flex-1">
                        <CategoryTotalsSection />
                    </div>
                    <div className="flex flex-1">
                        <MonthlyTotalsSection />
                    </div>
                    <div className="flex flex-1">
                        <MonthlyIncomeSection />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;