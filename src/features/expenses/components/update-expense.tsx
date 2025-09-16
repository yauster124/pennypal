"use client"

import { useUIStore } from "@/components/store/ui-store";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useGetCategories } from "@/features/categories/api/get-categories";
import { CategoryCombobox } from "@/features/categories/components/category-combobox";
import { Combobox } from "@/components/ui/combobox";
import { useGetAccounts } from "@/features/accounts/api/get-accounts";
import { Expense } from "@/types/api";
import { UpdateExpenseInput, updateExpenseInputSchema, useUpdateExpense } from "../api/update-expense";

export const UpdateExpense = ({
    trigger,
    expense
}: {
    trigger: React.ReactNode,
    expense: Expense
}) => {
    const isOpen = useUIStore((s) => s.isOpen(`update-expense-${expense.id}`));
    const { open, close } = useUIStore();
    const updateExpense = useUpdateExpense();
    const getCategories = useGetCategories();
    const getAccounts = useGetAccounts();
    const accounts = getAccounts.data?.map((account) => {
        return {
            label: account.name,
            value: account.id
        }
    });

    const form = useForm<UpdateExpenseInput>({
        resolver: zodResolver(updateExpenseInputSchema) as Resolver<UpdateExpenseInput>,
        defaultValues: {
            name: expense.name,
            amount: Math.abs(Number(expense.amount)),
            date: new Date(expense.date),
            categoryId: expense.category.id,
            accountId: expense.account.id
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={(openValue) => openValue ? open(`update-expense-${expense.id}`) : close(`update-expense-${expense.id}`)}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form
                        onSubmit={
                            form.handleSubmit((values) => {
                                updateExpense.mutate({
                                    expenseId: expense.id,
                                    data: values
                                });
                                form.reset();
                            })
                        }
                        className="space-y-4"
                    >
                        <DialogHeader>
                            <DialogTitle>Update expense</DialogTitle>
                        </DialogHeader>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Do by date</FormLabel>
                                    <FormControl>
                                        <DatePicker {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Do by date</FormLabel>
                                    <FormControl>
                                        <CategoryCombobox categories={getCategories.data} {...field} placeholder="Select a category" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="accountId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Do by date</FormLabel>
                                    <FormControl>
                                        <Combobox data={accounts || []} {...field} placeholder="Select an account" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            {updateExpense.isPending ? (
                                <Button disabled>
                                    <Loader2Icon className="animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit">Update expense</Button>
                            )}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}