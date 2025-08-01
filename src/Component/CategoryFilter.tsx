
export function CategoryFilter({ selectedCategory, onCategoryChange , wordCounts } : {selectedCategory : string, onCategoryChange : any , wordCounts : any}) {

    const categories: { value: string; label: string }[] = [
        { value: 'all', label: 'All' },
        { value: 'noun', label: 'Nouns' },
        { value: 'verb', label: 'Verbs' },
        { value: 'adjective', label: 'Adjectives' },
        { value: 'adverb', label: 'Adverbs' },
        { value: 'phrases', label: 'Phrases' },
    ];

    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
                const count = wordCounts[category.label] || 0;
                if (count === 0 && category.label !== 'all') return null;

                return (
                    <button
                        key={category.value}
                        onClick={() => onCategoryChange(category.label)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                            selectedCategory === category.label
                                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                        }`}
                    >
                        {category.label}
                        {category.value === 'all' ? `(${count})` : `(${count})`}
                    </button>
                );
            })}
        </div>
    );
}

