import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectDemoMethod({ value, onChange }: any) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Platform" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="recurring">Recurring</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                    <SelectItem value="onetime">One Time</SelectItem>
                    {/* <SelectItem value="jio">Jio cinema</SelectItem>
                    <SelectItem value="apple">Apple Tv</SelectItem> */}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
