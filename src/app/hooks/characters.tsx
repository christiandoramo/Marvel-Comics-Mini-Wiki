'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import {getCharactersAdvanced, getCharactersByName } from '../../services/characters';
import { CharacterContextData, CharacterData } from '../interfaces/characters';
import filterOptions from '../utils/filterOptions';


const CharactersContext = createContext<CharacterContextData | null>(null);

export const CharactersProvider = ({ children }: { children: React.ReactNode }) => {
    const [characters, setCharacters] = useState<CharacterData[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filterSearch, setFilterSearch] = useState<string>('Todos')
    const [filteredCharacters, setFilteredCharacters] = useState<CharacterData[]>([]);


    function filterCharacters() {
        if (filterSearch === filterOptions.ALL) {
            setFilteredCharacters(characters)
        }
        else if (filterSearch === filterOptions.COMICS10) {
            const filtered = characters.filter(char => char.comics.available >= 10)
            setFilteredCharacters(filtered)
        }
        else if (filterSearch === filterOptions.SERIES10) {
            const filtered = characters.filter(char => char.series.available >= 10)
            setFilteredCharacters(filtered)
        } else {
            console.log("Filtro bugou")
        }
    }

    async function updateCharacters() {
        setCharacters([])
        if (searchTerm === '') {
            const actualChars = await getCharactersAdvanced({ offset: 0, limit: 30 })
            if (actualChars) setCharacters(actualChars)
        } else {
            const newChars = await getCharactersByName(searchTerm)
            if (newChars) setCharacters(newChars)
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
            searchTerm, setSearchTerm, characters, setCharacters,
            filterSearch, setFilterSearch, filteredCharacters, updateCharacters
        }}>
            {children}
        </CharactersContext.Provider>
    );
};

export function useCharacters() {
    return useContext(CharactersContext);
}