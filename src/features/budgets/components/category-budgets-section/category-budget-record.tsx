import { NumberDisplay } from "@/components/ui/number-display";
import { Progress } from "@/components/ui/progress"
import { CategoryIcon, getCategoryColour } from "@/features/categories/components/get-category-icon";
import { Budget } from "@/types/api"
import { UpdateBudget } from "../update-budgets";

export const CategoryBudgetRecord = ({
    budget
}: {
    budget: Budget
}) => {
    const progressValue = Number(budget.amount) !== 0
        ? Math.min((Number(budget.spent) / Number(budget.amount)) * 100, 100)
        : 0;

    return (
        <div className="flex gap-4 items-center">
            {budget.category && <CategoryIcon category={budget.category} />}
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                    <UpdateBudget
                        budget={budget}
                        trigger={
                            <button
                                type="button"
                                className="w-fit text-left text-sm font-semibold text-secondary-foreground underline-offset-4 hover:underline transition-colors"
                            >
                                {budget.category?.name}
                            </button>
                        }
                    />
                    <div className="flex">
                        <NumberDisplay amount={budget.spent} format={false} dynamicColour={false} />
                    </div>
                </div>
                <Progress
                    value={progressValue}
                    indicatorClassName={getCategoryColour(budget.category?.parentId || budget.category?.id || "")}
                />
            </div>
        </div>
    )
}