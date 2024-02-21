import { useRouter } from 'next/navigation';
import React from 'react';
export function HomeButton() {
    const router = useRouter()
    function gotoHome() {

        router.push('/home')
    }
    return (
        < button onClick={gotoHome} className="w-[140px] rounded-lg h-[50px] text-black bg-white text-center font-Poppins text-base font-normal" >
            Home
        </button >
    )
}