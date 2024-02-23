export interface GenericData {
    title: string;
    description: string;
    textObjects: { type: string, language: string, text: string }[]
    urls: { type: string, url: string }[]
    thumbnail: {
        path: string,
        extension: string
    };
    creators: OthersData;
    characters: OthersData;
}
export interface OthersData {
    available: number,
    items: {
        resourceURI: string,
        name: string,
        role?: string
    }[]
}