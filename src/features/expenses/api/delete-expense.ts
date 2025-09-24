import { api } from "@/lib/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteExpense = ({
    expenseId
}: {
    expenseId: string
}) => {
    return api.delete(`/expenses/${expenseId}`);
}

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteExpense,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ["recent-expenses"]
            });
            queryClient.refetchQueries({
                queryKey: ["category-totals"]
            });
            queryClient.refetchQueries({
                queryKey: ["total"]
            });
            queryClient.refetchQueries({
                queryKey: ["accounts"]
            });
            queryClient.refetchQueries({
                queryKey: ["accountvalues"]
            });
        }
    });
}