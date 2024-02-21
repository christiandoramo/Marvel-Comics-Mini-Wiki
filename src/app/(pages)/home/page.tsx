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
            <div>
                {rest.filteredCharacters.length === 0 ? (
                    <p>Nenhum personagem encontrado</p>
                ) : (
                    rest.filteredCharacters.map((char, index) => (
                        <div
                            className="text-center cursor-pointer"
                            onClick={() => handleGoToCharacter(char.id)}
                            key={index}
                        >
                            <CharacterCard {...char} /> {/* Use o componente CharacterCard aqui */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}