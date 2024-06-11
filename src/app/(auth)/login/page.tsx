'use client'
import React, { useCallback, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { InputDemo } from '../../component/Input';
import { Button } from '@/components/ui/button';
import { GithubAuth } from './GithubAuthButton';
import { Label } from "@/components/ui/label";
import { Card } from '@/components/ui/card';
import { GoogleAuth } from './GoogleAuthButton';
import { BackButton } from '../../component/auth/back-button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getSession, validateEmail } from '@/lib/lib';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast"


interface FormData {
    email: string;
    password: string;
}

interface Errors {
    email: string;
    password: string;
}

interface LoginFormProps {
    formData: FormData;
    errors: Errors;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, errors, onChange, onSubmit }) => (
    <form className='h-auto flex flex-col items-center justify-center rounded-md gap-y-0 w-full position-relative box-border transition-all' onSubmit={onSubmit}>
        <div className='w-[18rem]'>
            <Label>Email</Label>
            <InputDemo type="email" placeholder="example@gmail.com" value={formData.email} onChange={onChange} name="email" aria-label='email' autoFocus />
            <p className='text-xs py-[6px] px-1 text-destructive min-h-5'>{errors.email}</p>
        </div>
        <div className='w-[18rem]'>
            <Label className='py-[4px]'>Password</Label>
            <InputDemo type="password" placeholder="••••••" value={formData.password} onChange={onChange} name="password" aria-label='password' />
            <div className='flex flex-row justify-between py-[6px]'>
                <p className='text-xs px-1 text-destructive min-h-5'>{errors.password}</p>
                <button className='text-xs text-muted-foreground hover:text-primary'>Forgot password?</button>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center py-2 w-full'>
            <Button type="submit" className='w-full'>Login</Button>
        </div>
    </form>
);

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const [errors, setErrors] = useState<Errors>({ email: '', password: '' });

    const router = useRouter();
    const { toast } = useToast()

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

        if (name === "email") {
            const emailError = !value.trim() || !validateEmail(value) ? 'Please enter a valid email' : '';
            setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
        }

        if (name === "password") {
            const passwordError = value.trim().length < 6 ? 'Password must be 6 characters long' : '';
            setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
        }
    }, []);

    // const handleSubmit = useCallback(async (e: FormEvent) => {
    // e.preventDefault();

    // const { email, password } = formData;
    // const emailError = !email.trim() || !validateEmail(email) ? 'Please enter a valid email' : '';
    // const passwordError = password.trim().length < 6 ? 'Password must be 6 characters long' : '';

    // setErrors({ email: emailError, password: passwordError });

    // if (!emailError && !passwordError) {
    //     try {
    //         const response = await axios.post('/api/user/login', formData);
    //         console.log(response)
    //         if (response.status === 200) {
    //             toast({
    //                 title: "Login successfull",
    //                 description: "Go to dashboard",
    //                 action: (
    //                     <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
    //                 ),
    //             })
    //             setFormData({ email: "", password: "" })
    //             router.push("/dashboard")
    //         }
    //     } catch (error: any) {
    //         console.log(error.response.status)
    //         if (error.response.status === 404) {
    //             toast({
    //                 title: "User does not exist",
    //                 description: "Please SignUp first",
    //                 action: (
    //                     <ToastAction altText="Goto schedule to undo"><Button>Signup</Button></ToastAction>
    //                 ),
    //             })
    //         } else {
    //             toast({
    //                 title: "Wrong password",
    //                 description: "Please check your password",
    //                 action: (
    //                     <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
    //                 ),
    //             })
    //         }

    //     }
    // }
    //     await signIn('credentials', {
    //         redirect: false,
    //         email: formData.email,
    //         password: formData.password,
    //     });
    // }, [formData, router]);
    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        const { email, password } = formData;
        const emailError = !email.trim() || !validateEmail(email) ? 'Please enter a valid email' : '';
        const passwordError = password.trim().length < 6 ? 'Password must be 6 characters long' : '';

        setErrors({ email: emailError, password: passwordError });

        if (!emailError && !passwordError) {
            const result = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });
            console.log(result)
            if (result?.error) {
                toast({
                    title: "Login failed",
                    description: result.error,
                    action: <ToastAction altText="Retry">Retry</ToastAction>,
                });
            } else {
                toast({
                    title: "Login successful",
                    description: "You have successfully logged in",
                    action: <ToastAction altText="Go to dashboard">Go</ToastAction>,
                });
                router.push("/dashboard");
            }
        }
    }, [formData, router, toast]);
    return (
        <div className='flex min-h-screen flex-col items-center justify-center w-full position-relative'>
            <Card title='welcome back' className='border-none bg-transparent shadow-none'>
                <BackButton href="/" variant='link' className="flex flex-row gap-1 pt-6 align-start justify-start">
                    <div className='w-[18px] h-[18px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M328 112L184 256l144 144" />
                        </svg>
                    </div>
                    <div className='pt-[2px]'>Back</div>
                </BackButton>
                <div className='flex h-auto p-8 flex-col items-center justify-center w-full position-relative box-border'>
                    <LoginForm formData={formData} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />
                    <div className='flex flex-row flex-1 items-center justify-center w-full position-relative box-border gap-0 py-6'>
                        <div className='h-[1px] bg-black w-full bg-primary' />
                        <div className='w-full text-center text-muted-foreground text-sm'>continue with</div>
                        <div className='h-[1px] bg-black w-[100%] bg-primary' />
                    </div>
                    <div className='flex flex-row items-center justify-center w-full position-relative box-border gap-8'>
                        <div className='w-full'><GithubAuth /></div>
                        <div className='w-full'><GoogleAuth /></div>
                    </div>
                </div>
                <div className='py-2'>
                    <BackButton href="/signup" variant='link' className="flex flex-row gap-1 align-center justify-center w-full">
                        <div className='text-muted-foreground hover:text-primary text-xs'>Don&#39;t have an account?</div>
                    </BackButton>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
