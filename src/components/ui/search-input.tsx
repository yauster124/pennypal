import { SearchIcon } from "lucide-react"
import { Input } from "./input"

export const SearchInput = ({ className, ...props }: React.ComponentProps<"input">)  => {
    return (
        <div className="relative w-full bg-card rounded-lg border">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search by name"
                className="p-5 pl-9 shadow-none rounded-lg border-none"
                {...props}
            />
        </div>
    )
}