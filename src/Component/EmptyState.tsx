import {BookOpen , Search} from "lucide-react";

function EmptyState({ isSearching } : { isSearching : boolean}     ) {
    return (
        <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                { isSearching ? <Search className="h-full w-full"/> : <BookOpen className="h-full w-full"/> }
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                { isSearching ? 'No words found' : 'No words stored yet' }
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
                { isSearching
                    ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                    : 'Start building your vocabulary by adding new words to your collection.' }
            </p>
        </div>
    );
}

export default EmptyState;