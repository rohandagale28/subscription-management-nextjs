import React, { Suspense } from 'react'
import MainDashboard from './_header/page'
import SideBar from '@/components/dashboard/sidebar/sidebar/SideBar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='flex flex-row w-full'>
            <div className="flex flex-col md:w-[14rem] lg:w-[14rem] xl:w-[14rem]">
                <SideBar />
            </div>
            <div className='box-border w-full'>
                <div className='w-full'>
                    <MainDashboard />
                </div>
                <div className='pt-4 w-full'>
                    <Suspense fallback={<h1>Breaking the laws</h1>}>
                        {children}
                    </Suspense>
                </div>
            </div>
        </div >
    )
}

export default DashboardLayout  