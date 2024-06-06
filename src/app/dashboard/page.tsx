"use client"
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/lib';


const DashboardPage: React.FC = () => {
    // const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            console.log('user alreayd exist')
            if (!session) {
                router.push('/login');
            }
        };
        checkSession();
    }, []);


    return (
        <div>
            RohanDagale
        </div>
    )
}

export default DashboardPage