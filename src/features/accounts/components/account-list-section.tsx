"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAccounts } from "../api/get-accounts";
import { AccountCard } from "./account-card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useAccountStore } from "../store/account-store";
import { useEffect } from "react";
import { CreateAccount } from "./create-account";
import { AccountCardSkeleton } from "./account-card-skeleton";

export const AccountListSection = () => {
    const getAccounts = useGetAccounts();
    const initialize = useAccountStore((s) => s.initialize);
    useEffect(() => {
        if (getAccounts.isSuccess) {
            initialize((getAccounts.data || []).map((a) => a.id));
        }
    }, [getAccounts.isSuccess]);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>List of accounts</CardTitle>
            </CardHeader>
            <CardContent>
                {getAccounts.isPending ? (
                    <div className="flex justify-between gap-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <AccountCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full h-full mb-2">
                            {getAccounts.data?.map((account) => {
                                return (
                                    <AccountCard key={account.id} account={account} />
                                )
                            })}
                        </div>
                        <CreateAccount
                            trigger={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-full"
                                >
                                    <PlusIcon />
                                    <span className="font-normal text-muted-foreground">Add another account</span>
                                </Button>
                            }
                        />
                    </>
                )}
            </CardContent>
        </Card>
    );
}