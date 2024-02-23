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

export async function getSerieById(serieId: number) {
    try {
        const response = await api.get(`/series/${serieId}`);
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter series: ', error);
        return null;
    }
}