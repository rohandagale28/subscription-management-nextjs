"use client"
import React, { useState } from 'react'
import { InputDemo } from '../../component/Input'
import { Button } from '@/components/ui/button';
import { GithubAuth } from '../login/GithubAuthButton'
import { Label } from "@/components/ui/label"
import { Card } from '@/components/ui/card';
import { isValidEmail } from '@/lib/regex';
import { GoogleAuth } from '../login/GoogleAuthButton';
import { BackButton } from '../../component/auth/back-button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignUpPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const { status } = useSession()
    const router = useRouter()

    if (status === "authenticated") {
        router.push("/dashboard")
    }


    const handleChange = (e: { target: { value: string; name: string }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const emailError = !formData.email.trim() || !isValidEmail(formData.email) ? 'Please enter a valid email' : '';
            const passwordError = !formData.password.trim() ? 'Please enter your password' : '';

            setErrors({ email: emailError, password: passwordError });

            if (!emailError && !passwordError) {
                console.log(formData);
            }
            const response = await axios.post('/api/user/signup', formData)
            console.log("signup scuccess")
            console.log(response)
            router.push('/login')
        } catch (error) {
            console.log("signup failed")
        }
    };

    return (
        <div className='flex min-h-screen flex-col items-center justify-center w-full position-relative'>
            <Card title='welcome back' className='border-none'>
                <BackButton href="/" variant='link' className="flex flex-row gap-1 pt-6 align-center justify-center">
                    <div className='w-[18px] h-[18px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="48" d="M328 112L184 256l144 144" />
                        </svg>
                    </div>
                    <div className='pt-[2px]'>
                        Back
                    </div>
                </BackButton>
                <div className='flex h-auto p-8 flex-col items-center justify-center w-full position-relative box-border'>
                    <form className='h-auto flex flex-col items-center justify-center rounded-md gap-y-0 w-full position-relative box-border' onSubmit={handleSubmit}>
                        <div className='w-[18rem]'>
                            <Label>Email</Label>
                            <InputDemo type="email" placeholder="example@gmail.com" value={formData.email} onChange={handleChange} name="email" />
                            <p className='text-xs py-[6px] px-1 text-destructive min-h-5'>{errors.email}</p>
                        </div>
                        <div className='w-[18rem]'>
                            <Label className='py-[4px]'>Password</Label>
                            <InputDemo type="password" placeholder="••••••" value={formData.password} onChange={handleChange} name="password" />
                            <p className='text-xs py-[6px] px-1 text-destructive min-h-5'>{errors.password}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center py-2 w-full'>
                            <Button type="submit" className='w-full'>Login</Button>
                        </div>
                    </form>
                    <div className='flex flex-row items-center justify-center w-full position-relative box-border gap-0 py-4'>
                        <div className='h-[1px] bg-black w-full bg-[#909090]' />
                        <div className='w-full text-center text-[#606060] text-sm'>
                            login with
                        </div>
                        <div className='h-[1px] bg-black w-full bg-[#909090]' />
                    </div>
                    <div className='flex flex-row items-center justify-center w-full position-relative box-border gap-8'>
                        <div className='w-full'>
                            <GithubAuth />
                        </div>
                        <div className='w-full'>
                            <GoogleAuth />
                        </div>
                    </div>
                </div>
            </Card>
        </div >
    )
}

export default SignUpPage;