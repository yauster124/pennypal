import { Budget, BudgetType } from "@/types/api";
import { TotalBudgetChart } from "./total-budget-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateTotalBudget } from "./create-total-budget";

export const TotalBudgetSection = ({
    budget,
    budgetType
}: {
    budget?: Budget,
    budgetType: BudgetType
}) => {
    const chartData = [
        {
            category: "overall",
            amount: budget ? Number(budget.spent) : 0,
            fill: "var(--color-overall)"
        }
    ]

    const totalAmount = budget ? Number(budget.amount) : 0;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Overall Budget</CardTitle>
            </CardHeader>
            <CardContent>
                <TotalBudgetChart
                    chartData={chartData}
                    totalAmount={totalAmount}
                />
                <div className="flex justify-center">
                    <CreateTotalBudget
                        trigger={
                            <Button>Set budget</Button>
                        }
                        budgetType={budgetType}
                    />
                </div>
            </CardContent>
        </Card>
    )
}