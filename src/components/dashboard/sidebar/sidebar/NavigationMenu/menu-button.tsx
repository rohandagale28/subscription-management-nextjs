"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactElement } from 'react';

interface MenuButtonProps {
    link: string;
    title: string;
    component: React.ComponentType<{}>;
}

const MenuButton: React.FC<MenuButtonProps> = ({ link, title, component }: MenuButtonProps): ReactElement => {
    const pathname = usePathname();
    console.log(pathname)
    let isActive = pathname.startsWith("/dashboard/") && pathname.endsWith(`${link}`) ? true : false 
    console.log(isActive)
    return (
        <div className='w-full'>
            <Button variant="link" className={`flex ${isActive ? 'bg-accent hover:!bg-accent' : 'bg-transparent'} flex-row justify-start items-center gap-2 hover:bg-muted w-full rounded-md`} asChild>
                <Link href={link} className='font-md'>
                    <div className='min-w-4 min-h-4 text-black dark:text-white'>
                        {React.createElement(component)}
                    </div>
                    <p>{title}</p>
                </Link>
            </Button>
        </div>
    );
};

export default MenuButton;
