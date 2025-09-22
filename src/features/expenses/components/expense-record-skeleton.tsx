import { Skeleton } from "@/components/ui/skeleton"

export const ExpenseRecordSkeleton = () => {
    return (
        <div className="flex items-start justify-between w-full p-4 rounded-lg bg-card">
            <div className="flex items-center space-x-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex flex-col space-y-1">
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-12" />
            </div>
        </div>
    )
}