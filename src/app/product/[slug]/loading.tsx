const Loading = () => {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
            {/* Loading Spinner */}
            <div className="relative flex h-16 w-16 items-center justify-center">
                <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />

                <span className="text-2xl">🛒</span>
            </div>

            {/* Loading Message */}
            <div className="text-center">
                <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
                    একটু অপেক্ষা করুন
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    আপনার পণ্যের তথ্য লোড হচ্ছে...
                </p>
            </div>

            {/* Loading Indicator */}
            <div className="flex gap-1.5">
                <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-green-600" />
            </div>
        </div>
    );
};

export default Loading;
