import api from "./api";
import md5 from 'md5'; // Biblioteca para hash MD5

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const timestamp = new Date().getTime().toString();
const hash = md5(timestamp + privateKey + publicKey);

export async function getCharacters() {
    try {
        const response = await api.get(`/characters`,
            { params: { ts: timestamp, apikey: publicKey, hash: hash } });
        return response.data.data.results;
    } catch (error) {
        console.error('Erro ao obter personagens: ', error);
        return null;
    }
}

export async function getCharacterById(characterId: number) {
    try {
        const response = await api.get(`/characters/${characterId}`,
            { params: { ts: timestamp, apikey: publicKey, hash: hash } });
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter personagem: ', error);
        return null;
    }
}

export async function getCharactersByName(nameStartsWith: string) {
    try {
        const response = await api.get('/characters',
            { params: { nameStartsWith, ts: timestamp, apikey: publicKey, hash: hash } });
        return response.data.data.results;
    } catch (error) {
        console.error('Erro ao obter personagens: ', error);
        return null;
    }
}

