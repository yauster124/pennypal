import { Expense, ExpenseType } from "@/types/api"
import { UpdateExpenseInput, updateExpenseInputSchema, useUpdateExpense } from "../../api/update-expense";
import { useGetCategories } from "@/features/categories/api/get-categories";
import { useGetAccounts } from "@/features/accounts/api/get-accounts";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/ui/currency-input";
import { DatePicker } from "@/components/ui/date-picker";
import { CategoryCombobox } from "@/features/categories/components/category-combobox";
import { Combobox } from "@/components/ui/combobox";
import { DeleteExpense } from "../delete-expense";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Loader2Icon } from "lucide-react";

export const UpdateExpenseForm = ({
    expense,
    expenseType
}: {
    expense: Expense,
    expenseType: ExpenseType
}) => {
    const updateExpense = useUpdateExpense();
    const getCategories = useGetCategories();
    const categories = getCategories.data?.filter((c) => c.type === expenseType);
    const selectedCategoryId = categories?.find(c => c.id === expense.category.id) ? expense.category.id : undefined;
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
            categoryId: selectedCategoryId,
            accountId: expense.account.id
        }
    });

    useEffect(() => {
        if (expense) {
            form.reset({
                name: expense.name,
                amount: Math.abs(Number(expense.amount)),
                date: new Date(expense.date),
                categoryId: selectedCategoryId,
                accountId: expense.account.id
            })
        }
    }, [expense, form])

    return (
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
            >
                <div className="space-y-4 mb-8">
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
                                    <CurrencyInput {...field} />
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
                                    <CategoryCombobox categories={categories} {...field} placeholder="Select a category" />
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
                </div>
                <div className="flex justify-between">
                    <div className="flex">
                        <DeleteExpense
                            trigger={
                                <Button variant="destructive">Delete</Button>
                            }
                            expenseId={expense.id}
                        />
                    </div>
                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {updateExpense.isPending ? (
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
    )
}