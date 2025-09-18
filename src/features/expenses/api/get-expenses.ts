import { api } from "@/lib/api-client"
import { Expense, Page } from "@/types/api"
import { useInfiniteQuery } from "@tanstack/react-query"

export const getExpenses = ({
    page = 0
}: {
    page?: number
}): Promise<Page<Expense>> => {
    return api.get(
        "/expenses",
        {
            params: {
                page: page,
                size: 15
            }
        }
    )
}

export const useGetExpenses = () => {
    return useInfiniteQuery<Page<Expense>, Error>({
        queryKey: ["expenses"],
        queryFn: ({ pageParam = 1 }) => {
            return getExpenses({ page: pageParam as number });
        },
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.number + 1,
        initialPageParam: 0
    });
};