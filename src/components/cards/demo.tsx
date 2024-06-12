"use client"
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { VerticleIcon } from '../svgRender';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';

interface IdProps {
    id: string;
}

const DropDownProfiler: React.FC<IdProps> = ({ id }) => {
    console.log(id)
    const handleDelete = async () => {
        const res = await axios.post("api/card/delete", { data: id })
        if (res.status === 200) {
            toast({
                title: "card is deleted",
                description: "card",
                action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
            window.location.reload()
        }
    }

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
                    <DropdownMenuItem className='hover:text-destructive' onClick={() => handleDelete()}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DropDownProfiler;
