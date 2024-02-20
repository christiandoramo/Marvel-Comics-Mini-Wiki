'use client'
import { getCharacterById, getCharacters } from '@/app/services/characters';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Menu: React.FC = (props: any) => {
  //const { characterId } = props.params
  const [character, setCharacter] = useState<any>(null)
  const [characters, setCharacters] = useState<any>(null)

  async function handleShowHero() {
    const char = await getCharacterById(1011054)
    if (char) {
      setCharacter(char)
      console.log(char)
    }
  }
  const goToHome = () => {
    const router = useRouter()
    router.push('/home')
  }
  return (
    <div className='flex flex-col m-[30px]'>
      <button className='w-[100px] bg-white text-black text-bold' onClick={goToHome}>ENTRAR AGORA</button>
    </div>
  );
};

export default Menu;
