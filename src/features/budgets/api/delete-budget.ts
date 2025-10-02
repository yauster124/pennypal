import { api } from "@/lib/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteBudget = ({
    budgetId
}: {
    budgetId: string
}) => {
    return api.delete(`/budgets/${budgetId}`);
}

export const useDeleteBudget = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBudget,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ["budgets"]
            });
        }
    });
}