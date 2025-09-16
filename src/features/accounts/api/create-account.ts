import { useUIStore } from "@/components/store/ui-store";
import { api } from "@/lib/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const createAccountInputSchema = z.object({
    name: z.string().min(1, "Required"),
    balance: z.coerce.number()
});

export type CreateAccountInput = z.infer<typeof createAccountInputSchema>;

export const createAccount = ({
    data
}: {
    data: CreateAccountInput
}) => {
    return api.post("/accounts", data);
}

export const useCreateAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAccount,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ["accounts"]
            });
            useUIStore.getState().close("create-account");
        }
    })
}