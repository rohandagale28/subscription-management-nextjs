import React from 'react'
import SideBar from './_sidebar/page'
import MainDashboard from './_header/page'


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='flex flex-row'>
            <div className="flex flex-col md:w-[10rem] lg:w-[10rem] xl:w-[12rem]">
                <SideBar />
            </div>
            <div className='box-border'>
                <div className='w-full h-14'>
                    <MainDashboard />
                </div>
                <div className='pt-6'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout  