import { CharacterData } from "../interfaces/characters"

export const CharacterPlaceholder:CharacterData = {
    id: 0,
    name: "",
    description: '',
    textObjects: [{ type: "", language: "", text: "" }],
    thumbnail: {
        path: "/placeholder.png",
        extension: "",
    },
    comics: {
        available: 0,
        collectionURI: "",
        items: [{
            resourceURI: "",
            name: "",
        }]
    },
    series: {
        available: 0,
        collectionURI: "",
        items: [{
            resourceURI: "",
            name: "",
        }]
    },
    events: {
        available: 0,
        collectionURI: "",
        items: [{
            resourceURI: "",
            name: "",
        }]
    },
    stories: {
        available: 0,
        collectionURI: "",
        items: [{
            resourceURI: "",
            name: "",
        }]
    }
}