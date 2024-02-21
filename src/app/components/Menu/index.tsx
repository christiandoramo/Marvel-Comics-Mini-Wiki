'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useCharacters } from '@/app/hooks/characters';
import { SearchBar } from './SearchBar';
import { HomeButton } from './MenuButton/HomeButton';
import { FavoritesButton } from './MenuButton/FavoritesButton';
import { FilterSelect } from './FilterSelect';
import filterOptions from '@/app/utils/filterOptions';

export function Menu() {
    const { ...rest } = useCharacters();
    const router = useRouter()
    const handleChangeFilter = (event: any) => {
        console.log(event.target.value)
        rest.setFilterSearch(event.target.value);
    }


    return (
        <div>
            <HomeButton />
            <SearchBar
                onKeyDown={async event => {
                    if (event.keyCode === 13) {
                        router.push('/home')
                        await rest.updateCharacters()
                    }
                }}
                onChange={(e) => rest.setSearchTerm(e.target.value.trim())}
                placeholder="Buscar personagem"
                value={rest.searchTerm}
            />
            <FilterSelect
                options={Object.values(filterOptions)}
                title='Filtros'
                value={rest.filterSearch}
                onChange={handleChangeFilter} />
            <FavoritesButton />
        </div>
    )
}