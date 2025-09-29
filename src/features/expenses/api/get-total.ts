import { api } from "@/lib/api-client"
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"

export type ExpenseTotal = {
    total: string
}

export const getTotal = ({
    accountIds,
    startDate,
    endDate
}: {
    accountIds: string[],
    startDate?: string,
    endDate?: string
}) => {
    return api.get<ExpenseTotal>(
        "/expenses/total",
        {
            params: {
                accountIds: accountIds,
                startDate: startDate,
                endDate: endDate
            }
        }
    )
}

export const useGetTotal = (
    {
        accountIds,
        startDate,
        endDate
    }: {
        accountIds: string[],
        startDate?: string,
        endDate?: string
    },
    options?: Omit<
        UseQueryOptions<ExpenseTotal, Error>,
        "queryKey" | "queryFn"
    >): UseQueryResult<ExpenseTotal, Error> => {
    return useQuery<ExpenseTotal>({
        queryKey: ["total", accountIds, startDate, endDate],
        queryFn: () => getTotal({ accountIds, startDate, endDate }),
        ...options
    })
}