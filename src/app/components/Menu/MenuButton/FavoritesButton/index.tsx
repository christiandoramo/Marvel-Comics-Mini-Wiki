import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import React from 'react';
export function FavoritesButton() {
    const router = useRouter()
    function gotoFavorites() {

        router.push('/favorites')
    }
    return (
        <Button
            onClick={gotoFavorites}
            variant="outlined"
            style={{
                width: 140,
                height: 50,
                color: 'black',
                backgroundColor: 'white',
                borderColor: 'black',
                borderRadius: '5rem',
                borderStyle:'solid',
                fontSize: 20,
                fontWeight: 'bold'
            }}
        >
            Home
        </Button>
    )
}