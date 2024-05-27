"use client"
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import React from 'react';
import { DarkModeIcon, LightModeIcon } from '@/components/svgRender';

export const ThemeToggler = () => {
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button onClick={toggleTheme} variant="link" className='hover:bg-muted px-2'>
            <div className='w-4 h-4'>
                {theme === "light" ? <>
                    <LightModeIcon />
                </> : <>
                    <DarkModeIcon />
                </>}
            </div>
        </Button >
    );
};
