import React, { useEffect, useMemo, useState } from "react";
import { postService } from "../../services/postService";
import { blogService } from "../../services/blogService";
import PostForm from "../../components/PostForm";

const Modal = ({ children, open, setOpen, title }: any) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto animate-fadeIn">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const PostsAdminPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // modals
  const [openNew, setOpenNew] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editForm, setEditForm] = useState<any>(null);
  const [viewItem, setViewItem] = useState<any>(null);

  // search
  const [q, setQ] = useState("");

  // Load posts
  const loadPosts = async () => {
    try {
      const res = await postService.getPosts();
      const list = Array.isArray(res) ? res : [];
      setPosts(list);
    } catch (e) {
      console.error("Failed to load posts", e);
      setPosts([]);
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const res = await blogService.getCategories();
      const list = Array.isArray(res?.data) ? res.data : [];
      setCategories(list);
    } catch (e) {
      setCategories([]);
    }
  };

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [q]);

  // Filter search
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter((p: any) =>
      [p.name, p.slug].join(" ").toLowerCase().includes(term)
    );
  }, [q, posts]);

  // Paginated
  const paginated = useMemo(() => {
    const start = (page - 1) * limit;
    return Array.isArray(filtered) ? filtered.slice(start, start + limit) : [];
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

  // Edit
  const handleOpenEdit = (item: any) => {
    setEditForm(item);
    setOpenEdit(true);
  };

  // View
  const handleOpenView = (item: any) => {
    setViewItem(item);
    setOpenView(true);
  };

  // Delete
  const handleDelete = async (item: any) => {
    const ok = window.confirm("Delete this post? This action cannot be undone.");
    if (!ok) return;
    try {
      await postService.deletePost(item.id);
      loadPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Posts</h1>
            <p className="text-gray-500 mt-1">Manage blog posts.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-56 px-4 py-2 border rounded-md bg-white shadow-sm"
                placeholder="Search name or slug..."
              />
              {q && (
                <button
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-2 text-sm text-gray-500"
                  onClick={() => setQ("")}
                >
                  Clear
                </button>
              )}
            </div>

            {/* New */}
            <button
              onClick={() => setOpenNew(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
            >
              + New Post
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow border">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">SL</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Slug</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No posts found.
                  </td>
                </tr>
              ) : (
                paginated.map((p: any, index: number) => {
                  const sn = (page - 1) * limit + index + 1;
                  const categoryLabel =
                      categories.find(c => c.id === p.category_id)?.name || "-";

                  return (
                    <tr key={p.id ?? index} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{sn}</td>
                      <td className="px-6 py-4 font-medium">{p.name}</td>
                      <td className="px-6 py-4 text-gray-600">{p.slug}</td>
                      <td className="px-6 py-4 text-gray-600">{categoryLabel}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleOpenView(p)}
                            className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-50"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="px-3 py-1 rounded-md border text-sm text-green-700 hover:bg-green-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="px-3 py-1 rounded-md border text-sm text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          {filtered.length > limit && (
            <div className="flex items-center justify-between p-4 border-t bg-gray-50">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded-md border ${page === 1 ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                ← Previous
              </button>

              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded-md border ${page >= totalPages ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* MODALS */}
        <Modal open={openNew} setOpen={setOpenNew} title="Add New Post">
          <PostForm
            mode="add"
            categories={categories}
            onClose={() => setOpenNew(false)}
            onSaved={loadPosts}
          />
        </Modal>

        <Modal open={openEdit} setOpen={setOpenEdit} title="Edit Post">
          {editForm && (
            <PostForm
              mode="edit"
              initialData={editForm}
              categories={categories}
              onClose={() => setOpenEdit(false)}
              onSaved={loadPosts}
            />
          )}
        </Modal>

        <Modal open={openView} setOpen={setOpenView} title="View Post">
          {viewItem && (
            <div className="max-h-[80vh] overflow-y-auto px-1 space-y-4 pb-4">
              <div className="flex gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded overflow-hidden">
                  {viewItem.image_url ? (
                    <img
                      src={viewItem.image_url}
                      alt={viewItem.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No image</div>
                  )}
                </div>

                <div>
                  <div className="text-lg font-semibold">{viewItem.name}</div>
                  <div className="text-sm text-gray-600">
                   Category: {categories.find(c => c.id === viewItem.category_id)?.name || "-"}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{viewItem.slug}</div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Short description</label>
                <div className="mt-1 text-sm text-gray-800">{viewItem.short_description}</div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Description</label>
                <div
                  className="mt-2 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: viewItem.description || "" }}
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">SEO Title</label>
                <div className="mt-1 text-sm text-gray-800">{viewItem.seo_title}</div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default PostsAdminPage;
