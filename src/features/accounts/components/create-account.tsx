"use client"

import { useUIStore } from "@/components/store/ui-store";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { CreateAccountInput, createAccountInputSchema, useCreateAccount } from "../api/create-account";

export const CreateAccount = ({
    trigger
}: {
    trigger: React.ReactNode
}) => {
    const isOpen = useUIStore((s) => s.isOpen("create-account"));
    const { open, close } = useUIStore();
    const createAccount = useCreateAccount();

    const form = useForm<CreateAccountInput>({
        resolver: zodResolver(createAccountInputSchema) as Resolver<CreateAccountInput>,
        defaultValues: {
            name: "",
            balance: 0
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={(openValue) => openValue ? open("create-account") : close("create-account")}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form
                        onSubmit={
                            form.handleSubmit((values) => {
                                createAccount.mutate({
                                    data: values
                                });
                                form.reset();
                            })
                        }
                        className="space-y-4"
                    >
                        <DialogHeader>
                            <DialogTitle>Add account</DialogTitle>
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
                            name="balance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Balance</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            {createAccount.isPending ? (
                                <Button disabled>
                                    <Loader2Icon className="animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit">Create account</Button>
                            )}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}