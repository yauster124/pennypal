import { api } from "@/lib/api-client"
import { Category } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getCategories = () => {
    return api.get<Category[]>("/categories");
}

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: Infinity
    })
}