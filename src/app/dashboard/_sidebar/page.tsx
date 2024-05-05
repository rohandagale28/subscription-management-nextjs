"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import DropDownProfiler from './dropdown-profiler'
import SearchIcon from './search-icon'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggler } from '@/app/component/Theme/theme-toggler'
import home from '../../../assets/icons/home-icons.svg'
import HomeIcon from './home-icons'
import Image from 'next/image'
import MenuButton from './_Menu/menu-button'
import MenuNavigation from './_Menu/page'

const SideBar = () => {
    const { data: session } = useSession()

    return (
        <div className='flex flex-col w-[14%]  min-h-screen fixed bg-secondary justify-start items-start px-2 border-r-[1px]'>
            <div className='py-4 flex flex-row justify-between items-center '>
                <DropDownProfiler />
                {/* <div className='w-9 h-9 flex justify-center items-center cursor-pointer hover:bg-muted rounded-md box-border'>
                    <SearchIcon />
                </div> */}
            </div>
            <div className='py-4 flex flex-col justify-between items-center w-full'>
                <MenuNavigation />
            </div>
            <div className=' flex self-end'>
                <ThemeToggler />
            </div>
        </div >
    )
}

export default SideBar