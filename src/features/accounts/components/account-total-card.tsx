import { format, subMonths } from "date-fns";
import { useGetAccountValues } from "../api/get-account-values";
import { Card, CardAction, CardDescription, CardHeader } from "@/components/ui/card";
import { NumberDisplay } from "@/components/ui/number-display";
import { Badge } from "@/components/ui/badge";
import { Loader2Icon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const AccountTotalCard = ({
    className
}: {
    className?: string
}) => {
    const getAccountValues = useGetAccountValues(
        { startDate: format(subMonths(new Date(), 1), "yyyy-MM-dd") },
        { placeholderData: (prev) => prev }
    );
    const prevTotalValue = getAccountValues.data?.at(0)?.["Total"] ?? "0";
    const currTotalValue = getAccountValues.data?.at(-1)?.["Total"] ?? "0";
    const totalPercentage = (((Number(currTotalValue) - Number(prevTotalValue)) / Number(prevTotalValue)) * 100).toFixed(2);
    const increasing = Number(totalPercentage) > 0;

    return (
        <>
            {
                getAccountValues.data ? (
                    <Card className={className}>
                        <CardHeader>
                            <CardDescription>Total Balance</CardDescription>
                            <NumberDisplay
                                amount={getAccountValues.data.at(-1)?.["Total"] ?? "0"}
                                animate={true}
                                dynamicColour={false}
                                format={false}
                            />
                            <CardAction>
                                <Badge variant="outline">
                                    {increasing && (
                                        <TrendingUpIcon className={"stroke-constructive"} />
                                    )}
                                    {!increasing && Number(totalPercentage) !== 0 && (
                                        <TrendingDownIcon className="stroke-destructive" />
                                    )}
                                    <span className={cn(
                                        increasing && "text-constructive",
                                        !increasing && Number(totalPercentage) !== 0 && "text-destructive"
                                    )}>
                                        {Number(totalPercentage) > 0 ? "+" : ""}
                                        {totalPercentage}%
                                    </span>
                                    <span className="font-normal text-muted-foreground">
                                        from last month
                                    </span>
                                </Badge>
                            </CardAction>
                        </CardHeader>
                    </Card>
                ) : (
                    <div className="flex justify-center">
                        <Loader2Icon className="animate-spin" />
                    </div >
                )
            }
        </>
    )
}