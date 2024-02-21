import React from 'react';
import { Box } from '@mui/material'
import { CharacterData } from '@/app/interfaces/characters';
import Image from 'next/image';

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
            <Image
                src={thumbnail.extension !== "" ? `${thumbnail.path}.${thumbnail.extension}` : thumbnail.path}
                alt={name}
                className='rounded-lg max-w-[200px] h-[90%] justify-center items-center mt-[-1px]'
                layout='responsive'
                // objectFit='contain'
                width={1000}
                height={1000}
            />
            <h2 className='mt-2 text-center font-bold text-white flex-shrink-0'>{name}</h2>
        </Box>
    );
};
