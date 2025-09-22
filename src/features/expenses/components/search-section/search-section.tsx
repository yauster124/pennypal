"use client"

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input"
import { Settings2Icon } from "lucide-react";
import { SearchFilterPopover } from "./search-filter-popover";
import { useSearchFiltersStore } from "../../store/search-filters-store";
import { useDebounce } from "@/lib/use-debounce";

export const SearchSection = () => {
    const setSearchQuery = useSearchFiltersStore((s) => s.setSearchQuery)
    const debouncedSetQuery = useDebounce((value: string) => {
        setSearchQuery(value)
    }, 500)

    return (
        <div className="flex items-center">
            <SearchInput
                onChange={(e) => debouncedSetQuery(e.currentTarget.value)}
            />
            <SearchFilterPopover
                trigger={
                    <Button variant="ghost">
                        <Settings2Icon />
                    </Button>
                }
            />
        </div>
    );
}