"use client"
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { Logout, ProfileIcon } from '@/app/component/Next-Icon-Component/Icons';
import axios from 'axios';

const DropDownProfiler = () => {
    const { data: session } = useSession();

    const handleSignOut = async () => {
        try {
            await axios.get("/api/user/logout")
        } catch (error) {
            console.log("error")
        }
        signOut();
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='w-full'>
                <div className='w-full cursor-pointer transition-all'>
                    {session ? (
                        <div className='flex flex-row justify-between w-full items-center gap-2 py-[6px] px-2 hover:bg-accent rounded-md cursor-pointer transition-all'>
                            <div className=''>
                                <Image src={session?.user?.image!} alt={session?.user?.name!} height={22} width={22} className='rounded-full' />
                            </div>
                            <div className=''>
                                <p className='text-sm'>{session?.user?.name}</p>
                            </div>
                            <div className='w-4 h-4'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'>
                                    <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M112 184l144 144 144-144' />
                                </svg>
                            </div>
                        </div>
                    ) :
                        <div className='flex flex-row justify-between w-full items-center gap-2  py-[6px] px-2 h-8 bg-accent rounded-md cursor-pointer transition-all'></div>
                    }
                </div >
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem><ProfileIcon /> Person</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Notification</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}><Logout />Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropDownProfiler;
