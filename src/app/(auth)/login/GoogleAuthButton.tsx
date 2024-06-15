"use client"
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import GoogleIconDark from '../../../../public/assets/icons/google-logo-dark.svg'

export function GoogleAuth() {
    const { status } = useSession();

    const handleSignIn = async () => {
        await signIn("google")
    };

    return (
        <Button
            disabled={status === "loading"}
            className={`${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} w-full flex flex-row gap-2 justify-center align-center`}
            onClick={handleSignIn}>
            <div className="w-4 h-4">
                <GoogleIconDark />
            </div>
            <p>Google</p>
        </Button>
    );
}
