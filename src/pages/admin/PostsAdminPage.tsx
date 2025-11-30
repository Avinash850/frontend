import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { postService } from "../../services/postService";
import { blogService } from "../../services/blogService"; // to fetch categories (you already have this)

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


const emptyForm = {
  id: null as number | null,
  name: "",
  slug: "",
  short_description: "",
  description: "",
  seo_title: "",
  seo_keywords: "",
  seo_description: "",
  json_schema: "",
  category_id: null as number | null,
  status: 1,  // default active
  image: "",   // optional if your table has it
};


  const [newForm, setNewForm] = useState({ ...emptyForm });
  const [editForm, setEditForm] = useState({ ...emptyForm });
  const [viewItem, setViewItem] = useState<any>(null);

  // Search
  const [q, setQ] = useState("");

  // Load posts & categories
  const loadPosts = async () => {
    try {
      const res = await postService.getPosts();
      const list = Array.isArray(res?.data) ? res.data : [];
      setPosts(list);
    } catch (e) {
      console.error("Failed to load posts", e);
      setPosts([]);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await blogService.getCategories();
      const list = Array.isArray(res?.data) ? res.data : [];
      setCategories(list);
    } catch (e) {
      // categories optional — set empty
      setCategories([]);
    }
  };

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  // reset page on search
  useEffect(() => {
    setPage(1);
  }, [q]);

  // reset forms when modals close
  useEffect(() => {
    if (!openNew) setNewForm({ ...emptyForm });
    if (!openEdit) setEditForm({ ...emptyForm });
  }, [openNew, openEdit]);

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

  const totalPages = Math.max(1, Math.ceil((Array.isArray(filtered) ? filtered.length : 0) / limit));

  // Helper image preview
  const handleImageChange = (file: File | null, setter: any) => {
    if (!file) {
      setter((s: any) => ({ ...s, imageFile: null, imagePreview: "" }));
      return;
    }
    const url = URL.createObjectURL(file);
    setter((s: any) => ({ ...s, imageFile: file, imagePreview: url }));
  };

  // Create post
  const handleSaveNew = async () => {
    if (!newForm.name.trim()) return alert("Name is required");
    try {
      const payload: any = {
        name: newForm.name,
        slug: newForm.slug || newForm.name.toLowerCase().replace(/\s+/g, "-"),
        short_description: newForm.short_description,
        description: newForm.description,
        category_id: newForm.category_id,
        seo_title: newForm.seo_title,
        seo_keywords: newForm.seo_keywords,
        seo_description: newForm.seo_description,
        json_schema: newForm.json_schema,
      };

      // image upload left as dummy same as doctor
      await postService.createPost(payload /*, newForm.imageFile optional*/);
      setOpenNew(false);
      setNewForm({ ...emptyForm });
      loadPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  // Edit open
  const handleOpenEdit = (item: any) => {
    setEditForm({
      id: item.id ?? null,
      name: item.name ?? "",
      slug: item.slug ?? "",
      short_description: item.short_description ?? "",
      description: item.description ?? "",
      seo_title: item.seo_title ?? "",
      seo_keywords: item.seo_keywords ?? "",
      seo_description: item.seo_description ?? "",
      json_schema: item.json_schema ?? "",
      category_id: item.category_id ?? null,
      imageFile: null,
      imagePreview: item.image ?? item.image_url ?? "",
    });
    setOpenEdit(true);
  };

  const handleSaveEdit = async () => {
    if (!editForm.name.trim()) return alert("Name is required");
    try {
      const payload: any = {
        name: editForm.name,
        slug: editForm.slug || editForm.name.toLowerCase().replace(/\s+/g, "-"),
        short_description: editForm.short_description,
        description: editForm.description,
        category_id: editForm.category_id,
        seo_title: editForm.seo_title,
        seo_keywords: editForm.seo_keywords,
        seo_description: editForm.seo_description,
        json_schema: editForm.json_schema,
      };

      await postService.updatePost(editForm.id, payload /*, editForm.imageFile optional*/);
      setOpenEdit(false);
      loadPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to update post");
    }
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
      alert("Failed to delete");
    }
  };

  // small UI helper for truncated text
  const Truncate = ({ text, length = 80 }: { text?: string; length?: number }) => (
    <span>{text && text.length > length ? text.slice(0, length) + "..." : text}</span>
  );

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
              onClick={() => {
                setNewForm({ ...emptyForm });
                setOpenNew(true);
              }}
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
                  const categoryLabel = categories.find((c) => c.id === p.category_id)?.name ?? "-";
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

        {/* NEW */}
        <Modal open={openNew} setOpen={setOpenNew} title="Add New Post">
          <div className="max-h-[80vh] overflow-y-auto px-1">
            <div className="space-y-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name*</label>
                    <input
                      value={newForm.name}
                      onChange={(e) =>
                        setNewForm({
                          ...newForm,
                          name: e.target.value,
                          slug: newForm.slug || e.target.value.toLowerCase().replace(/\s+/g, "-"),
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Slug</label>
                      <input
                        value={newForm.slug}
                        onChange={(e) => setNewForm({ ...newForm, slug: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">SEO Description</label>
                      <input
                        value={newForm.seo_description}
                        onChange={(e) => setNewForm({ ...newForm, seo_description: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Short Description (3 to 4 Lines only)</label>
                    <textarea
                      value={newForm.short_description}
                      onChange={(e) => setNewForm({ ...newForm, short_description: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">SEO Title</label>
                      <input
                        value={newForm.seo_title}
                        onChange={(e) => setNewForm({ ...newForm, seo_title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Categories</label>
                      <select
                        value={newForm.category_id ?? ""}
                        onChange={(e) => setNewForm({ ...newForm, category_id: e.target.value ? Number(e.target.value) : null })}
                        className="w-full px-3 py-2 border rounded-md bg-white"
                      >
                        <option value="">Select an option</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">SEO Keywords</label>
                      <input
                        value={newForm.seo_keywords}
                        onChange={(e) => setNewForm({ ...newForm, seo_keywords: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter keywords"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Json schema</label>
                      <textarea
                        value={newForm.json_schema}
                        onChange={(e) => setNewForm({ ...newForm, json_schema: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <div className="border p-2 rounded">
                    {newForm.imagePreview ? (
                      <div className="relative">
                        <img src={newForm.imagePreview} alt="preview" className="w-full h-40 object-cover rounded" />
                        <button
                          onClick={() => handleImageChange(null, setNewForm)}
                          className="absolute top-2 right-2 bg-black/60 text-white px-2 rounded"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 py-6">
                        <div className="text-sm text-gray-500">Drag & Drop your files or Browse</div>
                      </div>
                    )}
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files?.[0] ?? null, setNewForm)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <ReactQuill value={newForm.description} onChange={(val) => setNewForm({ ...newForm, description: val })} />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button className="px-4 py-2 rounded-md border" onClick={() => setOpenNew(false)}>
                  Cancel
                </button>
                <button onClick={handleSaveNew} className="px-4 py-2 rounded-md bg-green-600 text-white">
                  Create
                </button>
              </div>
            </div>
          </div>
        </Modal>

        {/* VIEW */}
        <Modal open={openView} setOpen={setOpenView} title="View Post">
          <div className="max-h-[80vh] overflow-y-auto px-1">
            {viewItem ? (
              <div className="space-y-4 pb-4">
                <div className="flex gap-6">
                  <div className="w-32 h-32 bg-gray-100 rounded overflow-hidden">
                    {viewItem.image ?? viewItem.image_url ? (
                      <img src={viewItem.image ?? viewItem.image_url} alt={viewItem.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">No image</div>
                    )}
                  </div>

                  <div>
                    <div className="text-lg font-semibold">{viewItem.name}</div>
                    <div className="text-sm text-gray-600">Category: {categories.find(c => c.id === viewItem.category_id)?.name ?? '-'}</div>
                    <div className="text-sm text-gray-500 mt-1">{viewItem.slug}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Short description</label>
                  <div className="mt-1 text-sm text-gray-800">
                    <Truncate text={viewItem.short_description} length={400} />
                  </div>
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
            ) : null}
          </div>
        </Modal>

        {/* EDIT */}
        <Modal open={openEdit} setOpen={setOpenEdit} title="Edit Post">
          <div className="max-h-[80vh] overflow-y-auto px-1">
            <div className="space-y-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name*</label>
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Slug</label>
                      <input
                        value={editForm.slug}
                        onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">SEO Description</label>
                      <input
                        value={editForm.seo_description}
                        onChange={(e) => setEditForm({ ...editForm, seo_description: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Short Description (3 to 4 Lines only)</label>
                    <textarea
                      value={editForm.short_description}
                      onChange={(e) => setEditForm({ ...editForm, short_description: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">SEO Title</label>
                      <input
                        value={editForm.seo_title}
                        onChange={(e) => setEditForm({ ...editForm, seo_title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Categories</label>
                      <select
                        value={editForm.category_id ?? ""}
                        onChange={(e) => setEditForm({ ...editForm, category_id: e.target.value ? Number(e.target.value) : null })}
                        className="w-full px-3 py-2 border rounded-md bg-white"
                      >
                        <option value="">Select an option</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">SEO Keywords</label>
                      <input
                        value={editForm.seo_keywords}
                        onChange={(e) => setEditForm({ ...editForm, seo_keywords: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter keywords"
                      />
                    </div>

                                            <div>
                      <label className="block text-sm font-medium mb-1">Json schema</label>
                      <textarea
                        value={editForm.json_schema}
                        onChange={(e) => setEditForm({ ...editForm, json_schema: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <div className="border p-2 rounded">
                    {editForm.imagePreview ? (
                      <div className="relative">
                        <img src={editForm.imagePreview} alt="preview" className="w-full h-40 object-cover rounded" />
                        <button
                          onClick={() => handleImageChange(null, setEditForm)}
                          className="absolute top-2 right-2 bg-black/60 text-white px-2 rounded"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 py-6">
                        <div className="text-sm text-gray-500">No image</div>
                      </div>
                    )}
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files?.[0] ?? null, setEditForm)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <ReactQuill value={editForm.description} onChange={(val) => setEditForm({ ...editForm, description: val })} />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button className="px-4 py-2 rounded-md border" onClick={() => setOpenEdit(false)}>
                  Cancel
                </button>
                <button onClick={handleSaveEdit} className="px-4 py-2 rounded-md bg-green-600 text-white">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PostsAdminPage;
