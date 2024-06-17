"use client"
import React from 'react'
import DropDownProfiler from './DropdownProfile/DropDownProfiler'
import { ThemeToggler } from '@/app/component/Theme/theme-toggler'
import SideMenuNavigation from './NavigationMenu/SideMenuNavigation'

const SideBar = () => {

    return (
        <div className='flex flex-col min-h-screen w-full bg-secondary justify-start items-start border-r-[1px] px-2'>
            <div className='py-4 w-full'>
                <DropDownProfiler />
            </div>
            <div className='py-2 w-full flex-grow'>
                <SideMenuNavigation />
            </div>
            <div className=' flex justify-end pb-4 pl-2'>
                <ThemeToggler />
            </div>
            <div className=' flex w-full pb-2'>
                <div className='text-[10px] text-center w-full'>
                    @2024 subscription.com, inc
                </div>
            </div>
        </div >
    )
}

export default SideBar