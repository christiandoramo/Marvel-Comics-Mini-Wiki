'use client';
import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import filterOptions from '@/app/utils/filterOptions';

interface FilterSelectProps {
    title: string;
    // label: string;
    value: string;
    onChange: (event: any) => void;
    options: any[];
}
export const FilterSelect: React.FC<FilterSelectProps> = ({ title, value, onChange, options }) => {

    return (
        <div className="mt-4">
            {/* <h1 className="text-form-label text-left text-[15px]">{label}</h1> */}
            <Select
                className="bg-select-background text-select-text text-left rounded-[50px] h-[50px] w-[605px] mt-2 border-black"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={title}
                onChange={onChange}
                defaultValue={filterOptions.ALL}
            >
                {options.map((option, index) => (
                    <MenuItem aria-label={option} key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};