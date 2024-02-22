'use client';
import { Menu } from '@/app/components/Menu';
import { CharacterData } from '@/app/interfaces/characters';
import { ComicData } from '@/app/interfaces/comics';
import { getCharacterById } from '@/services/characters';
import { getComicByURI } from '@/services/comics';
import { getSerieByURI } from '@/services/series';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SerieData } from '@/app/interfaces/series';
import Image from 'next/image';
import { ModalCard } from '@/app/components/ModalCard';
import { Grid, Link } from '@mui/material';
import { HighlightedText } from '@/app/components/HighlightedText';

export default function Character(props: any) {
    const { id } = props.params
    const router = useRouter()
    const [character, setCharacter] = useState<CharacterData | null>(null)
    const [comic, setComic] = useState<ComicData | null>(null)
    const [serie, setSerie] = useState<SerieData | null>(null)
    const [openComic, setOpenComic] = useState(false);
    const [openSerie, setOpenSerie] = useState(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 320,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleOpenCloseComic = () => {
        setOpenComic((prev) => !prev);
        if (openComic === true) setComic(null)
    };

    const handleOpenCloseSerie = () => {
        setOpenSerie((prev) => !prev);
        if (openSerie === true) setSerie(null)
    };

    function goToComicDetails() {
        comic?.urls.forEach((url) => {
            if (url.type === "detail") {
                window.open(url.url, '_blank')
            }
        })
    }
    function goToSerieDetails() {
        serie?.urls.forEach((url) => {
            if (url.type === "detail") {
                window.open(url.url, '_blank')
            }
        })
    }

    async function handleShowComic(resourceURI: string) {
        const comicFound = await getComicByURI(resourceURI)
        if (comicFound) {
            setComic(comicFound)
            setOpenComic(true);
        }
    }

    async function handleShowSerie(resourceURI: string) {
        const serieFound = await getSerieByURI(resourceURI)
        if (serieFound) {
            setSerie(serieFound)
            setOpenSerie(true);
        }
    }

    useEffect(() => {
        async function foundThisCharacter() {
            const char = await getCharacterById(id)
            if (char) {
                console.log(char)
                setCharacter(char)
            }
        }
        foundThisCharacter()
    }, [id])

    return (
        <>
            <Menu />
            {comic && <ModalCard {...{
                open: openComic, style, data: comic,
                onClick: goToComicDetails, onClose: handleOpenCloseComic
            }} />}

            {serie && <ModalCard {...{
                open: openSerie, style, data: serie,
                onClick: goToSerieDetails, onClose: handleOpenCloseSerie
            }} />}
            <div style={{ padding: '20px', color: 'black' }}>
                {character &&
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div className='bg-black h-full w-full'>
                                <Image
                                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                    alt={character.name}
                                    layout='responsive'
                                    // objectFit='contain'
                                    width={1000}
                                    height={1000}
                                    className='shadow-lg border-4 border-yellow-300'
                                />
                            </div>

                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h1 className='text-[32px] text-center mb-16'>{character.name}</h1>
                            <p>{character.description ? character.description : ''}</p>
                            <div className='flex flex-col items-center mb-16'>
                                <HighlightedText text={`Comics: ${character.comics.available}`} />
                                <p className='text-black  px-4 mt-4'>
                                    {(character.comics.items.map((item, index) => (
                                        <span className='text-black'>
                                            <span className='cursor-pointer
                                            hover:text-yellow-500' key={index} onClick={() => handleShowSerie(item.resourceURI)}>{item.name}
                                            </span>{index !== character.comics.items.length - 1 ? `, ` : `.`}
                                        </span>
                                    )))}
                                </p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <HighlightedText text={`Series: ${character.series.available}`} />
                                <p className='text-black px-4 mt-4'>
                                    {(character.series.items.map((item, index) => (
                                        <span className=' text-black'>
                                            <span className='cursor-pointer
                                             hover:text-yellow-500' key={index} onClick={() => handleShowSerie(item.resourceURI)}>{item.name}
                                            </span>{index !== character.series.items.length - 1 ? `, ` : `.`}
                                        </span>
                                    )))}
                                </p>
                            </div>
                        </Grid>
                    </Grid>
                }
            </div>
        </>
    )
}