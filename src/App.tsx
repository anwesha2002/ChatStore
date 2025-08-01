
import './App.css'
import {SignedIn , SignedOut , SignInButton , UserButton, useUser} from "@clerk/clerk-react";
import { useEffect , useMemo , useState} from "react";
import {editWords , getWords} from "./Network/Data_Api.ts";
import {Header} from "./Component/Header.tsx";
import { SearchBar } from './Component/SearchBar.tsx';
import {WordCard} from "./Component/WordCard.tsx";
import type {wordsModel} from "./Models/wordsModel.ts";
import {CategoryFilter} from "./Component/CategoryFilter.tsx";
import EmptyState from "./Component/EmptyState.tsx";
import {Phrase} from "./Component/phrase.tsx";


function App() {

  const {  user, isSignedIn } = useUser()
    const [words, setWords] = useState<wordsModel[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectFavourite, setSelectFavourite] = useState<boolean>(false);
    const [phrase, setPhrase] = useState<boolean>(false);

  console.log("userId : " + user?.id)

    useEffect ( () => {

        if(!user) return ;

        if(!user.emailAddresses || user.emailAddresses.length === 0) {
            console.error("No email addresses found for the user.");
            return;
        }

        (async () => {
            await getWords(user.emailAddresses[0].emailAddress)
                .then(res=>{setWords(res)})
        })()
    } , [user] );

    const favoriteWords = useMemo(() => {
        return words?.filter(word => word?.isFavourite);
    }, [words]);

    const phraseWords = useMemo(() => {
        return words?.filter(word => word.type !== "word_phrase_idiom");
    },[words]);

    const filteredWords = useMemo(()=>{
        return words?.filter(word => {
            const matchingWords = word?.word?.toLowerCase ().includes ( searchTerm?.toLowerCase () ) || word.definition?.toLowerCase ().includes ( searchTerm?.toLowerCase () )
            const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;

            return matchingWords && matchesCategory;

        });

    },[searchTerm, words, selectedCategory]);

    const handleToggleFavorite = async  (id: string) => {

        const wordIndex = filteredWords.findIndex(word => word._id === id)

        if (wordIndex === -1) {
            console.error("Word not found with id:", id);
            return;
        }

        const updatedWords = { ...words[wordIndex] , isFavourite : !words[wordIndex].isFavourite };


        await editWords(updatedWords)
            .then(()=>(setWords((prevWords) =>
                prevWords.map(word => word._id === id ? updatedWords : word)
            ))
        )


    };

    const wordCounts = useMemo(() => {
        const counts : { [key: string]: number }  = { all: words.length || 0}

        if (!words || !Array.isArray(words)) {
            return counts;
        }

        words.forEach(word => {
            if (!word?.category) return; // Skip if category is undefined
            counts[word.category] = (counts[word.category] || 0) + 1;
        });
        return counts;
    }, [words]);



    function handleSearchChange(term: string) {
        setSearchTerm(term);
    }

    function handleCategoryChange(category: string) {
        setSelectedCategory(category);
    }

    console.log(filteredWords)



  return (
    // <div>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div
                // className="bg-indigo-100 p-4 flex justify-center items-center shadow-md  "
            >

                <SignedOut >
                    <div className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-4 py-2 transition-colors duration-200   flex justify-center">
                        <SignInButton mode = 'modal'
                        >Sign In</SignInButton>
                    </div>
                </SignedOut>
                <SignedIn >

                        <UserButton    />

                </SignedIn>
            </div>
            <div className="container mx-auto px-4 py-12">
                {isSignedIn &&
                    <>

                        <Header setPhrase={setPhrase} totalWords={words.length} setSelectFavourite={setSelectFavourite}  favoriteWords={favoriteWords} phraseWords={phraseWords}/>

                        <div className="space-y-8 mb-12">
                            <SearchBar
                                searchTerm={searchTerm}
                                onSearchChange={handleSearchChange}
                            />

                            <CategoryFilter
                                selectedCategory={selectedCategory}
                                onCategoryChange={handleCategoryChange}
                                wordCounts={wordCounts}
                            />
                        </div>

                    </>
                }


                {words.length === 0 ? (
                    <EmptyState isSearching={searchTerm.length > 0 || selectedCategory !== 'all'} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {selectFavourite ?
                            filteredWords.filter(word => word?.isFavourite).length === 0 ? (
                                <div className="col-span-3 text-center text-gray-500">
                                    No favorite words found.
                                </div>
                            ) : (
                                filteredWords.filter(word => word?.isFavourite).map(word => (
                                    <WordCard
                                        setWords={setWords}
                                        key={word._id}
                                        word={word}
                                        onToggleFavorite={handleToggleFavorite}
                                    />
                                ))
                            ) :
                            <>
                                {
                                    phrase ?
                                        ( filteredWords?.filter(word => word.type != "word_phrase_idiom").map(word => (
                                            <Phrase word={word} setWords={setWords}/>
                                        ))) :
                                        (filteredWords?.filter(word=>word.type === "word_phrase_idiom").map( word => (
                                        <WordCard
                                            setWords={setWords}
                                            key={word._id}
                                            word={word}
                                            onToggleFavorite={handleToggleFavorite}
                                        />
                                    )))
                                }
                            </>

                        }
                    </div>
                )}
            </div>
        </div>
    // </div>
  )
}

export default App

