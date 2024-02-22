'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCharacters, getCharactersAdvanced, getCharactersByName } from '../../services/characters';
import { CharacterContextData, CharacterData } from '../interfaces/characters';
import filterOptions from '../utils/filterOptions';


const CharactersContext = createContext<CharacterContextData | null>(null);

export const CharactersProvider = ({ children }: { children: React.ReactNode }) => {
    const [characters, setCharacters] = useState<CharacterData[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filterSearch, setFilterSearch] = useState<string>('Todos')
    const [filteredCharacters, setFilteredCharacters] = useState<CharacterData[]>([]);

    function filterCharacters() {
        console.log('searchTerm: ', searchTerm);
        console.log("filter: ", filterSearch);
        if (filterSearch === filterOptions.ALL) {
            setFilteredCharacters(characters)
            console.log(characters)
        }
        else if (filterSearch === filterOptions.COMICS10) {
            const filtered = characters.filter(char => char.comics.available >= 10)
            console.log(filtered)
            setFilteredCharacters(filtered)
        }
        else if (filterSearch === filterOptions.SERIES10) {
            const filtered = characters.filter(char => char.series.available >= 10)
            console.log(filtered)
            setFilteredCharacters(filtered)
        } else {
            console.log("Filtro bugou")
        }
    }

    async function updateCharacters() {
        setCharacters([])
        const newChars = await getCharactersByName(searchTerm)
        if (newChars) setCharacters(newChars)
    }

    useEffect(() => {
        filterCharacters()
    }, [filterSearch, characters])

    useEffect(() => {
        async function foundInitialChars() {
            const initialChars = await getCharactersAdvanced({ offset: Math.floor(Math.random() * 1000), limit: 30 })
            if (initialChars !== null) {
                setCharacters(initialChars)
            }
        }
        if (characters.length === 0) {
            foundInitialChars()
        }
    }, [])

    return (
        <CharactersContext.Provider value={{ searchTerm, setSearchTerm, filterSearch, setFilterSearch, filteredCharacters, updateCharacters }}>
            {children}
        </CharactersContext.Provider>
    );
};

export function useCharacters() {
    return useContext(CharactersContext);
}