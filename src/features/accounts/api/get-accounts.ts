import { api } from "@/lib/api-client"
import { Account } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getAccounts = () => {
    return api.get<Account[]>("/accounts");
}

export const useGetAccounts = () => {
    return useQuery<Account[]>({
        queryKey: ["accounts"],
        queryFn: getAccounts
    })
}