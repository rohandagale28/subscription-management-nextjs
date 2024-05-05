"use client"
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { Logout, ProfileIcon } from '@/app/component/Next-Icon-Component/Icons';

const DropDownProfiler = () => {
    const { data: session } = useSession();

    const handleSignOut = () => {
        signOut();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='flex items-center gap-2  p-2 hover:bg-muted rounded-md cursor-pointer transition-all'>
                    {session && (
                        <>
                            <div>
                                <Image src={session?.user?.image} alt={session?.user?.name} height={20} width={20} className='rounded-full' />
                            </div>
                            <div>
                                <p className='text-sm min-w-20'>{session?.user?.name}</p>
                            </div>
                            <div className='w-4 h-4'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'>
                                    <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M112 184l144 144 144-144' />
                                </svg>
                            </div>
                        </>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40'>
                <DropdownMenuItem><ProfileIcon /> Person</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}><Logout />Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropDownProfiler;
