import { api } from "@/lib/api-client"
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"

export type MonthlyTotal = {
    month: Date
    total: string
}

export const getMonthlyTotals = ({
    startDate
}: {
    startDate?: string
}) => {
    return api.get<MonthlyTotal[]>(
        "/expenses/monthly-totals",
        {
            params: {
                startDate: startDate
            }
        }
    )
}

export const getMonthlyIncome = ({
    startDate
}: {
    startDate?: string
}) => {
    return api.get<MonthlyTotal[]>(
        "/expenses/monthly-income",
        {
            params: {
                startDate: startDate
            }
        }
    )
}

export const useGetMonthlyTotals = (
    {
        startDate
    }: {
        startDate?: string
    },
    options?: Omit<
        UseQueryOptions<MonthlyTotal[], Error>,
        "queryKey" | "queryFn"
    >): UseQueryResult<MonthlyTotal[], Error> => {
    return useQuery<MonthlyTotal[]>({
        queryKey: ["monthly-totals", startDate],
        queryFn: () => getMonthlyTotals({ startDate: startDate }),
        ...options
    })
}

export const useGetMonthlyIncome = (
    {
        startDate
    }: {
        startDate?: string
    },
    options?: Omit<
        UseQueryOptions<MonthlyTotal[], Error>,
        "queryKey" | "queryFn"
    >): UseQueryResult<MonthlyTotal[], Error> => {
    return useQuery<MonthlyTotal[]>({
        queryKey: ["monthly-income", startDate],
        queryFn: () => getMonthlyIncome({ startDate: startDate }),
        ...options
    })
}