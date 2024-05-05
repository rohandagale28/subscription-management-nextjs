import React from 'react'
import SideBar from './_sidebar/page'
import MainDashboard from './_header/page'


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="flex flex-col">
                <SideBar />
            </div>
            <div className='absolute w-[86%] left-[14%] box-border'>
                <div className='absolute top-0 left-0 w-full h-14'>
                    <MainDashboard />
                </div>
                <div className='pt-16'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout