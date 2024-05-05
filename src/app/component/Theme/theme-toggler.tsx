"use client"
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import React from 'react';
import lightThemeIcon from '../../../assets/icons/light-mode-icon.svg';
import darkThemeIcon from '../../../assets/icons/dark-mode-icon.svg';
import Image from 'next/image';

export const ThemeToggler = () => {
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button onClick={toggleTheme} variant="link" className='hover:bg-muted px-2'>
            <div>
                <Image height={18} width={18} src={theme === "light" ? darkThemeIcon : lightThemeIcon} alt={theme === "light" ? "Dark mode" : "Light mode"} />
            </div>
        </Button>
    );
};
