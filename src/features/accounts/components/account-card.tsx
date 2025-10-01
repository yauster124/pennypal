import { Account } from "@/types/api";
import { Card, CardAction, CardDescription, CardHeader } from "@/components/ui/card";
import { NumberDisplay } from "@/components/ui/number-display";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const AccountCard = ({
    account,
    percentage
}: {
    account: Account
    percentage: string
}) => {
    const increasing = Number(percentage) > 0;

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>{account.name}</CardDescription>
                    <NumberDisplay
                        amount={account.balance}
                        animate={true}
                        dynamicColour={false}
                        format={false}
                    />
                <CardAction>
                    <Badge variant="outline">
                        {increasing && (
                            <TrendingUpIcon className={"stroke-constructive"} />
                        )}
                        {!increasing && Number(percentage) !== 0 && (
                            <TrendingDownIcon className="stroke-destructive" />
                        )}
                        <span className={cn(
                            increasing && "text-constructive",
                            !increasing && Number(percentage) !== 0 && "text-destructive"
                        )}>
                            {Number(percentage) > 0 ? "+" : ""}
                            {percentage}%
                        </span>
                        <span className="font-normal text-muted-foreground">
                            from last month
                        </span>
                    </Badge>
                </CardAction>
            </CardHeader>
        </Card>
    )
}