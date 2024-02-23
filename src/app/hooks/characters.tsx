'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCharactersAdvanced } from '../../services/characters';
import { CharacterContextData, CharacterData } from '../interfaces/characters';
import filterOptions from '../utils/filterOptions';
import { CharacterPlaceholder } from '../utils/placeholders';


const CharactersContext = createContext<CharacterContextData | null>(null);

export const CharactersProvider = ({ children }: { children: React.ReactNode }) => {
    const [characters, setCharacters] = useState<CharacterData[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filterSearch, setFilterSearch] = useState<string>('Todos')
    const [filteredCharacters, setFilteredCharacters] = useState<CharacterData[]>([]);
    const limit = 100
    const placeholders: CharacterData[] = Array(100).fill(CharacterPlaceholder);

    async function updateCharacters() {
        setFilteredCharacters(placeholders)
        setCharacters([])
        if (searchTerm === '') {
            const actualChars = await getCharactersAdvanced({ offset: 0, limit })
            if (actualChars) setCharacters(actualChars)
        } else {
            const newChars = await getCharactersAdvanced({nameStartsWith: searchTerm, limit})
            if (newChars) setCharacters(newChars)
        }

    }


    function filterCharacters() {
        setFilteredCharacters(placeholders)
        switch (filterSearch) {
            case filterOptions.ALL:
                setFilteredCharacters(characters)
                break;
            case filterOptions.COMICS10:
                const filteredComics10 = characters.filter(char => char.comics.available >= 10)
                setFilteredCharacters(filteredComics10)
                break;
            case filterOptions.COMICS20:
                const filteredComics20 = characters.filter(char => char.comics.available >= 20)
                setFilteredCharacters(filteredComics20)
                break;
            case filterOptions.SERIES10:
                const filteredSeries10 = characters.filter(char => char.series.available >= 10)
                setFilteredCharacters(filteredSeries10)
                break;
            case filterOptions.SERIES20:
                const filteredSeries20 = characters.filter(char => char.series.available >= 20)
                setFilteredCharacters(filteredSeries20)
                break;
            case filterOptions.STORIES10:
                const filteredStories10 = characters.filter(char => char.stories.available >= 10)
                setFilteredCharacters(filteredStories10)
                break;
            case filterOptions.STORIES20:
                const filteredStories20 = characters.filter(char => char.stories.available >= 20)
                setFilteredCharacters(filteredStories20)
                break;
            case filterOptions.EVENTS10:
                const filteredEvents10 = characters.filter(char => char.events.available >= 10)
                setFilteredCharacters(filteredEvents10)
                break;
            case filterOptions.EVENTS20:
                const filteredEvents20 = characters.filter(char => char.events.available >= 20)
                setFilteredCharacters(filteredEvents20)
                break;
            case filterOptions.COMIMAGEM:
                const filteredComImagem = characters.filter(char =>
                    !char.thumbnail.path.includes('image_not_available') &&
                    !char.thumbnail.path.includes('F4c002e0305708')
                )
                setFilteredCharacters(filteredComImagem)
                break;
            default:
                console.log("Filtro bugou")
        }
    }



    useEffect(() => {
        filterCharacters()
    }, [filterSearch, characters])

    useEffect(() => {
        updateCharacters()
    }, [])

    return (
        <CharactersContext.Provider value={{
            searchTerm, setSearchTerm, characters, setCharacters, filterCharacters,
            setFilteredCharacters,
            filterSearch, setFilterSearch, filteredCharacters, updateCharacters
        }}>
            {children}
        </CharactersContext.Provider>
    );
};

export function useCharacters() {
    return useContext(CharactersContext);
}