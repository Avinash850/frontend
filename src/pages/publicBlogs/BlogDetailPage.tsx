import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogDetail, fetchRelatedBlogs } from "../../services/blog.api";
import Breadcrumb from "../../components/common/Breadcrumb";
import BlogCard from "../../components/blogs/BlogCard";
import GetInTouchForm from "../../components/GetInTouch";

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);

  useEffect(() => {
    if (!slug) return;
    fetchBlogDetail(slug).then(setBlog);
  }, [slug]);

  useEffect(() => {
    if (!blog) return;

    fetchRelatedBlogs({
      category: blog.category_slug,
      exclude: blog.slug,
      limit: 4,
    }).then(setRelatedBlogs);
  }, [blog]);

  if (!blog) return null;

  return (
    <div className="max-w-7xl mx-auto px-2 py-8">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blogs", href: "/blogs" },
            { label: blog.name },
          ]}
        />
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT – BLOG CONTENT (70%) */}
        <div className="lg:col-span-8">
          {/* Hero */}
          {/* <div className="relative mb-8">
            {blog.image_url && (
              <img
                src={blog.image_url}
                alt={blog.name}
                className="w-full h-[260px] sm:h-[360px] lg:h-[420px] object-cover rounded-xl"
              />
            )}

            <div className="absolute inset-0 bg-black/40 rounded-xl" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                {blog.name}
              </h1>

              {blog.short_description && (
                <p className="text-sm sm:text-lg text-gray-200 max-w-3xl">
                  {blog.short_description}
                </p>
              )}
            </div>
          </div> */}

          {/* Hero Image */}
            <div className="mb-6">
            {blog.image_url && (
                <img
                src={blog.image_url}
                alt={blog.name}
                className="w-full h-[260px] sm:h-[360px] lg:h-[420px] object-cover rounded-xl"
                />
            )}
            </div>

            {/* Title BELOW image (like blog list page) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {blog.name}
            </h1>

            {/* Short description below title */}
            {blog.short_description && (
            <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-4xl">
                {blog.short_description}
            </p>
            )}


          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
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

          {blog.short_description && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-8">
              <p className="text-gray-700">{blog.short_description}</p>
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl sm:text-2xl font-semibold mb-6">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedBlogs.map((b) => (
                  <BlogCard key={b.id} blog={b} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT – SIDEBAR (30%) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <GetInTouchForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
