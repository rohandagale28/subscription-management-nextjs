'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/lib';
import { SubscriptionCard } from '@/components/cards/SubscriptionCard';
import CreateNewCard from '@/components/cards/CreateNewCard';
import axios from 'axios';

interface MenuItem {
    id: number;
    name: string;
    image: string;
    method: string;
    amount: number;
}

const DashboardPage: React.FC = () => {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState([]); // Changed data to userData and added correct type
    const router = useRouter();

    console.log(session?.user); // Check if session exists before accessing user._id

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.post('api/card/data', { userId: session?.user?.id });
                console.log(response)// Added the generic type for the response
                setUserData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (session) {
            getData();
        }
    }, [session]); // Only trigger when session changes

    //Dashboard HOME 
    return (
        <div className="main-panel flex flex-col w-full h-auto px-8 ">
            <div className='primary-panel  w-full grid gap-4 grid-rows-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-auto-flow '>
                {userData && userData.map((item: any) => { // Removed data && check
                    return (
                        <React.Fragment key={item._id}>
                            <SubscriptionCard id={item._id} title={item?.name} icon={item.image} method={item.method} amount={item.amount} date={new Date()} />
                        </React.Fragment>
                    )
                })}
                <div onClick={() => { router.push("/dashboard/create-card") }}>
                    <CreateNewCard />
                </div>
            </div>
            <div className='secondary-panel' >

            </div>
        </div>
    );
};

export default DashboardPage;
