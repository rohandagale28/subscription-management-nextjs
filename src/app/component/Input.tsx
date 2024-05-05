"use client"
import { Input } from '@/components/ui/input';
import React, { useRef } from 'react';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputDemo({ type, placeholder, value, onChange, name, autoFocus, ...rest }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return <Input
        ref={inputRef}
        type={type} name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        {...rest}
    />;
}
