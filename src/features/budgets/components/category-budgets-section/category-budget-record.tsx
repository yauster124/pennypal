import { NumberDisplay } from "@/components/ui/number-display";
import { Progress } from "@/components/ui/progress"
import { CategoryIcon } from "@/features/categories/components/get-category-icon";
import { Budget } from "@/types/api"

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
                    <span>{budget.category?.name}</span>
                    <div className="flex">
                        <NumberDisplay amount={budget.spent} format={false} dynamicColour={false} />
                    </div>
                </div>
                <Progress value={progressValue} className="h-[20px]"/>
            </div>
        </div>
    )
}