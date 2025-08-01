import {BookOpen , LucideInfo , Star} from "lucide-react";
import type {wordsModel} from "../Models/wordsModel.ts";
import type {Dispatch , SetStateAction} from "react";

export function Header({totalWords, favoriteWords, setSelectFavourite, setPhrase, phraseWords}: { totalWords: number, favoriteWords?: wordsModel[], phraseWords?: wordsModel[], setSelectFavourite : Dispatch<SetStateAction<boolean>>, setPhrase : Dispatch<SetStateAction<boolean>>  }) {



    return (
        <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-blue-600 rounded-xl">
                    <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Word Collection</h1>
            </div>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                Discover, learn, and master new vocabulary with your personalized word library
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
                <button onClick={()=> {
                    setSelectFavourite ( false )
                    setPhrase(false)
                }} className="cursor-pointer bg-indigo-100 p-2 px-3 rounded-sm flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">{totalWords}</span>
                    <span className="text-gray-600">words total</span>
                </button>
                <button onClick={()=> {
                    setSelectFavourite ( true )
                    setPhrase(false)
                }}  className="cursor-pointer bg-indigo-100 p-2 px-3 rounded-sm flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-900">{favoriteWords?.length}</span>
                    <span className="text-gray-600">favorites</span>
                </button>
                <button onClick={()=> {
                    setPhrase ( true )
                    setSelectFavourite ( false )
                }}  className="cursor-pointer bg-indigo-100 p-2 px-3 rounded-sm flex items-center gap-2">
                    <LucideInfo  className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-900">{phraseWords?.length}</span>
                    <span className="text-gray-600">Phrase</span>
                </button>
            </div>
        </div>
    );
}

