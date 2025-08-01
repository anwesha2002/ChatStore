import type {Dispatch , SetStateAction} from "react";
import type {wordsModel} from "../Models/wordsModel.ts";
import style from "../Styles/Phrase.module.css";


export function Modal({ isOpen , setIsOpen , word, onClose }: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    onClose: () => void,
    word: wordsModel
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 " >
            {/* Backdrop with blur */ }
            <div
                className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60 backdrop-blur-md "
                onClick={ onClose }
            />
            <dialog style={ { width : "100%", maxHeight : "90vh" } } className= "   p-6 z-50 bg-indigo-100  overflow-y-scroll"
                    open={ isOpen } >
                <div className={ ` ${style.resultDiv} mb-4 p-3 bg-gray-50 rounded-lg border-x-4 border-blue-400` }  style={{whiteSpace : 'pre-line'}}>
                    <h3 className= "  sentence text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors  text-justify" >
                        { word.word }
                    </h3>
                </div>

                <div className={ `${style.resultDiv} mb-4 ` } style={{whiteSpace : 'pre-line'}}>
                    <p className={ ` text-gray-700 leading-relaxed text-justify` }>{ word.definition }</p>
                </div>
                <div>
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg  ">
                        <p className= " text-gray-600 italic group-hover:text-blue-600 transition-colors" >"{ word.exampleSentence }"</p>
                    </div>
                </div>
                <div className="">
                    <button className="cursor-pointer bg-indigo-300 p-2 px-3 rounded-sm mr-2 font-semibold "
                            onClick={ () => setIsOpen ( false ) }>
                        Cancel
                    </button>

                </div>
            </dialog>
        </div>
    );
}

