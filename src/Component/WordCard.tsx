import {Calendar , Circle , Heart , Trash , Volume2} from "lucide-react";
import type {wordsModel} from "../Models/wordsModel.ts";
import {deleteWords} from "../Network/Data_Api.ts";
import {type Dispatch , type SetStateAction , useState} from "react";

export function WordCard({ word, onToggleFavorite, setWords } : {word : wordsModel, onToggleFavorite : any , setWords : Dispatch<SetStateAction<wordsModel[]>> }) {
    const getPartOfSpeechColor = (pos: string | undefined) => {
        const colors = {
            noun: 'bg-emerald-100 text-emerald-800',
            verb: 'bg-blue-100 text-blue-800',
            adjective: 'bg-purple-100 text-purple-800',
            adverb: 'bg-yellow-100 text-yellow-800',
            preposition: 'bg-pink-100 text-pink-800',
            conjunction: 'bg-indigo-100 text-indigo-800',
            interjection: 'bg-red-100 text-red-800'
        };
        return colors[pos as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const [isDeleting, setIsDeleting] = useState(false);

     function deletewords(word: wordsModel) {

        if (isDeleting) return; // Prevent multiple clicks

         setIsDeleting(true)

         deleteWords(word)
            .then((res) => {
                console.log("Word deleted successfully:", res);
                setWords(prevWords => prevWords.filter(w => w._id !== word._id));
            })
            .catch(err => {
                console.error("Error deleting word:", err);
            })
             .finally(()=>setIsDeleting(false));
    }

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {word.word}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-gray-600 italic">{word.pronunciation?.phonetic}</span>
                            <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                <Volume2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => onToggleFavorite(word._id)}
                        className={`transition-all duration-200 ${
                            word.isFavourite
                                ? 'text-red-500 hover:text-red-600 transform scale-110'
                                : 'text-gray-300 hover:text-red-400'
                        }`}
                    >
                        <Heart className={`h-6 w-6 ${word.isFavourite ? 'fill-current' : ''}`} />
                    </button>
                </div>

                { word.category &&
                    <div className="mb-4">
                      <span
                          className={ `inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${ getPartOfSpeechColor ( word.category ) }` }>
                        { word.category }
                      </span>
                    </div>
                }

                <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{word.definition}</p>
                </div>

                <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-gray-600 italic">"{word.exampleSentence}"</p>
                </div>
                <div>
                    <p className="text-gray-700 mb-2 leading-relaxed">Synonyms</p>

                    {word?.synonyms?.map((synonym, index) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2"
                        >
                            {synonym}
                        </span>

                    ) )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        {
                            isDeleting ? (
                                <Circle className="text-red-400"/>
                            ) : (
                                <Trash onClick={()=>
                                    deletewords ( word )
                                } className="h-4 w-4 text-red-400 cursor-pointer" />
                            )
                        }

                        {/*<span>Added {formatDate(word?.createdAt)}</span>*/}
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Added {formatDate(word?.createdAt)}</span>
                    </div>
          </span>
                </div>
            </div>
        </div>
    );
};

