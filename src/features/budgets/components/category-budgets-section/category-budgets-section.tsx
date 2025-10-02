import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Budget, BudgetType } from "@/types/api"
import { ArchiveX, CirclePlusIcon } from "lucide-react"
import { CreateBudget } from "../create-budget"
import { CategoryBudgetRecord } from "./category-budget-record"

export const CategoryBudgetsSection = ({
    budgets,
    budgetType
}: {
    budgets: Budget[],
    budgetType: BudgetType
}) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Budgets By Category</CardTitle>
                <CardAction>
                    <CreateBudget
                        trigger={
                            <Button>
                                <CirclePlusIcon />
                                Add budget
                            </Button>
                        }
                        budgetType={budgetType}
                    />
                </CardAction>
            </CardHeader>
            <CardContent>
                {budgets.length < 1 && (
                    <div
                        role="list"
                        aria-label="expenses"
                        className="flex h-40 flex-col items-center justify-center text-muted-foreground"
                    >
                        <ArchiveX className="size-10" />
                        <h4>No budgets found.</h4>
                    </div>
                )}
                {budgets.length > 0 && (
                    <div className="flex flex-col gap-6">
                        {budgets.map((budget, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <CategoryBudgetRecord budget={budget} />
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}