'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { SubscriptionCard } from '@/components/cards/subscription/SubscriptionCard';
import axios from 'axios';
import CreateCardDialog from '@/components/cards/subscription/CreateNewCard';
import { ExpenditureCard } from '@/components/cards/main/ExpenditureCard';

interface MenuItem {
    id: number;
    name: string;
    image: string;
    method: string;
    amount: number;
}

const DashboardPage: React.FC = () => {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<MenuItem[]>([]);
    const [monthlyExpenditure, setMonthlyExpenditure] = useState(0);
    const [annualExpenditure, setAnnualExpenditure] = useState(0);
    const [oneTimeExpenditure, setOneTimeExpenditure] = useState(0);

    const getData = async () => {
        try {
            const response = await axios.post('api/card/data', { userId: session?.user?.id });
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

    useEffect(() => {
        const calculateExpenditure = () => {
            const totals = userData.reduce((acc, currentValue) => {
                switch (currentValue.method.toLowerCase()) {
                    case 'monthly':
                        acc.monthly += currentValue.amount;
                        acc.annual += currentValue.amount * 12;
                        break;
                    case 'annually':
                        acc.annual += currentValue.amount;
                        // acc.monthly += currentValue.amount / 12;
                        break;
                    case 'onetime':
                        acc.oneTime += currentValue.amount;
                        break;
                    default:
                        break;
                }
                return acc;
            }, { monthly: 0, annual: 0, oneTime: 0 });

            setMonthlyExpenditure(totals.monthly);
            setAnnualExpenditure(totals.annual);
            setOneTimeExpenditure(totals.oneTime);
        };
        if (userData.length > 0) {
            calculateExpenditure();
        }
    }, [userData]);

    return (
        <div className="main-panel flex flex-col w-full h-auto px-8 gap-8">
            <div>
                <p className='font-semibold text-lg tracking-tight'>Track Your Expenditure</p>
                <div className='text-sm tracking-tight'>Create subscription and get notified before it ends</div>
            </div>
            <div className='secondary-panel w-full grid gap-4 grid-rows-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-auto-flow'>
                <ExpenditureCard title="Overall Monthly Expenditure" icon={''} method={'Monthly'} amount={monthlyExpenditure} date={undefined} id={''} />
                <ExpenditureCard title="Overall Annual Expenditure" icon={''} method={'Annually'} amount={annualExpenditure} date={undefined} id={''} />
                <ExpenditureCard title="Overall OneTime Expenditure" icon={''} method={'OneTime'} amount={oneTimeExpenditure} date={undefined} id={''} />
            </div>
            <div className='primary-panel w-full grid gap-4 grid-rows-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-auto-flow'>
                {userData.map((item) => (
                    <React.Fragment key={item.id}>
                        <SubscriptionCard id={item.id} title={item.name} icon={item.image} method={item.method} amount={item.amount} date={new Date()} getData={getData} />
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
