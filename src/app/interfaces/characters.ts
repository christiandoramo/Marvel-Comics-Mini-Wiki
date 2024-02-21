'use client';

import { Dispatch, SetStateAction } from "react";

export interface CharacterData {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string,
        extension: string
    };
    comics: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[]
    };
    series: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[]
    };
}

export interface CharacterContextData {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    filterSearch: string
    setFilterSearch: Dispatch<SetStateAction<string>>;
    filteredCharacters: CharacterData[];
    updateCharacters: () => Promise<CharacterData[]>;
}