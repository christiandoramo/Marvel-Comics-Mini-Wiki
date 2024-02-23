import { Dispatch, SetStateAction } from "react";

export interface CharacterData {
    [key: string]: any;
    id: number;
    name: string;
    description: string;
    textObjects: { type: string, language: string, text: string }[] //pegar o primeiro pelo menos se description for ""
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
    events: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[]
    };
    stories: {
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
    updateCharacters: () => void;
    characters: CharacterData[];
    setCharacters: Dispatch<SetStateAction<CharacterData[]>>;
    filterCharacters: () => void;
    setFilteredCharacters: Dispatch<SetStateAction<CharacterData[]>>;
}