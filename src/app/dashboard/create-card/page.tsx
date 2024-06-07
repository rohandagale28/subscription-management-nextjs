'use client'
import { InputDemo } from '@/app/component/Input'
import { Select } from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import { SelectDemo } from './Drop_down'

const page = () => {
    return (
        <div className='w-full '>
            <form className='flex flex-col gap-2 justify-center items-center'>
                <div>
                    Rohan Dagale
                </div>
                <div>
                    <Label>Select</Label>
                    <SelectDemo />
                </div>
            </form>
        </div>
    )
}

export default page