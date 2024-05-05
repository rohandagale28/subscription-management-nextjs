"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const DashboardPage: React.FC = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === "unauthenticated") {
        router.push("/login")
        return (
            <>
                please login first
            </>
        )
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {session?.user?.name}</p>
        </div>
    )
}

export default DashboardPage