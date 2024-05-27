"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import DropDownProfiler from './_DropdownProfile/dropdown-profiler'
import { SearchIcon } from '@/app/component/Next-Icon-Component/Icons'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggler } from '@/app/component/Theme/theme-toggler'
import MenuButton from './_NavigationMenu/menu-button'
import SideMenuNavigation from './_NavigationMenu/page'

const SideBar = () => {
    const { data: session } = useSession()

    return (
        <div className='flex flex-col min-h-screen w-full  bg-secondary justify-start items-start px-2 border-r-[1px] px-2'>
            <div className='py-4 flex flex-row justify-between items-center w-full'>
                <DropDownProfiler />
            </div>
            <div className='py-4 w-full'>
                <SideMenuNavigation />
            </div>
            <div className=' flex self-end'>
                <ThemeToggler />
            </div>
        </div >
    )
}

export default SideBar