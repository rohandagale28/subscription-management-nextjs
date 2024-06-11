"use client"
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { VerticleIcon } from '../svgRender';

const DropDownProfiler = () => {
  
    return (

        <div className="absolute right-4 top-4">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="h4 w-4" >
                        <VerticleIcon />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-20'>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem className='hover:text-destructive'>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DropDownProfiler;