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

export function SelectDemo({ value, onChange }: any) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Platform" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="netflix">Netflix</SelectItem>
                    <SelectItem value="amazon">Amazon</SelectItem>
                    <SelectItem value="github">github</SelectItem>
                    <SelectItem value="jio">Jio cinema</SelectItem>
                    <SelectItem value="apple">Apple Tv</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
