import { useUIStore } from "@/components/store/ui-store";
import { Budget } from "@/types/api"
import { Resolver, useForm } from "react-hook-form";
import { UpdateBudgetInput, updateBudgetInputSchema, useUpdateBudget } from "../api/update-budget";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputBase, InputBaseAdornment, InputBaseControl, InputBaseInput } from "@/components/ui/input-base";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { DeleteBudget } from "./delete-budget";

export const UpdateBudget = ({
    budget,
    trigger
}: {
    budget: Budget,
    trigger: React.ReactNode
}) => {
    const isOpen = useUIStore((s) => s.isOpen(`update-budget-${budget.id}`));
    const { open, close } = useUIStore();

    const form = useForm<UpdateBudgetInput>({
        resolver: zodResolver(updateBudgetInputSchema) as Resolver<UpdateBudgetInput>,
        defaultValues: {
            amount: Number(budget.amount)
        }
    });
    const updateBudget = useUpdateBudget();

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(openValue) => openValue ? open(`update-budget-${budget.id}`) : close(`update-budget-${budget.id}`)}
        >
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Set budget</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={
                            form.handleSubmit((values) => {
                                updateBudget.mutate({
                                    budgetId: budget.id,
                                    data: values
                                });
                                form.reset();
                            })
                        }
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <InputBase error={Boolean(fieldState.error)}>
                                        <InputBaseAdornment>
                                            £
                                        </InputBaseAdornment>
                                        <InputBaseControl>
                                            <FormControl>
                                                <InputBaseInput {...field} />
                                            </FormControl>
                                        </InputBaseControl>
                                    </InputBase>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between">
                            <div className="flex">
                                <DeleteBudget
                                    trigger={
                                        <Button variant="destructive">Delete</Button>
                                    }
                                    budgetId={budget.id}
                                />
                            </div>
                            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                {updateBudget.isPending ? (
                                    <Button disabled>
                                        <Loader2Icon className="animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit">Save</Button>
                                )}
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}