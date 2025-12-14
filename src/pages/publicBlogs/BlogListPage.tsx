import { useEffect, useState } from "react";
import { fetchBlogs, fetchBlogCategories } from "../../services/blog.api";
import BlogCard from "../../components/blogs/BlogCard";
import BlogCategories from "../../components/blogs/BlogCategories";
import Pagination from "../../components/blogs/Pagination";

const BlogListPage = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

    const handleCategoryChange = (slug: string | null) => {
        setActiveCategory(slug);
        setPage(1);
    };

    return (
        <div className="flex gap-6 px-6 py-8">
            {/* 70% Blogs */}
            <div className="w-[70%]">
                <div className="grid grid-cols-2 gap-6">
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

            {/* 30% Categories */}
            <div className="w-[30%] sticky top-24 h-fit">
                <BlogCategories
                    categories={categories}
                    activeCategory={activeCategory}
                    onChange={handleCategoryChange}
                />
            </div>
        </div>
    );
};

export default BlogListPage;
