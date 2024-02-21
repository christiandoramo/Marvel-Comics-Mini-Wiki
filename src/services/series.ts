import axios from "axios";
import md5 from 'md5'; // Biblioteca para hash MD5

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const timestamp = new Date().getTime().toString();
const hash = md5(timestamp + privateKey + publicKey);

export async function getSerieByURI(resourceURI: string) {
    try {
        const response = await axios.get(resourceURI,{ params: { ts: timestamp, apikey: publicKey, hash: hash } })
        return response.data.data.results[0];
    } catch (error) {
        console.error('Erro ao obter comic: ', error);
        return null;
    }
}