'use client';
import { Menu } from '@/app/components/Menu';
import { CharacterData } from '@/app/interfaces/characters';
import { ComicData } from '@/app/interfaces/comics';
import { getCharacterById } from '@/services/characters';
import { getGenericByURI } from '@/services/generics';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ModalCard } from '@/app/components/ModalCard';
import { Grid } from '@mui/material';
import { CharacterDetails } from '@/app/components/CharacterDetails';

export default function Character(props: any) {
    const { id } = props.params
    const [character, setCharacter] = useState<CharacterData | null>(null)
    const [data, setData] = useState<ComicData | null>(null)
    const [openData, setOpenData] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 320,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleOpenCloseData = () => {
        setOpenData((prev) => !prev);
        if (openData === true) setData(null)
    };

    function goToDataDetails() {
        data?.urls.forEach((url) => {
            if (url.type === "detail") {
                window.open(url.url, '_blank')
            }
        })
    }

    async function handleShowData(resourceURI: string) {
        const dataFound = await getGenericByURI(resourceURI)
        if (dataFound) {
            setData(dataFound)
            setOpenData(true);
        }
    }

    useEffect(() => {
        async function foundThisCharacter() {
            const char = await getCharacterById(id)
            if (char) {
                setCharacter(char)
            }
        }
        foundThisCharacter()
    }, [id])

    return (
        <div className='bg-home-color'>
            <Menu />
            {data && <ModalCard {...{
                open: openData, style, data,
                onClick: goToDataDetails, onClose: handleOpenCloseData
            }} />}
            <div style={{ padding: '20px', color: 'black' }}>
                {character &&
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div className='bg-gray-100 h-full flex w-full justify-center items-center'>
                                <Image
                                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                    alt={character.name}
                                    style={{ objectFit: 'contain' }}
                                    width={1000}
                                    height={1000}
                                    className='responsive shadow-lg border-4 border-red-500'
                                />
                            </div>

                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h1 className='text-[32px] text-center mb-16'>{character.name}</h1>
                            <p>{character.description ? character.description : ''}</p>
                            <CharacterDetails {...{ dataType: 'comics', character, handleShowData: handleShowData }}/>
                            <CharacterDetails {...{ dataType: 'series', character, handleShowData: handleShowData }}/>
                            <CharacterDetails {...{ dataType: 'events', character, handleShowData: handleShowData }}/>
                            <CharacterDetails {...{ dataType: 'stories', character, handleShowData: handleShowData }}/>
                        </Grid>
                    </Grid>
                }
            </div>
        </div>
    )
}