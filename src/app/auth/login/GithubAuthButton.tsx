"use client"
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import GithubLogoDark from '../../../assets/icons/github-logo-dark.svg';
import GithubLogoLight from '../../../assets/icons/github-logo-light.svg';
import Image from "next/image";
import { useTheme } from "next-themes";

export const GithubAuth = () => {
  const { status } = useSession();
  const { theme } = useTheme();

  const GithubLogo = theme !== "light" ? GithubLogoLight : GithubLogoDark;

  const handleSignIn = () => {
    signIn("github");
  };

  return (
    <Button
      disabled={status === "loading"}
      className={`${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} w-full flex flex-row gap-2 justify-center align-center font-bold`}
      onClick={handleSignIn}>
      <div>
        <Image src={GithubLogo} height={20} width={20} alt='github logo' />
      </div>
      <p>Github</p>
    </Button>
  );
};
