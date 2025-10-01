"use client"

import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CreateExpenseInput, createExpenseInputSchema, useCreateExpense } from "../../api/create-expense";
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
import { ExpenseType } from "@/types/api";
import { InputBase, InputBaseAdornment, InputBaseControl, InputBaseInput } from "@/components/ui/input-base";

export const CreateExpenseForm = ({
    expenseType
}: {
    expenseType: ExpenseType
}) => {
    const createExpense = useCreateExpense();
    const getCategories = useGetCategories();
    const getAccounts = useGetAccounts();
    const accounts = getAccounts.data?.map((account) => {
        return {
            label: account.name,
            value: account.id
        }
    });

    const form = useForm<CreateExpenseInput>({
        resolver: zodResolver(createExpenseInputSchema) as Resolver<CreateExpenseInput>,
        defaultValues: {
            name: "",
            amount: undefined,
            date: new Date(),
            categoryId: null,
            accountId: ""
        }
    });

    return (
        <Form {...form}>
            <form
                onSubmit={
                    form.handleSubmit((values) => {
                        createExpense.mutate({
                            data: values
                        });
                        form.reset();
                    })
                }
                className="space-y-4"
            >
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
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
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
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <CategoryCombobox categories={getCategories.data?.filter((c) => c.type === expenseType)} {...field} placeholder="Select a category" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="accountId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account</FormLabel>
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
                    {createExpense.isPending ? (
                        <Button disabled>
                            <Loader2Icon className="animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit">Create expense</Button>
                    )}
                </DialogFooter>
            </form>
        </Form>
    )
}