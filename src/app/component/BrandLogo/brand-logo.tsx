"use client"
import Image from 'next/image'
import React from 'react'
import scription_logo from '../../../../public/assets/icons/scription-logo.png'

export const BrandLogo = () => {
    return (
        <div className="flex flex-row gap-2 items-center justify-center">
            <div className='pt-1'>
                <Image src={scription_logo} height={28} width={28} alt="scription logo" />
            </div>
            <p>Scription</p>
        </div>
    )
}
