"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

interface BackButtonProps {
    href: string,
    label?: string,
    variant?: any,
    className?: string,
    children: React.ReactNode
}

export const BackButton = ({ children, href, label, variant = "default", className = "", ...props }: BackButtonProps) => {
    return (
        <Button variant={variant} className={className} {...props} asChild>
            <Link href={href} className='box-border'>
                {children}
            </Link>
        </Button >
    )
}
BackButton.displayName = "BackButton"

