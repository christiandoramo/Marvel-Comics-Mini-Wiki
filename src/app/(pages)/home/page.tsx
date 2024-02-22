'use client';
import { Menu } from '@/app/components/Menu';
import { useCharacters } from '@/app/hooks/characters';
import { useRouter } from 'next/navigation';
import { CharacterCard } from '@/app/components/CharacterCard';
import { useEffect, useState } from 'react';
import { getCharactersAdvanced } from '@/services/characters';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';
import { CharacterData } from '@/app/interfaces/characters';


export default function Home() {
    const router = useRouter()
    const { ...rest } = useCharacters()
    const [actualOffset, setActualOffset] = useState<number>(30)// começa num offset a mais
    const limit = 30
    const theme = useTheme();


    async function handleGoToCharacter(id: number) {
        router.push(`/characters/${id}`)
    }

    async function handleReloadImages() {
        const chars = await getCharactersAdvanced({ offset: actualOffset, limit })
        if (chars) {
            rest.setCharacters(chars)
        }
    }

    const handleNext = () => {
        setActualOffset((prev) => prev + limit);
    };

    const handleBack = () => {
        setActualOffset((prev) => prev - limit);
    };

    useEffect(() => {
        handleReloadImages()
    }, [actualOffset]);


    return (
        <div>
            <Menu />
            <div className='flex flex-col items-center mt-[30px] mb-[150px] px-16 '>
                <MobileStepper
                    steps={1}
                    position="static"
                    sx={{
                        marginTop: '20px',
                        backgroundColor: 'rgb(0,0,0,0.2)',
                        '.MuiMobileStepper-dot': {
                            display: 'none', // Esconda os pontos aqui
                        },
                        '.MuiMobileStepper-dotActive': {
                            display: 'none', // Esconda os pontos aqui
                        },
                        borderRadius: '2rem',
                    }}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={false}
                            style={{ color: '#FFD200' }}
                        >
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button
                            style={{ color: '#FFD200' }}
                            size="small"
                            onClick={handleBack}
                            disabled={actualOffset <= 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                        </Button>
                    }
                />
                <div className="flex flex-wrap gap-14 my-[30px]">

                    {rest.filteredCharacters.length === 0 ? (
                        <p className='text-black opacity-40 text-center w-full'>
                            Ainda não foi achado nenhum personagem...</p>
                    ) : (
                        rest.filteredCharacters.map((char, index) => (
                            <div
                                className="text-center cursor-pointer"
                                onClick={() => handleGoToCharacter(char.id)}
                                key={index}
                            >
                                <CharacterCard {...{ ...char, selectable: true }} />
                            </div>
                        ))
                    )}
                </div>
                <MobileStepper
                    steps={1}
                    position="static"
                    sx={{
                        marginTop: '20px',
                        backgroundColor: 'rgb(0,0,0,0.2)',
                        '.MuiMobileStepper-dot': {
                            display: 'none', // Esconda os pontos aqui
                        },
                        '.MuiMobileStepper-dotActive': {
                            display: 'none', // Esconda os pontos aqui
                        },
                        borderRadius: '2rem',
                    }}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={false}
                            style={{ color: '#FFD200' }}
                        >
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button
                            style={{ color: '#FFD200' }}
                            size="small"
                            onClick={handleBack}
                            disabled={actualOffset <= 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                        </Button>
                    }
                />
            </div>
        </div>
    );
}