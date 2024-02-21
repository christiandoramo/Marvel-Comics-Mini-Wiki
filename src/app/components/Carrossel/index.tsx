'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

const Carrossel: React.FC = () => {
  const router = useRouter()
  const goToHome = () => {
    console.log('apertou')
    router.push('/home')
  }
  return (
    <button className='w-[100px] bg-white text-black text-bold' onClick={() => goToHome()}>ENTRAR AGORA</button>
  );
};

export default Carrossel;
