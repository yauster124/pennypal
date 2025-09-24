"use client"

import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { useGetAccounts } from "@/features/accounts/api/get-accounts";
import { CurrencyInput } from "@/components/ui/currency-input";
import { CreateTransferInput, createTransferInputSchema, useCreateTransfer } from "../../api/create-transfer";

export const CreateTransferForm = () => {
    const createExpense = useCreateTransfer();
    const getAccounts = useGetAccounts();
    const accounts = getAccounts.data?.map((account) => {
        return {
            label: account.name,
            value: account.id
        }
    });

    const form = useForm<CreateTransferInput>({
        resolver: zodResolver(createTransferInputSchema) as Resolver<CreateTransferInput>,
        defaultValues: {
            amount: undefined,
            date: new Date(),
            accountFromId: "",
            accountToId: ""
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
                    name="accountFromId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account from</FormLabel>
                            <FormControl>
                                <Combobox data={accounts || []} {...field} placeholder="Select an account" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="accountToId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account to</FormLabel>
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
                        <Button type="submit">Create transfer</Button>
                    )}
                </DialogFooter>
            </form>
        </Form>
    )
}