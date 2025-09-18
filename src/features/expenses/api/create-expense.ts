import { useUIStore } from "@/components/store/ui-store";
import { api } from "@/lib/api-client";
import { toUTCDateAtMidnight } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const createExpenseInputSchema = z.object({
    name: z.string().min(1, "Required"),
    amount: z.coerce.number(),
    date: z.date().transform(toUTCDateAtMidnight),
    categoryId: z.coerce.string().nullable(),
    accountId: z.coerce.string()
});

export type CreateExpenseInput = z.infer<typeof createExpenseInputSchema>;

export const createExpense = ({
    data
}: {
    data: CreateExpenseInput
}) => {
    return api.post("/expenses", data);
}

export const useCreateExpense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createExpense,
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
            useUIStore.getState().close("create-expense");
        }
    })
}