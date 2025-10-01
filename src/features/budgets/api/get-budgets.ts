import { api } from "@/lib/api-client";
import { Budget, BudgetType } from "@/types/api";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const getBudgets = (budgetType: BudgetType) => {
    return api.get<Budget[]>("/budgets",
        {
            params: {
                budgetType: budgetType
            }
        }
    )
}

export const useGetBudgets = (
    {
        budgetType,
    }: {
        budgetType: BudgetType
    },
    options?: Omit<
        UseQueryOptions<Budget[], Error>,
        "queryKey" | "queryFn"
    >): UseQueryResult<Budget[], Error> => {
    return useQuery<Budget[]>({
        queryKey: ["budgets", budgetType],
        queryFn: () => getBudgets(budgetType),
        ...options
    })
}