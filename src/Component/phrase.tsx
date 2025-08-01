import {Calendar , Circle , Trash} from "lucide-react";
import type {wordsModel} from "../Models/wordsModel.ts";
import style from "../Styles/Phrase.module.css"
import {type Dispatch , type SetStateAction , useState} from "react";
import {deleteWords} from "../Network/Data_Api.ts";
import {Modal} from "./Modal.tsx";

export function Phrase({word, setWords} : {word : wordsModel , setWords : Dispatch<SetStateAction<wordsModel[]>>}) {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const [isDeleting, setIsDeleting] = useState(false);
    const [isopen, setIsOpen] = useState<boolean>(false);

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
        <>
            <div onClick={()=>setIsOpen(true)} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group cursor-pointer">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className={ ` ${style.sentence} sentence text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors` }>
                                {word.word}
                            </h3>

                        </div>

                    </div>


                    <div className="mb-4">
                        <p className={ `${style.definition} text-gray-700 leading-relaxed` }>{word.definition}</p>
                    </div>

                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border-x-4 border-blue-400">
                        <p className="text-gray-600 italic group-hover:text-blue-600 transition-colors">"{word.exampleSentence}"</p>
                    </div>


                    <div className="flex items-center justify-between text-sm text-gray-500">
                        {
                            isDeleting ? (
                                <Circle className="text-red-400"/>
                            ) : (
                                <Trash onClick={()=>
                                    deletewords ( word )
                                } className="h-4 w-4 text-red-400 cursor-pointer" />
                            )
                        }
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Added {formatDate(word?.createdAt)}</span>
                            </div>
                        </span>
                    </div>
                </div>

            </div>

            {
                isopen &&
                // <div className=" flex items-center justify-center text-sm text-gray-500">
                    <Modal onClose={()=>setIsOpen(false)} word={word} setIsOpen={setIsOpen} isOpen={isopen}/>
                // </div>
            }
        </>
    );
}

