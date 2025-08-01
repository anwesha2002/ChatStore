export interface wordsModel {
    word: string;
    type: string;
    definition: string;
    exampleSentence?: string;
    synonyms?: string[];
    category? : string;
    isFavourite?: boolean;
    pronunciation?: {
        phonetic?: string;
        audio_url?: string | null;
    };
    email: string; // Email of the user who added the word
    _id : string;
    createdAt : string
}