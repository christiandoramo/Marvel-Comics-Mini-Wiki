import axios from "axios";
import md5 from 'md5'; 
import api from "./api";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const timestamp = new Date().getTime().toString();
const hash = md5(timestamp + privateKey + publicKey);

export async function getSerieByURI(resourceURI: string) {
    const secureResource = resourceURI.replace("http:","https:")
    try {
        const response = await axios.get(secureResource,{ params: { ts: timestamp, apikey: publicKey, hash: hash } })
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter comic: ', error);
        return null;
    }
}

export async function getCharacterById(comicId: number) {
    try {
        const response = await api.get(`/series/${comicId}`,
            { params: { ts: timestamp, apikey: publicKey, hash: hash } });
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter series: ', error);
        return null;
    }
}

export async function getSeriesByName(nameStartsWith: string) {
    try {
        const response = await api.get('/series',
            { params: { nameStartsWith, ts: timestamp, apikey: publicKey, hash: hash } });
        return response.data.data.results;
    } catch (error) {
        console.error('Erro ao obter series: ', error);
        return null;
    }
}



export async function getSeriesAdvanced({ offset, limit }: { offset?: number, limit?: number }) {
    try {
        const params = { ts: timestamp, apikey: publicKey, hash: hash, offset, limit }
        const response = await api.get(`/series`,
            { params });
        return response.data.data.results;
    } catch (error) {
        console.error('Erro ao obter series: ', error);
        return null;
    }
}