// submit.js

export const SubmitButton = () => {

    return (
        <div className="bg-dark-900 border-t border-dark-700 px-4 py-3 flex items-center justify-center">
            <button
                type="submit"
                className="
                    px-6 py-2.5
                    bg-primary-600 hover:bg-primary-700
                    text-white font-semibold
                    rounded-lg
                    transition-all duration-200
                    flex items-center gap-2
                    shadow-lg hover:shadow-xl
                    hover:scale-105
                    active:scale-95
                "
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Run Pipeline
            </button>
        </div>
    );
};
