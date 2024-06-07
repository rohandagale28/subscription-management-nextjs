import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";

interface SubCardProps {
    title: string;
    icon: string;
    method: string;
    amount: number;
    date: Date;
}

const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
};

export const SubscriptionCard: React.FC<SubCardProps> = ({ title, icon, method, amount, date }) => {
    return (
        <Card className="main-card w-full h-28 p-4 flex flex-col justify-between">
            <CardTitle className="flex flex-row gap-4 pt-0 w-full">
                <div>
                    <h3 className="capitalize">{title}</h3>
                </div>
                {/* <div>
                    <Image src={icon} height={18} width={18} alt={`${title} image`} />
                </div> */}
                <div>
                    M
                </div>
            </CardTitle>
            <CardContent className="flex flex-row justify-between p-0">
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold">Total Spend: ${amount}</h3>
                    <h4 className="text-xs">Method: {method}</h4>
                </div>
                <div className="flex flex-col items-end">
                    <h3 className="text-sm font-semibold">${amount / 12} / Month</h3>
                    <h6 className="text-xs">Starting: {formatDate(date)}</h6>
                </div>
            </CardContent>
        </Card>
    );
};
