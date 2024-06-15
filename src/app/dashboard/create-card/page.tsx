'use client'
import { InputDemo } from '@/app/component/Input'
import { Label } from '@radix-ui/react-label'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { SelectDemo } from '../../../components/cards/subscription/DropDownSelect'
import { SelectDemoMethod } from './Drop_down_method'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { useSession } from 'next-auth/react'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'

interface FormData {
    name: string;
    method: string;
    amount: string;
    userId: string
}

const Page: React.FC = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const id = session?.user?.id
    const [formData, setFormData] = useState<FormData>({
        name: '',
        method: '',
        amount: '',
        userId: id
    });

    const handleChange = (key: keyof FormData) => (value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [key]: value
        }));
    }

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            amount: value
        }));
    }

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/card/create', formData);
            console.log('Form submitted successfully:', response.data);
            if (response.status === 201) {
                toast({
                    title: "Platform created successfully",
                    description: "wow",
                    action: <ToastAction altText="Done">Done</ToastAction>,
                });
                router.push("/dashboard")
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
        <div className='w-full'>
            <form className='flex flex-col gap-2 justify-center items-center w-full' onSubmit={handleFormSubmit}>
                <div className='flex flex-col'>
                    <div className='session-1'>
                        <div className='py-8 w-full text-center text-lg tracking-tight'>
                            Create a New Subscription Plan
                        </div>
                    </div>
                    <div className='session-2 flex flex-row gap-12'>
                        <div className='flex flex-col w-full gap-4'>
                            <div>
                                <Label className='py-2'>Platform</Label>
                                <SelectDemo value={formData.name} onChange={handleChange('name')} />
                            </div>
                            <div>
                                <Label className='py-2'>Method</Label>
                                <SelectDemoMethod value={formData.method} onChange={handleChange('method')} />
                            </div>
                        </div>
                        <div className='flex flex-col w-full'>
                            <div>
                                <Label className='py-2'>Amount</Label>
                                <InputDemo
                                    name='amount'
                                    type='text'
                                    placeholder='$'
                                    value={formData.amount}
                                    onChange={handleAmountChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-4 bg-secondary py-2 px-4 rounded-lg">Add</button>
            </form>
        </div>
    )
}

export default Page
