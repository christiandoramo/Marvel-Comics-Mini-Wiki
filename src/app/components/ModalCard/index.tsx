import React, { useState } from 'react';
import { Box, Modal, SxProps, Theme, Typography } from '@mui/material';
import Image from 'next/image';
import { CharacterPlaceholder } from '@/app/utils/placeholders';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    data: {
        thumbnail: {
            path: string;
            extension: string;
        };
        title: string;
        description: string;
    };
    onClick: () => void;
    style: SxProps<Theme>;
}

export const ModalCard: React.FC<ModalProps> = ({ open, onClose, data, onClick, style }) => {
    const imgURL = `${data.thumbnail.path}.${data.thumbnail.extension}`.replace('http:', 'https:')
    console.log(imgURL)
    const imgURL2 = (`${data.thumbnail.path}.${data.thumbnail.extension}`).replace('http:', 'https:')
    console.log(imgURL2)
    // evitando mixed types http com https erro de seguranca no deploy vercel
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...style, maxHeight: '66vh', overflow: 'auto' }}>
                {data &&
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div onClick={onClick}>
                            <Image
                                src={imageLoaded ? imgURL : CharacterPlaceholder.thumbnail.path}
                                alt={data.title}
                                className='w-full p-4'
                                layout='responsive'
                                width={1000}
                                height={1000}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </div>
                        <div onClick={onClick}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {data.title}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {data.description}
                            </Typography>
                        </div>
                    </div>}
            </Box>
        </Modal>
    );
};
