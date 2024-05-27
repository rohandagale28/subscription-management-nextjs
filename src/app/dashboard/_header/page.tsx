'use client'
import React, { useState } from 'react'
import { SearchIcon } from '@/app/component/Next-Icon-Component/Icons'
import { Input } from '@/components/ui/input';

const MainDashboard = () => {
    const [search, setSearch] = useState("");

    const handleChange = (event: { target: { value: string } }) => {
        setSearch(event.target.value)
    }

    return (
        <nav className='h-full flex flex-row justify-between items-center px-12' >
           
        </nav>
    )
}

export default MainDashboard