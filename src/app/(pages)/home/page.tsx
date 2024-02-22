'use client';
import { Menu } from '@/app/components/Menu';
import { useCharacters } from '@/app/hooks/characters';
import { useRouter } from 'next/navigation';
import { CharacterCard } from '@/app/components/CharacterCard';

export default function Home() {
    const router = useRouter()
    const { ...rest } = useCharacters()

    async function handleGoToCharacter(id: number) {
        router.push(`/characters/${id}`)
    }

    return (
        <div>
            <Menu />
            <div className="flex flex-wrap gap-14 pt-[150px] px-16 mb-[100px]">
                {rest.filteredCharacters.length === 0 ? (
                    <p className='text-black opacity-40 text-center w-full'>Ainda não foi achado nenhum personagem...</p>
                ) : (
                    rest.filteredCharacters.map((char, index) => (
                        <div
                            className="text-center cursor-pointer"
                            onClick={() => handleGoToCharacter(char.id)}
                            key={index}
                        >
                            <CharacterCard {...{ ...char, selectable: true }} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}