export interface SerieData {
    title: string;
    description: string;
    textObjects: { type: string, language: string, text: string }[] //pegar o primeiro pelo menos se description for ""
    urls: { type: string, url: string }[]
    //se type === "details", pegar a url para levaR ATE a pagina com detalhes da marel oficial
    thumbnail: {
        path: string,
        extension: string
    };
}