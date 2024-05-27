import React from 'react'
import LoginNavBar from '../component/auth/login-navbar'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <LoginNavBar />
            {children}
        </div>
    )
}

export default layout