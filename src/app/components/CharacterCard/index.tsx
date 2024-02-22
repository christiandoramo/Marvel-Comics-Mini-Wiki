import React, { useState } from 'react';
import { Box } from '@mui/material'
import { CharacterData } from '@/app/interfaces/characters';
import Image from 'next/image';
import { CharacterPlaceholder } from '@/app/utils/placeholders';


interface SelectableCharacterData extends CharacterData {
    selectable: boolean;
}

export const CharacterCard: React.FC<SelectableCharacterData> = ({ name, thumbnail, selectable }) => {
    const imgURL = thumbnail.extension !== "" ? `${thumbnail.path}.${thumbnail.extension}` : thumbnail.path
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Box
            sx={{
                backgroundColor: 'black',
                boxShadow: '0 0 -20px rgba(0, 0, 0, 0.8)',
                width: 200,
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
                ...(selectable && {
                    '&:hover': {
                        transition: 'transform 0.3s',
                        boxShadow: '0 0 20px rgba(0, 0, 0, 1)',
                        transform: 'scale(1.1)',
                    },
                })
            }}
        >
            <Image
                src={imageLoaded ? imgURL : CharacterPlaceholder.thumbnail.path}
                alt={name}
                className='w-[200px] justify-center items-center mt-[-1px]'
                layout='responsive'
                objectFit='cover'
                width={1000}
                height={1000}
                onLoad={() => setImageLoaded(true)}
            />
            <h2
                className='mt-2 text-center font-bold text-white flex-shrink-0 z-0 bg-black'
                style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                {name}
            </h2>
        </Box>
    );
};
