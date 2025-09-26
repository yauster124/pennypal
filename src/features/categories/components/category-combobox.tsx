import * as React from "react"
import { CheckIcon, ArrowLeftIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Category } from "@/types/api"
import { getCategoryIcon } from "./get-category-icon"

export const CategoryCombobox = ({
    categories = [],
    value,
    onChange,
    placeholder = "Select category...",
}: {
    categories?: Category[],
    value?: string | null,
    onChange?: (val: string) => void,
    placeholder?: string
}) => {
    const [open, setOpen] = React.useState(false)
    const [currentParent, setCurrentParent] = React.useState<string | null>(null)

    const selectedLabel = value
        ? categories.find((c) => c.id === value)?.name
        : placeholder

    const roots = categories.filter((c) => !c.parentId)
    const subs = currentParent
        ? categories.filter((c) => c.parentId === currentParent)
        : []

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[240px] justify-between font-normal"
                >
                    {selectedLabel}
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0">
                <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {currentParent ? (
                                <>
                                    <CommandItem onSelect={() => setCurrentParent(null)}>
                                        <ArrowLeftIcon className="mr-2 h-4 w-4" />
                                        Back
                                    </CommandItem>

                                    {(() => {
                                        const root = categories.find((c) => c.id === currentParent)
                                        if (!root) return null
                                        return (
                                            <CommandItem
                                                key={root.id}
                                                value={root.id}
                                                onSelect={() => {
                                                    onChange?.(root.id)
                                                    setOpen(false)
                                                    setCurrentParent(null)
                                                }}
                                            >
                                                {getCategoryIcon({ categoryName: root.name })}
                                                {root.name}
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 h-4 w-4 ml-auto",
                                                        value === root.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        )
                                    })()}

                                    {subs.map((sub) => (
                                        <CommandItem
                                            key={sub.id}
                                            value={sub.id}
                                            onSelect={() => {
                                                onChange?.(sub.id)
                                                setOpen(false)
                                                setCurrentParent(null)
                                            }}
                                        >
                                            {getCategoryIcon({ categoryName: sub.name })}
                                            {sub.name}
                                            <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4 ml-auto",
                                                    value === sub.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </>
                            ) : (
                                roots.map((root) => (
                                    <CommandItem
                                        key={root.id}
                                        value={root.id}
                                        onSelect={() => {
                                            const hasSubs = categories.some(
                                                (c) => c.parentId === root.id
                                            )
                                            if (hasSubs) {
                                                setCurrentParent(root.id)
                                            } else {
                                                onChange?.(root.id)
                                                setOpen(false)
                                            }
                                        }}
                                    >
                                        {getCategoryIcon({ categoryName: root.name })}
                                        {root.name}
                                        <CheckIcon
                                            className={cn(
                                                "mr-2 h-4 w-4 ml-auto",
                                                value === root.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
