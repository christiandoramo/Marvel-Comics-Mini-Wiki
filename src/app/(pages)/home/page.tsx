'use client';
import { Menu } from '@/app/components/Menu';
import { useCharacters } from '@/app/hooks/characters';
import { useRouter } from 'next/navigation';

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
                {rest.filteredCharacters.length === 0 ?
                    <p>Nenhum personagem encontrado</p> :
                    rest.filteredCharacters.map((char, index) => (
                        <div className='text-center' onClick={() => handleGoToCharacter(char.id)} key={index}>
                            <h1>{char.name}</h1>
                            <img
                                src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                                alt={char.name}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}