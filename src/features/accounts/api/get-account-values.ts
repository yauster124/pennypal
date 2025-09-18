import { api } from "@/lib/api-client"
import { AccountValuePoint } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getAccountValues = ({
    startDate
}: {
    startDate: string
}) => {
    return api.get<Record<string, AccountValuePoint[]>>("/accountvalue",
        {
            params: {
                startDate: startDate
            }
        }
    );
}

export const useGetAccountValues = ({
    startDate
}: {
    startDate: string
}) => {
    return useQuery<Record<string, AccountValuePoint[]>>({
        queryKey: ["accountvalues"],
        queryFn: () => getAccountValues({ startDate: startDate })
    });
}