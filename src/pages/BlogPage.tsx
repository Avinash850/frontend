import React, { useEffect, useState } from "react";
import axios from "axios";
import showToast from '../utils/toastNotification'; 

interface Blog {
    id: number;
    title: string;
    imageUrl?: string;
    description: string;
    url: string;
}

interface BlogSection {
    title: string;
    isSlider?: boolean;
    blogs: Blog[];
}

const BlogPage: React.FC = () => {
    const [blogSections, setBlogSections] = useState<BlogSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // ✅ Detect admin mode
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const adminKey = params.get("admin");
        if (adminKey === "JHG83hfs73Bz") {
            setIsAdmin(true);
        }
    }, []);

    // ✅ Fetch blogs dynamically
    // useEffect(() => {
    //     const fetchBlogs = async () => {
    //         try {
    //             const { data } = await axios.get(
    //                 `${import.meta.env.VITE_API_BASE_URL}/api/blogs`
    //             );
    //             console.log("Fetched Data:", data); // Log the fetched data

    //             if (Array.isArray(data.data)) {
    //                 setBlogSections(data.data);
    //             } else {
    //                 console.warn("Unexpected API response:", data);
    //                 setBlogSections([]);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching blogs:", error);
    //             setBlogSections([]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchBlogs();
    // }, []);

     // ✅ Fetch blogs dynamically
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/blogs`
            );
            console.log("Fetched Data:", data); // Log the fetched data

            if (Array.isArray(data.data)) {
                setBlogSections(data.data);
            } else {
                console.warn("Unexpected API response:", data);
                setBlogSections([]);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setBlogSections([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();  // Fetch blogs when component mounts
    }, []);


     const handleImageUpload = async (blogId: number, file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        if(!file) return;
        try {
            // Optimistically update the UI
            setBlogSections((prev) =>
                prev.map((section) => ({
                    ...section,
                    blogs: section.blogs.map((b) =>
                        b.id === blogId
                            ? {
                                ...b,
                                imageUrl: `${import.meta.env.VITE_API_BASE_URL}/uploads/blogs/${blogId}/${file.name}?t=${Date.now()}`, // Add the timestamp to force a refresh
                            }
                            : b
                    ),
                }))
            );

            // Send the request to upload the image to the server
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/blogs/${blogId}/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            // Fetch the latest blogs data after the successful upload
            fetchBlogs();  // Refresh the blog list

            // Show success notification
            showToast('Image uploaded successfully!', 'success');  // Toast notification

        } catch (err) {
            console.error("Image upload failed:", err);
            // Rollback the optimistic update in case of failure
            fetchBlogs();  // Re-fetch to ensure the state is in sync with the server
            showToast('Image upload failed. Please try again.', 'error');  // Error notification
        }
    };
  
    // const handleImageUpload = async (blogId: number, file: File) => {
    //     const formData = new FormData();
    //     formData.append("image", file);

    //     try {
    //         await axios.post(
    //             `${import.meta.env.VITE_API_BASE_URL}/api/blogs/${blogId}/upload`,
    //             formData,
    //             {
    //                 headers: { "Content-Type": "multipart/form-data" },
    //             }
    //         );

            
    //         setBlogSections((prev) =>
    //             prev.map((section) => ({
    //                 ...section,
    //                 blogs: section.blogs.map((b) =>
    //                     b.id === blogId
    //                         ? {
    //                             ...b,
    //                             imageUrl: `${import.meta.env.VITE_API_BASE_URL}/uploads/blogs/${blogId}/${file.name}?t=${Date.now()}`,
    //                         }
    //                         : b
    //                 ),
    //             }))
    //         );
    //     } catch (err) {
    //         console.error("Image upload failed:", err);
    //         alert("Image upload failed. Please try again.");
    //     }
    // };

   


    // ✅ Loading state
    if (loading) {
        return (
            <div className="text-center py-10 text-gray-500">Loading blogs...</div>
        );
    }

    // ✅ Empty data handling
    if (!blogSections.length) {
        return (
            <div className="text-center py-20 text-gray-500">
                No blogs found. Please add some blogs in the admin panel.
            </div>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-teal-50 py-16 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-3">Our Blogs</h1>
                <p className="text-gray-600 text-lg">
                    Read the latest articles and expert tips on health, wellness, and
                    fitness.
                </p>
                {isAdmin && (
                    <p className="text-sm text-red-500 mt-2">
                        🔒 Admin mode active — image uploads enabled
                    </p>
                )}
            </section>

            {/* Blog Sections */}
            <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
                {blogSections.map((section, idx) => (
                    <div key={idx}>
                        {/* Section Header */}
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
                            {section.isSlider && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            document
                                                .getElementById(`slider-${idx}`)
                                                ?.scrollBy({ left: -300, behavior: "smooth" });
                                        }}
                                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={() => {
                                            document
                                                .getElementById(`slider-${idx}`)
                                                ?.scrollBy({ left: 300, behavior: "smooth" });
                                        }}
                                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                                    >
                                        →
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Blog Section */}
                        <div
                            id={section.isSlider ? `slider-${idx}` : undefined}
                            className={
                                section.isSlider
                                    ? "flex gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
                                    : "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                            }
                        >
                            {section.blogs.length > 0 ? (
                                section.blogs.map((blog) => (
                                    <div
                                        key={blog.id}
                                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 min-w-[300px] flex flex-col"
                                    >
                                        <div className="relative">
                                            <img
                                                src={blog.image_url || "https://via.placeholder.com/400x250?text=No+Image"}
                                                alt={blog.title}
                                                className="rounded-t-2xl w-full h-52 object-cover" // Adjusted to limit the height of images
                                            />
                                            {isAdmin && (
                                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                                    <label className="cursor-pointer bg-white text-gray-800 px-3 py-2 rounded-md text-sm font-semibold">
                                                        Upload New Image
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                e.target.files && handleImageUpload(blog.id, e.target.files[0])
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-5 flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{blog.title}</h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.description}</p>
                                            <a
                                                href={blog.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 font-medium hover:text-blue-700"
                                            >
                                                Read More →
                                            </a>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No blogs in this section.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
};

export default BlogPage;
