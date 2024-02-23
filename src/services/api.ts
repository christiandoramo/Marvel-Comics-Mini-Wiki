import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const timestamp = new Date().getTime().toString();
const hash = md5(timestamp + privateKey + publicKey);

export const axiosConfig = { params: { ts: timestamp, apikey: publicKey, hash: hash } }

const api = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public/',
    params: { ts:timestamp, apikey: publicKey, hash }
});

export default api;
