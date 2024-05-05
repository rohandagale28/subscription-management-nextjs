"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Google_logo_light from '../../../assets/icons/google-logo-light.svg'
import Google_logo_dark from '../../../assets/icons/google-logo-dark.svg'
import { useTheme } from "next-themes";


export function GoogleAuth() {
    const { status } = useSession();
    const { theme } = useTheme();

    const GithubLogo = theme === "light" ? Google_logo_light : Google_logo_dark;

    const handleSignIn = () => {
        signIn("google");
    };


    return (
        <Button
            disabled={status === "loading"}
            className={`${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} w-full flex flex-row gap-2 justify-center align-center font-bold`}
            onClick={handleSignIn}>
            <div>
                <Image src={GithubLogo} height={20} width={20} alt='github logo' />
            </div>
            <p>Google</p>
        </Button>
    );
}
