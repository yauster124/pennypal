import { useUIStore } from "@/components/store/ui-store";
import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const updateBudgetInputSchema = z.object({
    amount: z.coerce.number()
});

export type UpdateBudgetInput = z.infer<typeof updateBudgetInputSchema>;

export const updateBudget = ({
    budgetId,
    data
}: {
    budgetId: string,
    data: UpdateBudgetInput
}) => {
    return api.put(`/budgets/${budgetId}`, data);
}

export const useUpdateBudget = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateBudget,
        onSuccess: (_, variables) => {
            queryClient.refetchQueries({
                queryKey: ["budgets"]
            });
            useUIStore.getState().close(`update-budget-${variables.budgetId}`);
        }
    })
}