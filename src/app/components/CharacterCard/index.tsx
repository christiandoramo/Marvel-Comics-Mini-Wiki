import React from 'react';
import { Box } from '@mui/material'
import { CharacterData } from '@/app/interfaces/characters';

export const CharacterCard: React.FC<CharacterData> = ({ name, thumbnail }) => {
    return ( 
        <Box
            sx={{
                backgroundColor: 'black',
                borderRadius: '1rem',
                boxShadow: '0 0 -20px rgba(0, 0, 0, 0.8)',
                width: 200,
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <img
                src={`${thumbnail.path}.${thumbnail.extension}`}
                alt={name}
                className='w-full h-full rounded-lg'
            />
            <h2 className='mt-2 text-center font-bold text-white'>{name}</h2>
        </Box>
    );
};
