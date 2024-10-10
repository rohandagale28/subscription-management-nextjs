import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectType {
  value: string;
  onValueChange: (value: string) => void;
  field: string[];
  placeholder: string;
}

export function DropDownSelect({
  value,
  onValueChange,
  field,
  placeholder,
}: SelectType) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectGroup>
                    {field && field.map((item: any) => {
                        return (
                            <SelectItem className="capitalize cursor-pointer" key={item} value={item}>{item}</SelectItem>
                        )
                    })}
                </SelectGroup> */}
        <input placeholder="myplaceholder" list="opts" />
        <datalist id="opts">
          <option>One</option>
          <option>Two</option>
          <option>Three</option>
        </datalist>
      </SelectContent>
    </Select>
  );
}
