"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactElement } from 'react'

interface MenuButtonProps {
    link: string,
    title: string,
    component: React.ComponentType<{}>
}

const MenuButton: React.FC<MenuButtonProps> = ({ link, title, component }: MenuButtonProps): ReactElement => {
    const pathname = usePathname()
    const isActive = pathname.startsWith(link);

    return (
        <div className='w-full'>
            <Button variant="link" className={`flex ${isActive ? 'bg-accent hover:!bg-accent' : ''} flex-row justify-start items-center gap-2  hover:bg-muted w-full rounded-md`} asChild>
                <Link href={link} className='font-md'>
                    <div className='min-w-4 min-h-4 text-black dark:text-white' >
                        {React.createElement(component)}
                    </div>
                    <p className=''>{title}</p>
                </Link>
            </Button>
        </div>
    )
}

export default MenuButton