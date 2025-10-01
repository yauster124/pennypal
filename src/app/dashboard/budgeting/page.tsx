"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGetBudgets } from "@/features/budgets/api/get-budgets";
import { CategoryBudgetsSection } from "@/features/budgets/components/category-budgets-section/category-budgets-section";
import { TotalBudgetSection } from "@/features/budgets/components/total-budget-section/total-budget-section";
import { BudgetType } from "@/types/api";
import { useState } from "react";

export const BudgetingPage = () => {
    const [selectedBudgetType, setSelectedBudgetType] = useState<BudgetType>("MONTHLY");
    const getBudgets = useGetBudgets({ budgetType: selectedBudgetType });

    const totalBudget = getBudgets.data?.find((b) => !b.category);
    const budgets = getBudgets.data?.filter((b) => b.category);

    return (
        <div className="@container/main flex flex-1 flex-col gap-4 p-4">
            <div className="flex flex-col gap-4">
                <ToggleGroup
                    type="single"
                    value={selectedBudgetType}
                    onValueChange={(value) => setSelectedBudgetType(value as BudgetType)}
                    variant="outline"
                    className="px-6"
                >
                    <ToggleGroupItem value="MONTHLY">Monthly</ToggleGroupItem>
                    <ToggleGroupItem value="YEARLY">Yearly</ToggleGroupItem>
                </ToggleGroup>
                <div className="flex flex-col gap-4 2xl:flex-row items-start">
                    <div className="flex flex-1">
                        <CategoryBudgetsSection budgets={budgets || []} budgetType={selectedBudgetType} />
                    </div>
                    <div className="flex flex-1">
                        <TotalBudgetSection budget={totalBudget} budgetType={selectedBudgetType} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetingPage;