"use client"

import { useUIStore } from "@/components/store/ui-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateExpenseForm } from "./create-expense-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateIncomeForm } from "./create-income-form";
import { CreateTransferForm } from "./create-transfer-form";

export const CreateExpense = ({
    trigger
}: {
    trigger: React.ReactNode
}) => {
    const isOpen = useUIStore((s) => s.isOpen("create-expense"));
    const { open, close } = useUIStore();

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(openValue) => {
                openValue ? open("create-expense") : close("create-expense");
            }}
        >
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add expense</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="expense">
                    <TabsList>
                        <TabsTrigger value="expense">
                            Expense
                        </TabsTrigger>
                        <TabsTrigger value="income">
                            Income
                        </TabsTrigger>
                        <TabsTrigger value="transfer">
                            Transfer
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="expense">
                        <CreateExpenseForm />
                    </TabsContent>
                    <TabsContent value="income">
                        <CreateIncomeForm />
                    </TabsContent>
                    <TabsContent value="transfer">
                        <CreateTransferForm />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}