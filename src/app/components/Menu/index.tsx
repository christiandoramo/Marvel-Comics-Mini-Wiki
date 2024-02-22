'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useCharacters } from '@/app/hooks/characters';
import { SearchBar } from './SearchBar';
import { HomeButton } from './MenuButton/HomeButton';
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
        <div className="
         gap-x-[20px] 
          top-0 
         left-0 w-full 
         h-20 flex 
         justify-center items-center
         px-8 py-5
          bg-black z-10">
            <HomeButton />
                <SearchBar
                    onClick={async event => {
                        if (event.button === 0) { // clickou com botao esquerdo na lupa
                            router.push('/home')
                            rest.updateCharacters()
                        }
                    }}
                    onKeyDown={async event => { // enter na barra
                        if (event.keyCode === 13) {
                            router.push('/home')
                            rest.updateCharacters()
                        }
                    }}
                    onChange={(e) => rest.setSearchTerm(e.target.value.trim())}
                    placeholder="Buscar personagem"
                    value={rest.searchTerm}
                />
                <FilterSelect
                    options={Object.values(filterOptions)}
                    label={'Filtro'}
                    value={rest.filterSearch}
                    onChange={handleChangeFilter} />
                {/* <FavoritesButton /> */}
        </div>
    )
}