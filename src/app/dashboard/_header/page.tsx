'use client'
import React, { useState } from 'react'
import SearchIcon from '../_sidebar/search-icon'

const MainDashboard = () => {
    const [search, setSearch] = useState("");

    const handleChange = (event: { target: { value: string } }) => {
        setSearch(event.target.value)
    }

    return (
        <nav className='h-full flex flex-row justify-between items-center px-12' >
            <div className='text-lg font-bold'>
                Dashboard
            </div>
            <div className='flex justify-center items-center gap-2 outline outline-muted rounded-md'>
                <div className='pl-4 font-xs'>
                    <input className='h-7 border-none focus:border-none focus:outline-none bg-transparent font-xs'
                        type="email" placeholder="search" name="text" value={search} onChange={(event) => handleChange(event)} />
                </div>
                <div className='w-9 h-9 flex justify-center items-center  cursor-pointer rounded-md box-border'>
                    <SearchIcon />
                </div>
            </div>
        </nav>
    )
}

export default MainDashboard