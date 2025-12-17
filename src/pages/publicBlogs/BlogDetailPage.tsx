import { useEffect, useState } from "react";
import { fetchBlogDetail } from "../../services/blog.api";
import Breadcrumb from "../../components/common/Breadcrumb";

const BlogDetailPage = ({ slug }: { slug: string }) => {
    const [blog, setBlog] = useState<any>(null);

    useEffect(() => {
        loadBlog();
    }, [slug]);

    const loadBlog = async () => {
        const data = await fetchBlogDetail(slug);
        setBlog(data);
    };

    if (!blog) return null;

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "#/" },
                    { label: "Blogs", href: "#/blogs" },
                    { label: blog.name }
                ]}
            />

            {/* Hero Section */}
            <div className="relative mt-6 mb-8">
                {blog.image_url && (
                    <img
                        src={blog.image_url}
                        alt={blog.name}
                        className="w-full h-[420px] object-cover rounded-xl"
                    />
                )}

                <div className="absolute inset-0 bg-black/40 rounded-xl" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        {blog.name}
                    </h1>

                    {blog.short_description && (
                        <p className="text-lg text-gray-200 max-w-3xl">
                            {blog.short_description}
                        </p>
                    )}
                </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <span>
                    📅 Published on{" "}
                    {new Date(blog.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })}
                </span>

                {blog.seo_keywords && (
                    <div className="flex flex-wrap gap-2">
                        {blog.seo_keywords.split(",").map((tag: string, i: number) => (
                            <span
                                key={i}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                            >
                                #{tag.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Short Description Highlight */}
            {blog.short_description && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-8">
                    <p className="text-gray-700 text-base">
                        {blog.short_description}
                    </p>
                </div>
            )}
            
            {/* Content */}
            <div className="prose prose-lg max-w-none">
            <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: blog.description }}
            />
            </div>
        </div>
    );
};

export default BlogDetailPage;
