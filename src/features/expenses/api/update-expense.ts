import { useUIStore } from "@/components/store/ui-store";
import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const updateExpenseInputSchema = z.object({
    name: z.string().min(1, "Required"),
    amount: z.coerce.number(),
    date: z.date(),
    categoryId: z.coerce.string().nullable(),
    accountId: z.coerce.string()
});

export type UpdateExpenseInput = z.infer<typeof updateExpenseInputSchema>;

export const updateExpense = ({
    expenseId,
    data
}: {
    expenseId: string,
    data: UpdateExpenseInput
}) => {
    return api.put(`/expenses/${expenseId}`, data);
}

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateExpense,
        onSuccess: (_, variables) => {
            queryClient.refetchQueries({
                queryKey: ["recent-expenses"]
            });
            queryClient.refetchQueries({
                queryKey: ["category-totals"]
            });
            useUIStore.getState().close(`update-expense-${variables.expenseId}`);
        }
    })
}