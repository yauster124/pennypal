import { api } from "@/lib/api-client"
import { Expense, Page } from "@/types/api"
import { useInfiniteQuery } from "@tanstack/react-query"

export const getExpenses = ({
    page = 0,
    searchQuery,
    startDateQuery,
    endDateQuery,
    categoryIdsQuery
}: {
    page?: number,
    searchQuery?: string,
    startDateQuery?: string,
    endDateQuery?: string,
    categoryIdsQuery?: string[]
}): Promise<Page<Expense>> => {
    return api.get(
        "/expenses",
        {
            params: {
                page: page,
                size: 15,
                searchQuery: searchQuery,
                startDate: startDateQuery,
                endDate: endDateQuery,
                categoryIds: categoryIdsQuery
            }
        }
    )
}

export const useGetExpenses = ({
    searchQuery,
    startDateQuery,
    endDateQuery,
    categoryIdsQuery
}: {
    searchQuery?: string,
    startDateQuery?: string,
    endDateQuery?: string,
    categoryIdsQuery?: string[]
}) => {
    return useInfiniteQuery<Page<Expense>, Error>({
        queryKey: ["expenses", searchQuery, startDateQuery, endDateQuery, categoryIdsQuery],
        queryFn: ({ pageParam = 1 }) => {
            return getExpenses({
                page: pageParam as number,
                searchQuery: searchQuery,
                startDateQuery: startDateQuery,
                endDateQuery: endDateQuery,
                categoryIdsQuery: categoryIdsQuery
            });
        },
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.number + 1,
        initialPageParam: 0
    });
};