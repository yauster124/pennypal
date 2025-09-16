import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export type CategoryExpenseSummary = {
    categoryId: string;
    categoryName: string;
    totalAmount: string;
}

export const getCategoryTotals = ({
    accountIds,
    startDate
}: {
    accountIds: string[],
    startDate?: string
}) => {
    return api.get<CategoryExpenseSummary[]>(
            "/expenses/category-totals",
            {
                params: {
                    accountIds: accountIds,
                    startDate: startDate
                }
            }
        );
}

export const useGetCategoryTotals = ({
    accountIds,
    startDate
}: {
    accountIds: string[],
    startDate?: string
}) => {
    return useQuery<CategoryExpenseSummary[]>({
        queryKey: ["category-totals", accountIds, startDate],
        queryFn: () => getCategoryTotals({ accountIds: accountIds, startDate: startDate })
    })
}