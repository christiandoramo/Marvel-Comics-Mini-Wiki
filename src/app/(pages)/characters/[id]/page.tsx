'use client';
import { Menu } from '@/app/components/Menu';
import { CharacterData } from '@/app/interfaces/characters';
import { getCharacterById } from '@/services/characters';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Character(props: any) {
    const { id } = props.params
    const router = useRouter()
    const [character, setCharacter] = useState<CharacterData | null>(null)

    async function handleShowComic(resourceURI: string) {

    }

    async function handleShowSerie(resourceURI: string) {

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
    }, [])

    return (
        <div>
            <Menu />
            <div>
                {character &&
                    <div>
                        <div>
                            <img
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={character.name}
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