import axios from "axios";

import api,{axiosConfig} from "./api";
export async function getEventByURI(resourceURI: string) {
    const secureResource = resourceURI.replace("http:", "https:")
    try {
        const response = await axios.get(secureResource, axiosConfig)
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter event: ', error);
        return null;
    }
}

export async function getEventById(eventId: number) {
    try {
        const response = await api.get(`/events/${eventId}`);
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter event: ', error);
        return null;
    }
}