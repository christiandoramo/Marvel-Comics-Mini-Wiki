import React, { useState } from 'react';
import { Box, Modal, SxProps, Theme, Typography } from '@mui/material';
import Image from 'next/image';
import { CharacterPlaceholder } from '@/app/utils/placeholders';
import { GenericData } from '@/app/interfaces/generics';
import { getGenericByURI } from '@/services/generics';


interface ModalProps {
    open: boolean;
    onClose: () => void;
    data: GenericData;
    onClick: () => void;
    style: SxProps<Theme>;
}

export const ModalCard: React.FC<ModalProps> = ({ open, onClose, data, onClick, style }) => {
    async function goToInsideDataDetails(resourceURI: string) {
        const dataToNavigate: GenericData = await getGenericByURI(resourceURI)
        if (dataToNavigate) {
            dataToNavigate.urls.forEach((url) => {
                if (url.type === "detail") {
                    window.open(url.url, '_blank')
                }
            })
        }
    }
    console.log("path ubg: ", data)
    const imgURL = (data.thumbnail ?
        (`${data.thumbnail.path}.${data.thumbnail.extension}`).replace('http:', 'https:') :
        CharacterPlaceholder.thumbnail.path)
    // evitando mixed types http com https erro de seguranca no deploy vercel
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...style, maxHeight: '80vh', width: '50vw', overflow: 'auto', borderRadius: '20px 2px 2px 20px' }}>
                {data &&
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className='cursor-pointer' onClick={onClick}>
                            <Image
                                src={imageLoaded ? imgURL : CharacterPlaceholder.thumbnail.path}
                                alt={data.title}
                                className='responsive w-full p-4'
                                width={1000}
                                height={1000}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </div>
                        <div>
                            <Typography className='cursor-pointer' onClick={onClick} id="modal-modal-title" variant="h6" component="h2">
                                {data.title}
                            </Typography>
                            <Typography
                                id="modal-modal-description" sx={{ mt: 2, justifyContent: 'space-evenly' }}>
                                {data.description}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                Characters
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                {data.characters.items.map((item, index) => {
                                    return (
                                        <span key={item.resourceURI} className='text-gray-300'>
                                            <span
                                                className='cursor-pointer hover:text-yellow-500'
                                                onClick={async () => await goToInsideDataDetails(item.resourceURI)}
                                            >
                                                {item.name}
                                            </span>
                                            {index !== data.characters.items.length - 1 ? ', ' : '.'}
                                        </span>
                                    )
                                })}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                Creators
                            </Typography>
                            <Typography sx={{ mt: 2, justifyContent: 'space-evenly' }}>
                                {data.creators.items.map((item, index) => {
                                    return (
                                        <span key={item.resourceURI} className='text-gray-300'>
                                            <span
                                                className='cursor-pointer hover:text-yellow-500'
                                                onClick={async () => await goToInsideDataDetails(item.resourceURI)}
                                            >
                                                {item.name}
                                            </span>
                                            {index !== data.creators.items.length - 1 ? ', ' : '.'}
                                        </span>
                                    )
                                })}
                            </Typography>
                        </div>
                    </div>}
            </Box>
        </Modal>
    );
};
