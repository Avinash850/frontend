import { useEffect, useState } from "react";
import { fetchBlogs, fetchBlogCategories } from "../../services/blog.api";
import BlogCard from "../../components/blogs/BlogCard";
import BlogCategories from "../../components/blogs/BlogCategories";
import Pagination from "../../components/blogs/Pagination";

const BlogListPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeCategory, setActiveCategory] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadBlogs();
    }, [page, activeCategory]);

    const loadCategories = async () => {
        const categories = await fetchBlogCategories();
        setCategories(categories);
    };

    const loadBlogs = async () => {
        const res = await fetchBlogs({
            page,
            limit: 6,
            category: activeCategory || undefined
        });

        setBlogs(res.data);
        setTotalPages(res.pagination.totalPages);
    };

    const handleCategoryChange = (slug) => {
        setActiveCategory(slug);
        setPage(1);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row gap-6 px-4 md:px-6 py-8">
                
                {/* Blogs Section */}
                <div className="w-full md:w-[70%]">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        Pregajourney Article Content
                    </h2>

                    {/* Mobile Filter Button */}
                    <div className="md:hidden mb-4 flex justify-end">
                        <button
                            onClick={() => setShowFilters(true)}
                            className="px-4 py-2 border rounded-md text-sm"
                        >
                            Filter Categories
                        </button>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {blogs.map(blog => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onChange={setPage}
                    />
                </div>

                {/* Desktop Categories Sidebar */}
                <div className="hidden md:block w-[30%] sticky top-24 h-fit">
                    <BlogCategories
                        categories={categories}
                        activeCategory={activeCategory}
                        onChange={handleCategoryChange}
                    />
                </div>
            </div>

            {/* Mobile Filter Bottom Sheet */}
            {showFilters && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
                    <div className="bg-white w-full rounded-t-xl p-4 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">
                                Filter by Category
                            </h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <BlogCategories
                            categories={categories}
                            activeCategory={activeCategory}
                            onChange={(slug) => {
                                handleCategoryChange(slug);
                                setShowFilters(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default BlogListPage;
