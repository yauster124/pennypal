"use client";

import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useSearchFiltersStore } from "../../store/search-filters-store"
import { useGetCategories } from "@/features/categories/api/get-categories"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";

export const SearchFilterPopover = ({
    trigger
}: {
    trigger: React.ReactNode
}) => {
    const setStartDate = useSearchFiltersStore((s) => s.setStartDate);
    const setEndDate = useSearchFiltersStore((s) => s.setEndDate);
    const startDate = useSearchFiltersStore((s) => s.startDate);
    const endDate = useSearchFiltersStore((s) => s.endDate);
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
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="start-date">Start date</Label>
                        <div>
                            <DatePicker
                                id="start-date"
                                value={startDate}
                                onChange={setStartDate}
                                className="w-[180px]"
                            />
                            <Button
                                variant="link"
                                onClick={() => setStartDate(undefined)}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="end-date">End date</Label>
                        <div>
                            <DatePicker
                                id="end-date"
                                value={endDate}
                                onChange={setEndDate}
                                className="w-[180px]"
                            />
                            <Button
                                variant="link"
                                onClick={() => setEndDate(undefined)}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium text-sm">Categories</h4>
                    </div>
                    {getCategories.data && getCategories.data.filter((category) => category.parentId == null).map((category) => (
                        <div key={category.id} className="flex items-center gap-3">
                            <Checkbox
                                id={category.id}
                                checked={categoryIds ? categoryIds.includes(category.id) : false}
                                onCheckedChange={(checked) => checked ? addCategoryId(category.id) : removeCategoryId(category.id)}
                            />
                            <Label className="font-normal" htmlFor={category.id}>{category.name}</Label>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}