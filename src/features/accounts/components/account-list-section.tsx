"use client";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAccounts } from "../api/get-accounts";
import { AccountCard } from "./account-card";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useAccountStore } from "../store/account-store";
import { useEffect } from "react";
import { CreateAccount } from "./create-account";
import { AccountCardSkeleton } from "./account-card-skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useGetAccountValues } from "../api/get-account-values";
import { format, subMonths } from "date-fns";
import { NumberDisplay } from "@/components/ui/number-display";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const AccountListSection = () => {
    const getAccounts = useGetAccounts();
    const initialize = useAccountStore((s) => s.initialize);
    useEffect(() => {
        if (getAccounts.isSuccess) {
            initialize((getAccounts.data || []).map((a) => a.id));
        }
    }, [getAccounts.isSuccess, getAccounts.data, initialize]);
    const getAccountValues = useGetAccountValues(
        { startDate: format(subMonths(new Date(), 1), "yyyy-MM-dd") },
        { placeholderData: (prev) => prev }
    );
    const prevTotalValue = getAccountValues.data?.at(0)?.["Total"] ?? "0";
    const currTotalValue = getAccountValues.data?.at(-1)?.["Total"] ?? "0";
    const totalPercentage = (((Number(currTotalValue) - Number(prevTotalValue)) / Number(prevTotalValue)) * 100).toFixed(2);
    const increasing = Number(totalPercentage) > 0;

    return (
        <div className="w-full flex gap-4">
            <div className="w-1/4">
            {getAccountValues.data && (
                <Card>
                    <CardHeader>
                        <CardDescription>Total</CardDescription>
                        <NumberDisplay
                            amount={getAccountValues.data.at(-1)?.["Total"] ?? "0"}
                            animate={true}
                            dynamicColour={false}
                            format={false}
                        />
                        <CardAction>
                            <Badge variant="outline">
                                {increasing || Number(totalPercentage) === 0 ? (
                                    <TrendingUpIcon />
                                ) : (
                                    <TrendingDownIcon />
                                )}
                                <span className={cn(
                                    increasing && "text-constructive",
                                    !increasing && Number(totalPercentage) !== 0 && "text-destructive"
                                )}>
                                    {Number(totalPercentage) > 0 ? "+" : ""}
                                    {totalPercentage}%
                                </span>
                            </Badge>
                        </CardAction>
                    </CardHeader>
                </Card>
            )}
            </div>
            <div className="w-3/4">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="mx-12"
            >
                <CarouselContent>
                    {getAccounts.isPending || getAccountValues.isPending ? (
                        <div className="flex justify-between gap-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <AccountCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {getAccounts.data?.map((account) => {
                                const accountValue = getAccountValues.data?.at(0)?.[account.name] ?? "0";
                                const percentage = (((Number(account.balance) - Number(accountValue)) / Number(accountValue)) * 100).toFixed(2);

                                return (
                                    <CarouselItem
                                        key={account.id}
                                        className="lg:basis-1/2 xl:basis-1/3"
                                    >
                                        <AccountCard
                                            account={account}
                                            percentage={percentage}
                                        />
                                    </CarouselItem>
                                )
                            })}
                        </>
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            </div>
        </div>
    );
}