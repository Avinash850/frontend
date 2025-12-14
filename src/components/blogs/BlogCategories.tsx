const BlogCategories = ({
    categories,
    activeCategory,
    onChange
}: any) => {
    return (
        <div>
            <h3 className="font-semibold mb-4">By Specialities</h3>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onChange(null)}
                    className={`px-3 py-1 rounded-full text-sm ${
                        !activeCategory ? "bg-blue-600 text-white" : "bg-gray-100"
                    }`}
                >
                    All
                </button>

                {categories.map((cat: any) => (
                    <button
                        key={cat.id}
                        onClick={() => onChange(cat.slug)}
                        className={`px-3 py-1 rounded-full text-sm ${
                            activeCategory === cat.slug
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100"
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BlogCategories;
