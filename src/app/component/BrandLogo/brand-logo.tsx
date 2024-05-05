"use client"
import Image from 'next/image'
import React from 'react'
import scription_logo from '../../../assets/icons/scription-logo.png'

export const BrandLogo = () => {
    return (
        <div className="flex flex-row gap-2 items-center justify-center">
            <div>
                <Image src={scription_logo} height={34} width={34} alt="scription logo" />
            </div>
            <p>Scription</p>
        </div>
    )
}
