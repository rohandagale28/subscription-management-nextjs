'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { InputDemo } from '../../component/Input'
import { Button } from '@/components/ui/button';
import { GithubAuth } from './GithubAuthButton'
import { Label } from "@/components/ui/label"
import { Card } from '@/components/ui/card';
import { isValidEmail } from '@/lib/regex';
import { GoogleAuth } from './GoogleAuthButton';
import { BackButton } from '../../component/auth/back-button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getSession, login } from '@/lib/lib';
import axios from 'axios';


const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        const session = getSession();

        if (status === "authenticated" || session === null) {
            router.push('/dashboard');
        }
    }, [router, status]);

    const handleChange = useCallback((e: { target: { value: string; name: string }; }) => {
        const { name, value } = e.target;

        if (name === "email") {
            const emailError = !value.trim() || !isValidEmail(value) ? 'Please enter a valid email' : '';
            setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
        }

        if (name === "password") {
            const passwordError = value.trim().length < 6 ? 'Password must be 6 characters long' : '';
            setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
        }

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e: {
        preventDefault: () => void;
    }) => {
        e.preventDefault();

        const { email, password } = formData;

        const emailError = !email.trim() || !isValidEmail(email) ? 'Please enter a valid email' : '';
        const passwordError = password.trim().length < 6 ? 'Password must be 6 characters long' : '';

        setErrors({ email: emailError, password: passwordError });

        if (!emailError && !passwordError) {
            await login(formData);
            router.push('/dashboard');
        }
        const response = await axios.post('/api/user/login', formData)
        console.log("signup scuccess")
        console.log(response)
        // router.push('/dashboard')
    }, [formData, router]);

    console.log("login component rerendered")

    return (
        <div className='flex min-h-screen flex-col items-center justify-center w-full position-relative'>
            <Card title='welcome back' className='border-none  bg-transparent shadow-none'>
                <BackButton href="/" variant='link' className="flex flex-row gap-1 pt-6 align-start justify-start">
                    <div className='w-[18px] h-[18px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="48" d="M328 112L184 256l144 144" />
                        </svg>
                    </div>
                    <div className='pt-[2px] '>
                        Back
                    </div>
                </BackButton>
                <div className='flex h-auto p-8 flex-col items-center justify-center w-full position-relative box-border'>
                    <form className='h-auto flex flex-col items-center justify-center rounded-md gap-y-0 w-full position-relative box-border  transition-all' onSubmit={handleSubmit}>
                        <div className='w-[18rem]'>
                            <Label>Email</Label>
                            <InputDemo type="email" placeholder="example@gmail.com" value={formData.email} onChange={handleChange} name="email" autoFocus />
                            <p className='text-xs py-[6px] px-1 text-destructive min-h-5'>{errors.email}</p>
                        </div>
                        <div className='w-[18rem]'>
                            <Label className='py-[4px]'>Password</Label>
                            <InputDemo type="password" placeholder="••••••" value={formData.password} onChange={handleChange} name="password" />
                            <div className='flex flex-row justify-between py-[6px]'>
                                <p className='text-xs  px-1 text-destructive min-h-5'>{errors.password}</p>
                                <button className='text-xs text-muted-foreground hover:text-primary '>Forgot password?</button>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center py-2 w-full'>
                            <Button type="submit" className='w-full'>Login</Button>
                        </div>
                    </form>
                    <div className='flex flex-row flex-1 items-center justify-center w-full position-relative box-border gap-0 py-6'>
                        <div className='h-[1px]  bg-black w-full bg-primary' />
                        <div className='w-full text-center text-muted-foreground text-sm '>
                            continue with
                        </div>
                        <div className='h-[1px] bg-black w-[100%] bg-primary' />
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
                <div className='py-2'>
                    <BackButton href="/register" variant='link' className="flex flex-row gap-1 align-center justify-center w-full">
                        <div className='text-muted-foreground hover:text-primary text-xs'>
                            Don&#39;t have an account?
                        </div>
                    </BackButton>
                </div>
            </Card >
        </div >
    )
}

export default LoginPage;