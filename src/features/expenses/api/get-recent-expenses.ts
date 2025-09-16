import { api } from "@/lib/api-client"
import { Expense } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getRecentExpenses = ({
    accountIds
}: {
    accountIds: string[]
}) => {
    return api.get<Expense[]>(
        "/expenses/recent",
        {
            params: {
                accountIds: accountIds
            }
        }
    );
}

export const useGetRecentExpenses = ({
    accountIds
}: {
    accountIds: string[]
}) => {
    return useQuery<Expense[]>({
        queryKey: ["recent-expenses", accountIds],
        queryFn: () => getRecentExpenses({ accountIds })
    })
}