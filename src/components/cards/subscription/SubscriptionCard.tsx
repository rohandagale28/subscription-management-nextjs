import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SubscriptionCardMenu } from "./SubscriptionCardMenu";
import GithubIcon from '../../../../public/assets/icons/logo-github.svg';
import AmazonIcon from '../../../../public/assets/icons/logo-amazon.svg';
import AppleIcon from '../../../../public/assets/icons/logo-apple.svg';

interface SubCardProps {
    title: string;
    icon: string;
    method: string;
    amount: number;
    date: Date;
    id: string;
    getData: () => void;
}

// Map of icon names to imported components
const iconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    github: GithubIcon,
    amazon: AmazonIcon,
    appletv: AppleIcon,
};

const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
};

export const SubscriptionCard: React.FC<SubCardProps> = ({ title, icon, method, amount, date, id, getData }) => {
    const isMonthly = method === "monthly";
    const expense = isMonthly ? Math.round(amount * 12) : Math.round(amount / 12);
    const period = isMonthly ? "Month" : "Year";

    // Get the icon component based on the `icon` prop value
    const IconComponent = iconComponents[icon];

    return (
        <Card className="main-card w-full h-28 p-4 flex flex-col justify-between relative">
            <CardTitle className="flex flex-row gap-4 pt-0 w-full">
                <div>
                    <h3 className="capitalize">{title}</h3>
                </div>
                <div className="h-4 w-4">
                    {IconComponent && <IconComponent />}
                </div>
                <div className="w-10">
                    <SubscriptionCardMenu id={id} getData={getData} />
                </div>
            </CardTitle>
            <CardContent className="flex flex-row justify-between p-0">
                <div className="flex flex-col">
                    <h3 className="text-sm">
                        <span className="text-accent-foreground">{isMonthly ? <>Annual</> : <>Monthly</>}:</span>{' '}
                        <span className="font-semibold">₹ {expense}</span>
                    </h3>
                    <h4 className="text-xs capitalize">
                        <span className="text-accent-foreground">Method:</span> {method}
                    </h4>
                </div>
                <div className="flex flex-col items-end">
                    <h3 className="text-sm">
                        <span className="font-semibold">₹ {amount}</span> / {period}
                    </h3>
                    <h6 className="text-xs">
                        <span className="text-accent-foreground">Ending:</span> {formatDate(date)}
                    </h6>
                </div>
            </CardContent>
        </Card>
    );
};
