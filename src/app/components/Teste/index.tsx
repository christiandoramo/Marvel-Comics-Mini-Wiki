'use client'
import { getCharacterById, getCharacters } from '@/app/services/characters';
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
  async function handleShowHeroes() {
    const chars = await getCharacters()
    if (chars) {
      setCharacters(chars)
      console.log(chars)
    }
  }
  return (
    <div className='flex flex-col gap-[20px]'>
      <button className='w-[100px] bg-white text-black text-bold' onClick={handleShowHeroes}>getCharacters</button>
      <button className='w-[100px] bg-white text-black text-bold' onClick={handleShowHero}>getCharactersById</button>
    </div>
  );
};

export default Menu;
