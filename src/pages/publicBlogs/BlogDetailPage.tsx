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
        <div className="max-w-5xl mx-auto px-6 py-8">
            {/* ✅ Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "#/" },
                    { label: "Blogs", href: "#/blogs" },
                    { label: blog.name }
                ]}
            />

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">
                {blog.name}
            </h1>

            {/* Hero Image */}
            {blog.image_url && (
                <img
                    src={blog.image_url}
                    alt={blog.name}
                    className="w-full h-[400px] object-cover rounded mb-6"
                />
            )}

            {/* Content */}
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.description }}
            />
        </div>
    );
};

export default BlogDetailPage;
