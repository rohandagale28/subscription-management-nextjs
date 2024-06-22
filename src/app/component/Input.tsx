import { Input } from '@/components/ui/input';
import React, { ChangeEvent, useRef } from 'react';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function InputDemo({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    name,
    autoFocus = false,
    ...rest
}: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Input
            ref={inputRef}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            {...rest}
        />
    );
}
