'use client'
import React, { useCallback, useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { GithubAuth } from './GithubAuthButton';
import { Label } from "@/components/ui/label";
import { Card, CardTitle } from '@/components/ui/card';
import { GoogleAuth } from './GoogleAuthButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { validateEmail } from '@/lib/lib';
import { useToast } from '@/components/ui/use-toast';
import { InputDemo } from '@/app/component/Input';
import { BackButton } from '@/app/component/auth/back-button';

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
    serverError: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, errors, onChange, onSubmit, serverError }) => (
    <form className='h-auto flex flex-col items-center justify-center rounded-md gap-y-0 pt-4 w-full position-relative box-border transition-all' onSubmit={onSubmit}>
        <div className='w-full flex flex-col gap-1'>
            <Label className='px-[2px]'>Email</Label>
            <InputDemo type="email" placeholder="example@gmail.com" value={formData.email} onChange={onChange} name="email" aria-label='email' autoFocus />
            <p className='text-xs py-[6px] px-1 text-destructive min-h-4'>{errors.email}</p>
        </div>
        <div className='w-full flex flex-col gap-1'>
            <Label className='px-[2px]'>Password</Label>
            <InputDemo type="password" placeholder="••••••" value={formData.password} onChange={onChange} name="password" aria-label='password'
                className={`${serverError == true ? "border-destructive focus-visible:ring-1 focus-visible:ring-destructive  bg-[#FA0000] bg-opacity-10" : ""}`} />
            <div className='flex flex-row justify-between py-[4px]'>
                <p className='text-xs px-1 text-destructive min-h-4'>{errors.password}</p>
                {errors.password ? <></> : <><button className='text-xs text-muted-foreground hover:text-primary'>Forgot password?</button></>}
            </div>
        </div>
        <div className='flex flex-col items-center justify-center py-4 w-full'>
            <Button type="submit" className='w-full'>Login</Button>
        </div>
    </form>
);

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const [errors, setErrors] = useState<Errors>({ email: '', password: '' });
    const [serverError, setServerError] = useState(false)

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
            const passwordError = value.length === 0 ? "" : value.trim().length < 6 ? 'Password must be 6 characters long' : ''
            setServerError(false)
            setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
        }
    }, []);

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        const { email, password } = formData;
        const emailError = !email.trim() || !validateEmail(email) ? 'Please enter a valid email' : '';
        const passwordError = password.trim().length < 6 ? 'Password must be 6 characters long' : '';

        setErrors({ email: emailError, password: passwordError });

        if (!emailError && !passwordError) {
            const res: any = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            })
            if (res?.status === 401) {
                toast({
                    variant: "destructive",
                    title: "Invalid Credential",
                    description: "Please try again",
                });
                setServerError(true)
            } else if (res?.status === 200) {
                toast({
                    title: "Login successful",
                    description: "You have successfully logged in",
                    // action: <ToastAction altText="Go to dashboard">Go</ToastAction>,
                });
                setFormData({ email: "", password: "" })
                setServerError(false)
                router.push("/dashboard");
            }
            else {
                toast({
                    title: "something went wrong",
                    description: "Internal server error",
                    // action: <ToastAction altText="Go to dashboard">Go</ToastAction>,
                });
            }
        }
    }, [formData, router, toast]);

    return (
        <div className='flex min-h-screen flex-col items-center justify-center w-full position-relative'>
            <Card className='border-none bg-transparent shadow-none w-[22.8rem]'>
                <CardTitle className='w-full text-center text-2xl '>Welcome back to Scription</CardTitle>
                <div className='flex h-auto p-8 flex-col items-center justify-center w-full position-relative box-border'>
                    <LoginForm formData={formData} errors={errors} onChange={handleChange} onSubmit={handleSubmit} serverError={serverError} />
                    <div className='flex flex-row flex-1 items-center justify-center w-full position-relative box-border gap-0 py-4'>
                        <div className='h-[1px] bg-secondary w-full' />
                        <div className='px-2 text-center text-muted-foreground text-sm'>Or</div>
                        <div className='h-[1px] bg-muted w-full' />
                    </div>
                    <div className='flex flex-row items-center justify-center w-full position-relative box-border gap-6'>
                        <div className='w-full'><GithubAuth /></div>
                        <div className='w-full'><GoogleAuth /></div>
                    </div>
                </div>
                <div className='py-2'>
                    <BackButton href="/signup" variant='link' className="flex flex-row gap-1 align-center justify-center w-full">
                        <div className='text-muted-foreground hover:text-primary text-xs hover:underline'>Don&#39;t have an account? <span className='text-primary'>Sign up</span></div>
                    </BackButton>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
