'use client';
import { Menu } from '@/app/components/Menu';
import { CharacterData } from '@/app/interfaces/characters';
import { ComicData } from '@/app/interfaces/comics';
import { getCharacterById } from '@/services/characters';
import { getComicByURI } from '@/services/comics';
import { getSerieByURI } from '@/services/series';
import { Comic_Neue } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { SerieData } from '@/app/interfaces/series';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';


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
        <div>
            <Menu />
            <Modal
                open={openComic}
                onClose={handleOpenCloseComic}
            >
                <Box sx={style}>
                    {comic &&
                        <div>
                            <div onClick={goToComicDetails}>
                                <Image
                                    src={`${(comic.thumbnail.path).replace("http:", "https")}
                                    .${comic.thumbnail.extension}`}
                                    alt={comic.title}
                                    className='w-full p-4'
                                    layout='responsive'
                                    objectFit='contain'
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div onClick={goToComicDetails}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {comic.title}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {comic.description !== "" ? comic.description
                                        : comic.textObjects[0]?.text}
                                </Typography>
                            </div>
                        </div>}
                </Box>
            </Modal>
            <Modal
                open={openSerie}
                onClose={handleOpenCloseSerie}
            >
                <Box sx={style}>
                    {serie &&
                        <div>
                            <div onClick={goToSerieDetails}>
                                <Image
                                    className='w-full p-4'
                                    src={`${(serie.thumbnail.path).replace("http:", "https")}.${serie.thumbnail.extension}`}
                                    alt={serie.title}
                                    layout='responsive'
                                    objectFit='contain'
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div onClick={goToSerieDetails}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <h1>{serie.title}</h1>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <p>{serie.description !== "" ? serie.description
                                        : serie.textObjects[0]?.text}</p>
                                </Typography>
                            </div>
                        </div>}
                </Box>
            </Modal>

            <div>
                {character &&
                    <div>
                        <div>
                            <Image
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={character.name}
                                layout='responsive'
                                objectFit='contain'
                                width={1000}
                                height={1000}
                            /></div>
                        <div>
                            <h1>{character.name}</h1>
                            <p>{character.description}</p>
                            <div><span>Comics {character.comics.available}
                            </span>
                                {character.comics.items.map((item, index) => (
                                    <p onClick={() => handleShowComic(item.resourceURI)} key={index}>{item.name}</p>
                                ))}
                            </div>
                            <div><span>Series
                                {character.series.available}</span>
                                {character.series.items.map((item, index) => (
                                    <p onClick={() => handleShowSerie(item.resourceURI)} key={index}>{item.name}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}