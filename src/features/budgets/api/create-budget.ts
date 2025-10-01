import { useUIStore } from "@/components/store/ui-store";
import { api } from "@/lib/api-client";
import { BudgetType } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const createBudgetInputSchema = z.object({
    amount: z.coerce.number(),
    categoryId: z.coerce.string().nullable()
});

export type CreateBudgetInput = z.infer<typeof createBudgetInputSchema>;

export const createBudget = ({
    data,
    budgetType
}: {
    data: CreateBudgetInput,
    budgetType: BudgetType
}) => {
    return api.post("/budgets",
        {
            ...data,
            type: budgetType
        }
    );
}

export const useCreateBudget = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBudget,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ["budgets"]
            });
            useUIStore.getState().close("create-budget");
            useUIStore.getState().close("create-total-budget");
        }
    })
}