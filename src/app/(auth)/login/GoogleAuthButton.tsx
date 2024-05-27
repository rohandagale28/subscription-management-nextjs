"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { GoogleIconDark, GoogleIconLight } from "@/components/svgRender";


export function GoogleAuth() {
    const { status } = useSession();
    const { theme } = useTheme();

    const handleSignIn = () => {
        signIn("google");
    };


    return (
        <Button
            disabled={status === "loading"}
            className={`${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} w-full flex flex-row gap-2 justify-center align-center`}
            onClick={handleSignIn}>
            <div className="w-4 h-4">
                {theme === "light" ? <>
                    <GoogleIconLight />
                </> : <>
                    <GoogleIconDark />
                </>}
            </div>
            <p>Google</p>
        </Button>
    );
}
