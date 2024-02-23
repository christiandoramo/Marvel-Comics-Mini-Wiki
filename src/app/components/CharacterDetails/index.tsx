import React from 'react';
import { CharacterData } from '@/app/interfaces/characters';
import { HighlightedText } from '@/app/components/HighlightedText';

interface CharacterDetailsProps {
    handleShowData: (resourceURI: string) => void;
    character: CharacterData;
    dataType: string;
}

interface ItemData {
    resourceURI: string;
    name: string;
    role?: string;
}

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character, handleShowData, dataType }) => {
    const sessionName = dataType.replace(dataType.charAt(0),dataType.charAt(0)); // fica maiiúsculo

    return (

        <div className='flex flex-col items-center mb-10'>
            <HighlightedText 
            text={`${sessionName}: ${character[dataType].available}`} />
            <p className='text-black  px-4 mt-4'>
                {character[dataType].items.map((item: ItemData, index: number) => (
                    <span key={item.name} className='text-black'>
                        <span
                            className='cursor-pointer hover:text-yellow-500'
                            onClick={() => handleShowData(item.resourceURI)}
                        >
                            {item.name}
                        </span>
                        {index !== character[dataType].items.length - 1 ? ', ' : '.'}
                    </span>
                ))}
            </p>
        </div>
    );
};
