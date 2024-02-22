import { OfflineShareTwoTone } from "@mui/icons-material";
import api from "./api";
import md5 from 'md5';
import axios from "axios";

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



export async function getCharactersAdvanced({ nameStartsWith, offset, limit }: { nameStartsWith?: string, offset?: number, limit?: number }) {
    try {
        if (nameStartsWith) {
            const params = { nameStartsWith: nameStartsWith, ts: timestamp, apikey: publicKey, hash: hash, offset, limit }
            const response = await api.get(`/characters`,
                { params });
            return response.data.data.results;
        }

        const params = { ts: timestamp, apikey: publicKey, hash: hash, offset, limit }
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
        const response = await axios.get(secureResource, { params: { ts: timestamp, apikey: publicKey, hash: hash } })
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter character: ', error);
        return null;
    }
}