import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";

interface ExpenditureCard {
    title: string;
    icon: string;
    method: string;
    amount: number;
    date: Date;
    id: string
}

const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
};

export const ExpenditureCard: React.FC<ExpenditureCard> = ({ title, icon, method, amount, date, id }) => {
    return (
        <Card className="main-card w-full h-32 p-4 flex flex-col justify-start relative gap-2 ">
            <CardTitle className="flex flex-row gap-4 pt-0 w-full">
                {title}
            </CardTitle>
            <CardContent className="flex flex-row justify-start items-start p-0">
                <div className="flex flex-col">
                    <h1 className="text-sm font-semibold text-accent-foreground">Total Spend: <span className="text-lg text-secondary-foreground hover:scale-110 transform transition duration-1s">₹{Math.round(amount)}</span></h1>
                    {/* <h4 className="text-xs">Method: {method}</h4> */}
                </div>
                <div className="flex flex-col items-end">
                    {/* <h3 className="text-sm font-semibold">${(amount / 12).toFixed(2)} / Month</h3> */}
                    {/* <h6 className="text-xs">Starting: {formatDate(date)}</h6> */}
                </div>
            </CardContent>
        </Card >
    );
};
