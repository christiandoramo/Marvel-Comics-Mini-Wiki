
import axios from "axios";
import api, { axiosConfig } from "./api";

// export async function getCharacters() {
//     try {
//         const response = await api.get(`/characters`,
//             { params: { ts: timestamp, apikey: publicKey, hash: hash } });
//         return response.data.data.results;
//     } catch (error) {
//         console.error('Erro ao obter personagens: ', error);
//         return null;
//     }
// }

export async function getCharacterById(characterId: number) {
    try {
        const response = await api.get(`/characters/${characterId}`);
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter personagem: ', error);
        return null;
    }
}

// export async function getCharactersByName(nameStartsWith: string) {
//     try {
//         const response = await api.get('/characters',
//             { params: { nameStartsWith, ts: timestamp, apikey: publicKey, hash: hash } });
//         return response.data.data.results;
//     } catch (error) {
//         console.error('Erro ao obter personagens: ', error);
//         return null;
//     }
// }



export async function getCharactersAdvanced({ nameStartsWith, offset, limit }: { nameStartsWith?: string, offset?: number, limit?: number }) {
    try {
        if (nameStartsWith && offset && limit) {
            const params = { nameStartsWith: nameStartsWith, offset, limit }
            const response = await api.get(`/characters`,
                { params });
            return response.data.data.results;
        }
        if (nameStartsWith && limit) {
            const params = { nameStartsWith: nameStartsWith, offset, limit }
            const response = await api.get(`/characters`,
                { params });
            return response.data.data.results;
        }

        const params = { offset, limit }
        const response = await api.get(`/characters`,
            { params });
        return response.data.data.results;


    } catch (error) {
        console.error('Erro ao obter personagens: ', error);
        return null;
    }
}

export async function getCharacterByURI(resourceURI: string) {
    const secureResource = resourceURI.replace("http:", "https:")
    try {
        const response = await axios.get(secureResource, axiosConfig)
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter character: ', error);
        return null;
    }
}