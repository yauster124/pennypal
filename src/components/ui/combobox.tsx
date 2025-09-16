import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./command"
import { cn } from "@/lib/utils"

type ComboboxOption = { label: string; value: string }
export type ComboboxOptions = ComboboxOption[]

type ComboboxProps = {
    data: ComboboxOptions
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
}

export const Combobox: React.FC<ComboboxProps> = ({
    data,
    value,
    onChange,
    placeholder = "Select option...",
}) => {
    const [open, setOpen] = React.useState(false)

    const selectedLabel = value
        ? data.find((d) => d.value === value)?.label
        : placeholder

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between font-normal"
                >
                    {selectedLabel}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((d) => (
                                <CommandItem
                                    key={d.value}
                                    value={d.value}
                                    onSelect={() => {
                                        onChange?.(d.value === value ? "" : d.value)
                                        setOpen(false)
                                    }}
                                >
                                    
                                    {d.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto mr-2 h-4 w-4",
                                            value === d.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
