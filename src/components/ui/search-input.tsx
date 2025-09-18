import { SearchIcon } from "lucide-react"
import { Input } from "./input"

export const SearchInput = () => {
    return (
        <div className="relative w-full bg-card rounded-lg border">
            {/* Magnifying glass */}
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            {/* Input field */}
            <Input
                type="text"
                placeholder="Search by name"
                className="p-5 pl-9 shadow-none rounded-lg border-none" // 👈 add left padding so text doesn't overlap the icon
            />
        </div>
    )
}