"use client";

import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useSearchFiltersStore } from "../../store/search-filters-store"
import { format } from "date-fns"
import { useGetCategories } from "@/features/categories/api/get-categories"
import { Checkbox } from "@/components/ui/checkbox"

export const SearchFilterPopover = ({
    trigger
}: {
    trigger: React.ReactNode
}) => {
    const setStartDate = useSearchFiltersStore((s) => s.setStartDate);
    const setEndDate = useSearchFiltersStore((s) => s.setEndDate);
    const addCategoryId = useSearchFiltersStore((s) => s.addCategoryId);
    const removeCategoryId = useSearchFiltersStore((s) => s.removeCategoryId);
    const categoryIds = useSearchFiltersStore((s) => s.categoryIds);
    const getCategories = useGetCategories();

    return (
        <Popover>
            <PopoverTrigger asChild>
                {trigger}
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Date range</h4>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="start-date">Start date</Label>
                            <DatePicker
                                id="start-date"
                                onChange={(value) => setStartDate(value ? format(value, "yyyy-MM-dd") : undefined)}
                                className="w-[180px]"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="end-date">End date</Label>
                            <DatePicker
                                id="end-date"
                                onChange={(value) => setEndDate(value ? format(value, "yyyy-MM-dd") : undefined)}
                                className="w-[180px]"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Categories</h4>
                    </div>
                    {getCategories.data && getCategories.data.filter((category) => category.parentId == null).map((category) => (
                        <div key={category.id} className="flex items-center gap-3">
                            <Checkbox
                                id={category.id}
                                checked={categoryIds ? categoryIds.includes(category.id) : false}
                                onCheckedChange={(checked) => {
                                    checked
                                        ? addCategoryId(category.id)
                                        : removeCategoryId(category.id);
                                }}
                            />
                            <Label className="font-normal" htmlFor={category.id}>{category.name}</Label>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}