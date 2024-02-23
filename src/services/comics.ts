import axios from "axios";

import api,{axiosConfig} from "./api";

export async function getComicByURI(resourceURI: string) {
    const secureResource = resourceURI.replace("http:", "https:")
    try {
        const response = await axios.get(secureResource, axiosConfig)
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter comic: ', error);
        return null;
    }
}

export async function getCharacterById(comicId: number) {
    try {
        const response = await api.get(`/comics/${comicId}`);
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter comics: ', error);
        return null;
    }
}