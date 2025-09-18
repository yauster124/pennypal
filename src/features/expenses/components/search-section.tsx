import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input"
import { Settings2Icon } from "lucide-react";

export const SearchSection = () => {
    return (
        <div className="flex items-center">
            <SearchInput />
            <Button variant="ghost">
                <Settings2Icon />
            </Button>
        </div>
    );
}