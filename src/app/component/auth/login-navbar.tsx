import React from 'react'
import { ThemeToggler } from '../Theme/theme-toggler'
import { BrandLogo } from '../BrandLogo/brand-logo'

const LoginNavBar = () => {
    return (
        <nav className=" w-full absolute top-0 left-0 h-12">
            <div className=" h-20 flex flex-row items-center justify-between px-16">
                <div className="flex flex-row gap-2 items-center justify-between">
                    <BrandLogo />
                </div>
                <div>
                    <ThemeToggler />
                </div>
            </div>
        </nav>
    )
}

export default LoginNavBar