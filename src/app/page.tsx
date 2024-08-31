"use client";
import { SessionProvider, useSession } from "next-auth/react";
import HomeScreen from "./landing/page";
import { useEffect } from "react";
import Image from "next/image";
import BrandLogo from "../../public/assets/icons/scription-logo.png";
import { useRouter } from "next/navigation";

export default function App() {
  const { data: session, status } = useSession();

  useEffect(() => {}, [session]);
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col items-center justify-between box-border">
        <nav className=" w-full absolute top-0 left-0">
          <div className=" h-20 flex flex-row items-center justify-between px-16">
            <div className="flex flex-row gap-2 items-center justify-between">
              <div>
                <Image
                  src={BrandLogo}
                  height={26}
                  width={26}
                  alt="scription logo"
                />
              </div>
              <p>Scription</p>
            </div>
          </div>
        </nav>
        {status === "authenticated" ? (
          <>
            <p>this is Dashboard</p>
            Is verfied and <p> </p>
            {status}
          </>
        ) : (
          <>
            <HomeScreen />
          </>
        )}
      </div>
    </SessionProvider>
  );
}
