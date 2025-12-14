const BlogCard = ({ blog }: any) => {
  const openBlog = () => {
    window.location.hash = `#/blogs/${blog.slug}`;
  };

  return (
    <div
      onClick={openBlog}
      className="cursor-pointer border rounded-lg overflow-hidden hover:shadow"
    >
      <img
        src={blog.image_url}
        alt={blog.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">
          {blog.name}
        </h3>

        <p className="text-sm text-gray-600">
          {blog.short_description}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
