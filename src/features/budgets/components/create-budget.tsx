import { useUIStore } from "@/components/store/ui-store";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BudgetType } from "@/types/api";
import { InputBase, InputBaseAdornment, InputBaseControl, InputBaseInput } from "@/components/ui/input-base";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { CreateBudgetInput, createBudgetInputSchema, useCreateBudget } from "../api/create-budget";
import { useGetCategories } from "@/features/categories/api/get-categories";
import { CategoryCombobox } from "@/features/categories/components/category-combobox";

export const CreateBudget = ({
    trigger,
    budgetType
}: {
    trigger: React.ReactNode,
    budgetType: BudgetType
}) => {
    const isOpen = useUIStore((s) => s.isOpen("create-budget"));
    const { open, close } = useUIStore();

    const form = useForm<CreateBudgetInput>({
        resolver: zodResolver(createBudgetInputSchema) as Resolver<CreateBudgetInput>,
        defaultValues: {
            amount: 0,
            categoryId: null
        }
    });
    const createBudget = useCreateBudget();
    const getCategories = useGetCategories();

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(openValue) => openValue ? open("create-budget") : close("create-budget")}
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
                                createBudget.mutate({
                                    data: values,
                                    budgetType: budgetType
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
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <CategoryCombobox categories={getCategories.data?.filter((c) => c.type === "EXPENSE")} {...field} placeholder="Select a category" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            {createBudget.isPending ? (
                                <Button disabled>
                                    <Loader2Icon className="animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit">Save</Button>
                            )}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}