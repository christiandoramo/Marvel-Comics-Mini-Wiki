import axios from "axios";
import api, { axiosConfig } from "./api";

export async function getSerieByURI(resourceURI: string) {
    const secureResource = resourceURI.replace("http:", "https:")
    try {
        const response = await axios.get(secureResource, axiosConfig)
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter serie: ', error);
        return null;
    }
}

export async function getStoryById(storyId: number) {
    try {
        const response = await api.get(`/stories/${storyId}`);
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter series: ', error);
        return null;
    }
}