"use client"
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { GitHubIconDark, GitHubIconLight } from "@/components/svgRender";

export const GithubAuth = () => {
  const { status } = useSession();
  const { theme } = useTheme();

  const handleSignIn = () => {
    signIn("github");
  };

  return (
    <Button
      disabled={status === "loading"}
      className={`${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} w-full flex flex-row gap-2 justify-center align-center`}
      onClick={handleSignIn}>
      <div className="h-4 w-4">
        {theme === "light" ? <>
          <GitHubIconDark />
        </> : <>
          <GitHubIconLight />
        </>}
      </div>
      <p>Github</p>
    </Button>
  );
};
