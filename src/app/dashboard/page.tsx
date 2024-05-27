"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/lib';


const DashboardPage: React.FC = () => {
    const { data: session, status } = useSession()
    const manulSession = getSession()
    const router = useRouter()

    if (!manulSession) {
        router.push("/login")
        return (
            <>
                please login first
            </>
        )
    }

    

    return (
        <div>

        </div>
    )
}

export default DashboardPage