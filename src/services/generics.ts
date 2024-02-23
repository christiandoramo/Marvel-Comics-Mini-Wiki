import axios from "axios";
import {axiosConfig} from "./api";

export async function getGenericByURI(resourceURI: string) {
    const secureResource = resourceURI.replace("http:","https:")
    try {
        const response = await axios.get(secureResource,
            axiosConfig)
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter dados: ', error);
        return null;
    }
}