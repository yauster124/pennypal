import { useUIStore } from "@/components/store/ui-store";
import { api } from "@/lib/api-client";
import { toUTCDateAtMidnight } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const createTransferInputSchema = z.object({
    amount: z.coerce.number(),
    date: z.date().transform(toUTCDateAtMidnight),
    accountFromId: z.coerce.string(),
    accountToId: z.coerce.string()
});

export type CreateTransferInput = z.infer<typeof createTransferInputSchema>;

export const createTransfer = ({
    data
}: {
    data: CreateTransferInput
}) => {
    return api.post("/expenses/transfer", data);
}

export const useCreateTransfer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTransfer,
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