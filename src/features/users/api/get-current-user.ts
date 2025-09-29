import { api } from "@/lib/api-client"
import { User } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getCurrentUser = () => {
    return api.get<User>("/users/current");
}

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser
    })
}