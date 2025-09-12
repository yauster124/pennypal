"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAccounts } from "../api/get-accounts";
import { AccountCard } from "./account-card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const AccountListSection = () => {
    const getAccounts = useGetAccounts();

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>List of accounts</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full h-full mb-2">
                    {getAccounts.data?.map((account) => {
                        return (
                            <AccountCard account={account} />
                        )
                    })}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-full"
                >
                    <PlusIcon />
                    <span className="font-normal text-muted-foreground">Add another account</span>
                </Button>
            </CardContent>
        </Card>
    );
}