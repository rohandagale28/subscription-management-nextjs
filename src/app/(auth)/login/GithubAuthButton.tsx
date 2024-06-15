"use client"
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import GithubIconDark from '../../../../public/assets/icons/github-logo-dark.svg'

export const GithubAuth = () => {
  const { status } = useSession();

  const handleSignIn = async () => {
    await signIn("github");
  };

  return (
    <Button
      disabled={status === "loading"}
      className={`${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} w-full flex flex-row gap-2 justify-center align-center`}
      onClick={handleSignIn}>
      <div className="h-4 w-4">
        <GithubIconDark />
      </div>
      <p>Github</p>
    </Button>
  );
};
