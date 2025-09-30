import { useUIStore } from "@/components/store/ui-store";
import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const updateProfileInputSchema = z.object({
    profilePictureUrl: z.string(),
    username: z.string().min(1, "Required"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export const updateProfile = ({
    data
}: {
    data: UpdateProfileInput
}) => {
    return api.put("/users/profile", data);
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ["user"]
            });
        }
    })
}