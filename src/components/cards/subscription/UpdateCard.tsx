import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { InputDemo } from "@/app/component/Input";
import { useSession } from "next-auth/react";
import { toast } from "../../ui/use-toast";
import axios from "axios";
import { Card } from "../../ui/card";
import AddCardIcon from '../../../../public/assets/icons/add-circle.svg';
import { DropDownSelect } from "./DropDownSelect";

const platformSelectOptions: string[] = ["netflix", "amazon", "appletv", "github", "Spotify", "Google Drive"];
const methodSelectOptions: string[] = ['annually', 'monthly'];

export default function CreateCardDialog({ onCardCreated }: any) {
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Card className="main-card w-full h-28 p-4 flex flex-col justify-center items-center relative cursor-pointer">
                    <div className="h-8 w-8">
                        <AddCardIcon />
                    </div>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Subscription</DialogTitle>
                    <DialogDescription>
                        Add a new subscription to your account. It will notify you when the expiry is near.
                    </DialogDescription>
                </DialogHeader>
                <CreateForm setOpen={setOpen} onCardCreated={onCardCreated} />
            </DialogContent>
        </Dialog>
    );
}

interface ProfileFormProps {
    setOpen: (open: boolean) => void;
    onCardCreated: () => void;
}

interface FormDataProps {
    platform: string,
    method: string,
    userId: string,
    amount: number | null
}

function CreateForm({ setOpen, onCardCreated }: ProfileFormProps) {
    const { data: session } = useSession();

    const id: any = session?.user
    const userId = id.id as string

    const [formData, setFormData] = React.useState<FormDataProps>({
        platform: "",
        method: "",
        userId: userId,
        amount: null
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
            amount: parseFloat(value) || null,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/card/create', formData);
            if (response.status === 201) {
                toast({
                    title: "Platform created successfully",
                    description: "Your subscription has been added."
                });
                setOpen(false);
                onCardCreated()
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
            <div className="grid gap-2 grif-flow-auto">
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
            <Button type="submit">Create</Button>
        </form>
    );
}
