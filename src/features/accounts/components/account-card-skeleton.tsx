import { Skeleton } from "@/components/ui/skeleton"

export const AccountCardSkeleton = () => {
    return (
        <button
            disabled
            className="w-full text-left px-4 py-2 rounded-xl border transition cursor-default"
        >
            <div className="flex flex-col items-start space-y-1">
                <Skeleton className="h-4 w-24" /> {/* account name */}
                <Skeleton className="h-5 w-20" /> {/* balance */}
            </div>
        </button>
    )
}