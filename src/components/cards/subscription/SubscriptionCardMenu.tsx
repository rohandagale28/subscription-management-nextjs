import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { toast } from '../../ui/use-toast';
import VerticalMenuIcon from '../../../../public/assets/icons/ellipsis-vertical.svg'
import TrashIcon from '../../../../public/assets/icons/trash.svg'
import EditIcon from '../../../../public/assets/icons/create.svg'

interface SubscriptionCardMenuProps {
    id: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    getData: () => void;
}

export const SubscriptionCardMenu = ({ id, getData, open, onOpenChange }: SubscriptionCardMenuProps) => {

    const handleDelete = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        const res = await axios.delete(`api/card/delete?id=${id}`)
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
                    <DropdownMenuItem onClick={() => onOpenChange(true)}>
                        <div className='h-4 w-4'>
                            <EditIcon />
                        </div>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className='hover:text-destructive-foreground' onClick={(e) => handleDelete(e)}>
                        <div className='h-4 w-4'>
                            <TrashIcon />
                        </div>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
