import { AccountValueChartData } from "@/features/expenses/components/expense-total-section/account-value-types";
import { api } from "@/lib/api-client"
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const getAccountValues = ({
    startDate
}: {
    startDate?: string
}) => {
    return api.get<AccountValueChartData>("/expenses/account-values",
        {
            params: {
                startDate: startDate
            }
        }
    );
}

export const useGetAccountValues = (
    { startDate }: { startDate?: string },
    options?: Omit<
        UseQueryOptions<AccountValueChartData, Error>,
        "queryKey" | "queryFn"
    >
): UseQueryResult<AccountValueChartData, Error> => {
    return useQuery<AccountValueChartData, Error>({
        queryKey: ["accountvalues", startDate],
        queryFn: () => getAccountValues({ startDate }),
        ...options
    })
}