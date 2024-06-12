import React, { Suspense } from 'react'
import SideBar from './_sidebar/page'
import MainDashboard from './_header/page'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='flex flex-row'>
            <div className="flex flex-col md:w-[10rem] lg:w-[10rem] xl:w-[12rem]">
                <SideBar />
            </div>
            <div className='box-border w-full'>
                <div className='w-full h-14'>
                    <MainDashboard />
                </div>
                <div className='pt-6 w-full'>
                    <Suspense fallback={<h1>Breaking the laws</h1>}>
                        {children}
                    </Suspense>
                </div>
            </div>
        </div >
    )
}

export default DashboardLayout  