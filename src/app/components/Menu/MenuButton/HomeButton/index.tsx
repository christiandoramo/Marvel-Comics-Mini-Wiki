import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

export function HomeButton() {
    const router = useRouter()

    function gotoHome() {
        router.push('/home')
    }

    return (
        <Button
            onClick={gotoHome}
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
