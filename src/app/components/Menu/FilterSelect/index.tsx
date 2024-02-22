import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles, withTheme } from '@mui/styles';
import filterOptions from '@/app/utils/filterOptions';

interface FilterSelectProps {
    label: string;
    value: string;
    onChange: (event: any) => void;
    options: any[];
}

const useStyles = makeStyles({
    select: {
        backgroundColor: 'white',
        borderColor: 'black',
        width: '200px',
        '& .MuiSelect-icon': {
            color: 'blue',
        },
        '&:focus': {
            outline: 'none',
        },
        '&:hover': {
            borderBottom: 'none',
        },
    },
    menuItem: {
        backgroundColor: 'white',
        color: 'black',
        height: '50px',
        borderBottom: '1px solid black',
        '&:hover': {
            backgroundColor: 'cyan',
        },
        '& .MuiSelect-icon': {
            color: 'blue',
        },
        '&.Mui-selected':{
            backgroundColor: 'green',
        }
    },
});

export const FilterSelect: React.FC<FilterSelectProps> = ({ value, onChange, options,label }) => {
    const classes = useStyles();

    return (
        <Select
            // variant="outlined"
            className="bg-select-background
             text-select-text text-left 
             rounded-[50px] h-[50px] max-w-[200px] 
            mt-2 border-none
            flex-grow flex  py-3
            "
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            // label={label} // tava bugando o componente
            onChange={onChange}
            defaultValue={filterOptions.ALL}
        >
            {options.map((option, index) => (
                <MenuItem
                    key={index}
                    className={classes.menuItem}
                    aria-label={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    );
};
