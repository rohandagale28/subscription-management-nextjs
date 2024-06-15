'use client'
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { toast } from '../../ui/use-toast';
import VerticalMenuIcon from '../../../../public/assets/icons/ellipsis-vertical.svg'

export const SubscriptionCardMenu = ({ id, getData }: { id: string, getData: () => void; }) => {
   
    const handleDelete = async () => {
        const res = await axios.post("api/card/delete", { data: id })
        if (res.status === 200) {
            toast({
                title: "Platform deleted successfully",
                description: "card",
            });
            getData()
        }
    }

    return (
        <div className="absolute right-4 top-4">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="h4 w-4" >
                        <VerticalMenuIcon />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-20'>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem className='hover:text-destructive-foreground' onClick={() => handleDelete()}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
