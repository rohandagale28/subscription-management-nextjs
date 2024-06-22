'use client'
import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SubscriptionCardMenu } from "./SubscriptionCardMenu";
import GithubIcon from '../../../../public/assets/icons/logo-github.svg';
import AmazonIcon from '../../../../public/assets/icons/logo-amazon.svg';
import AppleIcon from '../../../../public/assets/icons/logo-apple.svg';
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { DropDownSelect } from "./DropDownSelect";
import { InputDemo } from "@/app/component/Input";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";

export interface SubCardProps {
    platform: string;
    icon: string;
    method: string;
    amount: number;
    date: Date;
    id: string;
    getData: () => void;
}

interface UpdateFormProps {
    setOpen: (open: boolean) => void;
    onCardCreated: () => void;
    data: SubCardProps;
    getData: () => void;
}

const iconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    github: GithubIcon,
    amazon: AmazonIcon,
    appletv: AppleIcon,
};

const platformSelectOptions: string[] = ["netflix", "amazon", "appletv", "github", "Spotify", "Google Drive"];
const methodSelectOptions: string[] = ['annually', 'monthly'];

const UpdateForm: React.FC<UpdateFormProps> = ({ setOpen, onCardCreated, data, getData }) => {
    const { data: session } = useSession();

    const demo: any = session?.user;
    const userId = demo.id as string;

    const [formData, setFormData] = useState({
        platform: data.platform,
        method: data.method,
        amount: data.amount,
        date: data.date,
        id: data.id,
    });

    const handleSelectChange = (field: keyof typeof formData, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            amount: parseFloat(value) || 0,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/card/update', formData);
            if (response.status === 200) {
                toast({
                    title: "Platform updated successfully",
                    description: "Your subscription has been added."
                });
                setOpen(false);
                getData();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form className={cn("grid items-start gap-4")} onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="platform">Platform</Label>
                    <DropDownSelect
                        value={formData.platform}
                        onValueChange={(value: string) => handleSelectChange('platform', value)}
                        field={platformSelectOptions}
                        placeholder="Select a Platform"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="method">Method</Label>
                    <DropDownSelect
                        value={formData.method}
                        onValueChange={(value: string) => handleSelectChange('method', value)}
                        field={methodSelectOptions}
                        placeholder="Select a Method"
                    />
                </div>
            </div>
            <div className="grid gap-2 grid-flow-auto">
                <Label htmlFor="amount">Amount</Label>
                <InputDemo
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={handleAmountChange}
                    name="amount"
                    aria-label='amount'
                />
            </div>
            <Button type="submit">Save changes</Button>
        </form>
    );
};

export const  SubscriptionCard: React.FC<SubCardProps> = ({ platform, icon, method, amount, date, id, getData }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    console.log(platform)

    const isMonthly = method === "monthly";
    const expense = isMonthly ? Math.round(amount * 12) : Math.round(amount / 12);
    const period = isMonthly ? "Month" : "Year";

    const IconComponent = iconComponents[icon];

    const handleClick = () => {
        router.push(`/dashboard/edit/${id}`);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Card className="main-card w-full h-28 p-4 flex flex-col justify-between relative cursor-pointer" onClick={handleClick}>
                <CardTitle className="flex flex-row gap-4 pt-0 w-full items-center">
                    <div className="flex flex-row">
                        <h3 className="capitalize">{platform}</h3>
                    </div>
                    <div className="h-4 w-4 flex flex-row">
                        {IconComponent && <IconComponent />}
                    </div>
                    <div className="w-10">
                        <SubscriptionCardMenu id={id} getData={getData} open={open} onOpenChange={setOpen} />
                    </div>
                </CardTitle>
                <CardContent className="flex flex-row justify-between p-0">
                    <div className="flex flex-col">
                        <h3 className="text-sm">
                            <span className="text-accent-foreground">{isMonthly ? 'Annual' : 'Monthly'}:</span>{' '}
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Subscription</DialogTitle>
                    <DialogDescription>
                        Add a new subscription to your account. It will notify you when the expiry is near.
                    </DialogDescription>
                </DialogHeader>
                <UpdateForm setOpen={setOpen} onCardCreated={() => { }} getData={getData} data={{ platform, icon, method, amount, date, id, getData }} />
            </DialogContent>
        </Dialog>
    );
};
