import type {wordsModel} from "../Models/wordsModel.ts";

// const api_route = "http://localhost:5000";
const api_route = "https://botcache.onrender.com";

export const getWords = async (email: string) => {
    const response = await fetch(`${api_route}/api/words/${email}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.json();
}

export const editWords = async (word : wordsModel) => {
    const response = await fetch(`${api_route}/api/words/${word._id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
    })

    return response.json();
}

export const deleteWords = async (word : wordsModel) => {
    const response = await fetch(`${api_route}/api/words/${word._id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()

    return data;
}