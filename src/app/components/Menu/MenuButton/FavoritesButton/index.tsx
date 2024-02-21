import { useRouter } from 'next/navigation';
import React from 'react';
export function FavoritesButton() {
    const router = useRouter()
    function gotoFavorites() {

        router.push('/favorites')
    }
    return (
        < button className="w-[140px] rounded-lg h-[50px] text-black bg-white text-center font-Poppins text-base font-normal" >
            Favorites
        </button >
    )
}