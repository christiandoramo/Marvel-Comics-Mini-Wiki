import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface FormInputProps {
    name?: string;
    placeholder: string;
    value?: string;
    type?: string;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<FormInputProps> = ({ placeholder, value, name, onChange, type, onKeyDown, onClick }) => {
    return (
        <TextField
            variant="standard"
            onKeyDown={onKeyDown}
            className="bg-white text-black text-left py-3
             rounded-full 
            max-w-[800px]
            flex-grow flex"
            id="filled-basic"
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            sx={{
                flexShrink: 0,
                input: { color: 'black', textIndent: '30px' },
                '&::placeholder': { color: '#838383' },
                height: '50px'
            }}
            onChange={onChange}
            InputProps={{
                style: {
                    borderBottom: 'none',
                    justifyItems: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                disableUnderline: true,
                endAdornment: (
                    <InputAdornment
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        position='start'>

                        <SearchIcon
                            onClick={onClick}
                            sx={{
                                color: 'gray',
                                '&:hover': {
                                    color: 'orange',
                                    cursor: 'pointer'
                                },
                            }}
                        />
                    </InputAdornment>
                ),
                size: 'small'
            }}
        />
    );
};
