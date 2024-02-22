import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles, withTheme } from '@mui/styles';
import filterOptions from '@/app/utils/filterOptions';

interface FilterSelectProps {
    title: string;
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
            color: 'white',
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
    },
});

export const FilterSelect: React.FC<FilterSelectProps> = ({ title, value, onChange, options }) => {
    const classes = useStyles();

    return (
        <Select
            inputProps={{
                style: {
                    borderBottom: 'none',
                    justifyItems: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    verticalAlign: 'middle',
                },
                disableUnderline: true,
            }}
            variant="standard"
            className="bg-select-background
             text-select-text text-left 
             rounded-[50px] h-[50px] max-w-[200px] 
            mt-2 border-none
            flex-grow flex  py-3
            "
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={title}
            onChange={onChange}
            defaultValue={filterOptions.ALL}
            MenuProps={{
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center"
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "center"
                },
                disableAutoFocus: true,
            }}
        >
            {options.map((option, index) => (
                <MenuItem
                    key={index}
                    sx={{
                        '&.Mui-selected': {
                            backgroundColor: 'white',
                            height: '50px',
                            color: 'black',
                        },
                    }}
                    className={classes.menuItem}
                    aria-label={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    );
};
