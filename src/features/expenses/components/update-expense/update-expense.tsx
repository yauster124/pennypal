"use client"

import { useUIStore } from "@/components/store/ui-store";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
import { UpdateExpenseInput, updateExpenseInputSchema, useUpdateExpense } from "../../api/update-expense";
import { useEffect } from "react";
import { CurrencyInput } from "@/components/ui/currency-input";
import { DeleteExpense } from "../delete-expense";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateExpenseForm } from "./update-expense-form";

export const UpdateExpense = ({
    trigger,
    expense
}: {
    trigger: React.ReactNode,
    expense: Expense
}) => {
    const isOpen = useUIStore((s) => s.isOpen(`update-expense-${expense.id}`));
    const { open, close } = useUIStore();


    return (
        <Dialog open={isOpen} onOpenChange={(openValue) => openValue ? open(`update-expense-${expense.id}`) : close(`update-expense-${expense.id}`)}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="mb-4">
                    <DialogTitle>Update expense</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="expense">
                    <TabsList>
                        <TabsTrigger value="expense">
                            Expense
                        </TabsTrigger>
                        <TabsTrigger value="income">
                            Income
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="expense">
                        <UpdateExpenseForm expense={expense} expenseType="EXPENSE"/>
                    </TabsContent>
                    <TabsContent value="income">
                        <UpdateExpenseForm expense={expense} expenseType="INCOME" />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}