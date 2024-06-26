'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { useSession } from "next-auth/react";
import { SubscriptionCard } from '@/components/cards/subscription/SubscriptionCard';
import axios from 'axios';
import CreateCardDialog from '@/components/cards/subscription/CreateNewCard';
import { ExpenditureCard } from '@/components/cards/main/ExpenditureCard';
import { CardType } from '@/model/card.model';

const DashboardPage: React.FC = () => {
    const { data: session } = useSession();
    const [userData, setUserData] = useState<CardType[]>([]);

    // @ts-ignore
    const id: any = session?.user?.id;

    const getData = async () => {
        try {
            const response = await axios.get(`api/card/data?id=${id}`);
            setUserData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (session) {
            getData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    const { monthlyExpenditure, annualExpenditure, oneTimeExpenditure } = useMemo(() => {
        const totals = userData.reduce((acc, item) => {
            switch (item.method.toLowerCase()) {
                case 'monthly':
                    acc.monthly += item.amount;
                    acc.annual += item.amount * 12;
                    break;
                case 'annually':
                    acc.annual += item.amount;
                    break;
                case 'onetime':
                    acc.oneTime += item.amount;
                    break;
                default:
                    break;
            }
            return acc;
        }, { monthly: 0, annual: 0, oneTime: 0 });

        return {
            monthlyExpenditure: totals.monthly,
            annualExpenditure: totals.annual,
            oneTimeExpenditure: totals.oneTime,
        };
    }, [userData]);



    return (
        <div className="main-panel flex flex-col w-full h-auto px-8 gap-8">
            <div>
                <p className='font-semibold text-lg tracking-tight'>Track Your Expenditure This is production base deployment</p>
                <div className='text-sm tracking-tight'>Create subscription and get notified before it ends</div>
            </div>
            <div className='secondary-panel w-full grid gap-4 grid-rows-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-auto-flow'>
                <ExpenditureCard title="Overall Monthly Expenditure" icon={''} method={'Monthly'} amount={monthlyExpenditure} id={''} />
                <ExpenditureCard title="Overall Annual Expenditure" icon={''} method={'Annually'} amount={annualExpenditure} id={''} />
                <ExpenditureCard title="Income" icon={''} method={'OneTime'} amount={oneTimeExpenditure} id={''} />
            </div>
            <div className='primary-panel w-full grid gap-4 grid-rows-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-auto-flow'>
                {userData.map((item) => (
                    <React.Fragment key={item._id as string}>
                        <SubscriptionCard id={item._id as string} platform={item.platform} icon={item.image} method={item.method} amount={item.amount} date={new Date()} getData={getData} />
                    </React.Fragment>
                ))}
                <div>
                    <CreateCardDialog onCardCreated={getData} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
