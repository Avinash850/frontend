// import React, { useState, useMemo } from "react";

// /*
//  BlogsAdminPage (React + Tailwind)
//  - New Category (modal)
//  - Search
//  - Table with View / Edit actions
//  - View modal (read-only)
//  - Edit modal (save changes to local dummy data)
// */

// const initialData = [
//   { id: 1, name: "IVF", slug: "ivf" },
//   { id: 2, name: "ICSI", slug: "icsi" },
//   { id: 3, name: "Male Infertility", slug: "male-infertility" },
//   { id: 4, name: "Ovarian Induction", slug: "ovarian-induction" },
// ];

// const Modal = ({ children, open, setOpen, title }: any) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
//         <div className="flex justify-between items-center px-6 py-4 border-b">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <button
//             className="text-gray-500 hover:text-gray-700"
//             onClick={() => setOpen(false)}
//           >
//             ✕
//           </button>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// };

// const BlogsAdminPage = () => {
//   const [categories, setCategories] = useState(initialData);

//   // New category modal
//   const [openNew, setOpenNew] = useState(false);
//   const [newForm, setNewForm] = useState({ name: "", slug: "" });

//   // View modal
//   const [openView, setOpenView] = useState(false);
//   const [viewItem, setViewItem] = useState<any>(null);

//   // Edit modal
//   const [openEdit, setOpenEdit] = useState(false);
//   const [editForm, setEditForm] = useState({ id: null, name: "", slug: "" });

//   // Search
//   const [q, setQ] = useState("");

//   const filtered = useMemo(() => {
//     const term = q.trim().toLowerCase();
//     if (!term) return categories;
//     return categories.filter(
//       (c) => c.name.toLowerCase().includes(term) || c.slug.toLowerCase().includes(term)
//     );
//   }, [q, categories]);

//   const handleSaveNew = () => {
//     if (!newForm.name.trim()) return alert("Name is required");
//     const id = categories.length ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
//     setCategories([
//       ...categories,
//       {
//         id,
//         name: newForm.name.trim(),
//         slug:
//           newForm.slug.trim() ||
//           newForm.name.trim().toLowerCase().replace(/\s+/g, "-"),
//       },
//     ]);
//     setNewForm({ name: "", slug: "" });
//     setOpenNew(false);
//   };

//   const handleOpenView = (item: any) => {
//     setViewItem(item);
//     setOpenView(true);
//   };

//   const handleOpenEdit = (item: any) => {
//     setEditForm({ ...item });
//     setOpenEdit(true);
//   };

//   const handleSaveEdit = () => {
//     if (!editForm.name.trim()) return alert("Name is required");
//     setCategories(
//       categories.map((c) =>
//         c.id === editForm.id
//           ? {
//               ...editForm,
//               name: editForm.name.trim(),
//               slug:
//                 editForm.slug.trim() ||
//                 editForm.name.trim().toLowerCase().replace(/\s+/g, "-"),
//             }
//           : c
//       )
//     );
//     setOpenEdit(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold">Blog Categories</h1>
//             <p className="text-gray-500 mt-1">Manage categories used on your blog/posts.</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <input
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 className="w-56 px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none"
//                 placeholder="Search name or slug..."
//               />
//               {q && (
//                 <button
//                   className="absolute right-1 top-1/2 -translate-y-1/2 px-2 text-sm text-gray-500"
//                   onClick={() => setQ("")}
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>

//             <button
//               className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
//               onClick={() => setOpenNew(true)}
//             >
//               + New Category
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow border">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Name</th>
//                 <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Slug</th>
//                 <th className="text-right px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
//                     No categories found.
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((c) => (
//                   <tr key={c.id} className="border-t hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="font-medium">{c.name}</div>
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">{c.slug}</td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="inline-flex items-center gap-2">
//                         <button
//                           onClick={() => handleOpenView(c)}
//                           className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-50"
//                         >
//                           View
//                         </button>
//                         <button
//                           onClick={() => handleOpenEdit(c)}
//                           className="px-3 py-1 rounded-md border text-sm text-green-700 hover:bg-green-50"
//                         >
//                           Edit
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* New Category Modal */}
//         <Modal open={openNew} setOpen={setOpenNew} title="Add New Category">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Name</label>
//               <input
//                 value={newForm.name}
//                 onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
//                 className="w-full px-3 py-2 border rounded-md"
//                 placeholder="e.g. IVF"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Slug (optional)</label>
//               <input
//                 value={newForm.slug}
//                 onChange={(e) => setNewForm({ ...newForm, slug: e.target.value })}
//                 className="w-full px-3 py-2 border rounded-md"
//                 placeholder="e.g. ivf"
//               />
//             </div>

//             <div className="flex justify-end gap-3 pt-2">
//               <button className="px-4 py-2 rounded-md border" onClick={() => setOpenNew(false)}>
//                 Cancel
//               </button>
//               <button className="px-4 py-2 rounded-md bg-green-600 text-white" onClick={handleSaveNew}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </Modal>

//         {/* View Modal */}
//         <Modal open={openView} setOpen={setOpenView} title="View Category">
//           {viewItem ? (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm text-gray-500">Name</label>
//                 <div className="mt-1 text-lg font-medium">{viewItem.name}</div>
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-500">Slug</label>
//                 <div className="mt-1 text-sm text-gray-600">{viewItem.slug}</div>
//               </div>
//             </div>
//           ) : (
//             <div>Loading...</div>
//           )}
//         </Modal>

//         {/* Edit Modal */}
//         <Modal open={openEdit} setOpen={setOpenEdit} title="Edit Category">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Name</label>
//               <input
//                 value={editForm.name}
//                 onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Slug</label>
//               <input
//                 value={editForm.slug}
//                 onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//             </div>

//             <div className="flex justify-end gap-3 pt-2">
//               <button className="px-4 py-2 rounded-md border" onClick={() => setOpenEdit(false)}>
//                 Cancel
//               </button>
//               <button className="px-4 py-2 rounded-md bg-green-600 text-white" onClick={handleSaveEdit}>
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default BlogsAdminPage;




















// import React, { useEffect, useState } from "react";
// import { blogService } from "../../services/blogService";

// const BlogsAdminPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({ id: null, name: "", slug: "" });

//   // ✅ Load categories from API
//   const loadCategories = async () => {
//     try {
//       setLoading(true);
//       const { data } = await blogService.getCategories();
//       setCategories(data || []);
//     } catch (err) {
//       console.error("getCategories error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   // ✅ Submit form (Create / Update)
//   const handleSave = async () => {
//     try {
//       if (form.id) {
//         await blogService.updateCategory(form.id, {
//           name: form.name,
//           slug: form.slug,
//         });
//       } else {
//         await blogService.createCategory({
//           name: form.name,
//           slug: form.slug,
//         });
//       }

//       setShowModal(false);
//       loadCategories();
//     } catch (err) {
//       console.error("saveCategory error:", err);
//     }
//   };

//   // ✅ Toggle Status
//   const toggleStatus = async (id: number, currentStatus: number) => {
//     try {
//       const newStatus = currentStatus === 1 ? 0 : 1;
//       await blogService.updateCategoryStatus(id, newStatus);
//       loadCategories();
//     } catch (err) {
//       console.error("updateCategoryStatus error:", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between mb-4">
//         <h1 className="text-xl font-bold">Blog Categories</h1>

//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={() => {
//             setForm({ id: null, name: "", slug: "" });
//             setShowModal(true);
//           }}
//         >
//           Add Category
//         </button>
//       </div>

//       {/* ✅ Table */}
//       <table className="w-full border">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border px-3 py-2">ID</th>
//             <th className="border px-3 py-2">Name</th>
//             <th className="border px-3 py-2">Slug</th>
//             <th className="border px-3 py-2">Status</th>
//             <th className="border px-3 py-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {loading && (
//             <tr>
//               <td colSpan={5} className="text-center py-3">
//                 Loading...
//               </td>
//             </tr>
//           )}

//           {!loading && categories.length === 0 && (
//             <tr>
//               <td colSpan={5} className="text-center py-3">
//                 No categories found
//               </td>
//             </tr>
//           )}

//           {!loading &&
//             categories.map((c: any) => (
//               <tr key={c.id}>
//                 <td className="border px-3 py-2">{c.id}</td>
//                 <td className="border px-3 py-2">{c.name}</td>
//                 <td className="border px-3 py-2">{c.slug}</td>

//                 <td className="border px-3 py-2 text-center">
//                   <button
//                     onClick={() => toggleStatus(c.id, c.status)}
//                     className={`px-3 py-1 rounded ${
//                       c.status === 1
//                         ? "bg-green-500 text-white"
//                         : "bg-red-500 text-white"
//                     }`}
//                   >
//                     {c.status === 1 ? "Active" : "Inactive"}
//                   </button>
//                 </td>

//                 <td className="border px-3 py-2 text-center">
//                   <button
//                     className="text-blue-600 mr-3"
//                     onClick={() => {
//                       setForm(c);
//                       setShowModal(true);
//                     }}
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>

//       {/* ✅ Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40">
//           <div className="bg-white p-6 rounded w-[350px]">
//             <h2 className="text-lg font-semibold mb-3">
//               {form.id ? "Edit Category" : "Add Category"}
//             </h2>

//             <input
//               type="text"
//               placeholder="Category Name"
//               className="border w-full px-3 py-2 mb-3"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />

//             <input
//               type="text"
//               placeholder="Slug"
//               className="border w-full px-3 py-2 mb-3"
//               value={form.slug}
//               onChange={(e) => setForm({ ...form, slug: e.target.value })}
//             />

//             <div className="flex justify-end mt-3 gap-3">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogsAdminPage;

























// import React, { useEffect, useState, useMemo } from "react";
// import { blogService } from "../../services/blogService";



// const Modal = ({ children, open, setOpen, title }: any) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 animate-fadeIn">
//         <div className="flex justify-between items-center px-6 py-4 border-b">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <button
//             className="text-gray-500 hover:text-gray-700"
//             onClick={() => setOpen(false)}
//           >
//             ✕
//           </button>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// };

// const BlogsAdminPage = () => {
//   const [categories, setCategories] = useState<any[]>([]);

//   // modals
//   const [openNew, setOpenNew] = useState(false);
//   const [openView, setOpenView] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);

//   // forms
//   const [newForm, setNewForm] = useState({ name: "", slug: "" });
//   const [editForm, setEditForm] = useState({ id: null, name: "", slug: "" });
//   const [viewItem, setViewItem] = useState<any>(null);

//   // Search
//   const [q, setQ] = useState("");

//   // ✅ Load categories from API
//   const loadData = async () => {
//     try {
//       const res = await blogService.getCategories();
//       setCategories(res?.data || res); // depending on API format
//     } catch (e) {
//       console.error("Failed to load categories", e);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // ✅ Filter search
//   const filtered = useMemo(() => {
//     const term = q.trim().toLowerCase();
//     if (!term) return categories;
//     return categories.filter(
//       (c: any) =>
//         c.name.toLowerCase().includes(term) ||
//         c.slug.toLowerCase().includes(term)
//     );
//   }, [q, categories]);

//   // ✅ New Category
//   const handleSaveNew = async () => {
//     if (!newForm.name.trim()) return alert("Name is required");

//     try {
//       await blogService.createCategory({
//         name: newForm.name,
//         slug:
//           newForm.slug ||
//           newForm.name.toLowerCase().replace(/\s+/g, "-"),
//       });

//       setOpenNew(false);
//       setNewForm({ name: "", slug: "" });
//       loadData();
//     } catch (e) {
//       alert("Failed to create");
//     }
//   };

//   // ✅ View
//   const handleOpenView = (item: any) => {
//     setViewItem(item);
//     setOpenView(true);
//   };

//   // ✅ Edit
//   const handleOpenEdit = (item: any) => {
//     setEditForm(item);
//     setOpenEdit(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!editForm.name.trim()) return alert("Name required");

//     try {
//       await blogService.updateCategory(editForm.id, {
//         name: editForm.name,
//         slug:
//           editForm.slug ||
//           editForm.name.toLowerCase().replace(/\s+/g, "-"),
//       });

//       setOpenEdit(false);
//       loadData();
//     } catch (e) {
//       alert("Failed to update");
//     }
//   };

//   // ✅ Toggle Status
//   const handleStatusToggle = async (item) => {
//     const newStatus = item.status === 1 ? 0 : 1;

//     try {
//       await blogService.updateCategoryStatus(item.id, newStatus);
//       loadData();
//     } catch (e) {
//       alert("Failed to update status");
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold">Blog Categories</h1>
//             <p className="text-gray-500 mt-1">
//               Manage categories for blog posts.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Search */}
//             <div className="relative">
//               <input
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 className="w-56 px-4 py-2 border rounded-md bg-white shadow-sm"
//                 placeholder="Search name or slug..."
//               />
//               {q && (
//                 <button
//                   className="absolute right-1 top-1/2 -translate-y-1/2 px-2 text-sm text-gray-500"
//                   onClick={() => setQ("")}
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>

//             {/* New Category */}
//             <button
//               onClick={() => setOpenNew(true)}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
//             >
//               + New Category
//             </button>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-lg shadow border">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
//                   Slug
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
//                     No categories found.
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((c: any) => (
//                   <tr key={c.id} className="border-t hover:bg-gray-50">
//                     <td className="px-6 py-4 font-medium">{c.name}</td>
//                     <td className="px-6 py-4 text-gray-600">{c.slug}</td>

//                     {/* ✅ STATUS TOGGLE */}
//                     {/* <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleStatusToggle(c)}
//                         className={`px-4 py-1 rounded-full text-sm font-medium border transition ${
//                           c.status === 1
//                             ? "bg-green-100 text-green-700 border-green-300"
//                             : "bg-red-100 text-red-700 border-red-300"
//                         }`}
//                       >
//                         {c.status === 1 ? "Active" : "Inactive"}
//                       </button>
//                     </td> */}
//                     <td className="px-6 py-4">
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           className="sr-only peer"
//                           checked={c.status === 1}
//                           onChange={() => handleStatusToggle(c)}
//                         />
//                         <div
//                           className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full
//                           peer peer-checked:bg-green-500 relative transition"
//                         >
//                           <div
//                             className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
//                             transition-all peer-checked:translate-x-5"
//                           ></div>
//                         </div>

//                         <span className="ml-3 text-sm font-medium">
//                           {c.status === 1 ? "Active" : "Inactive"}
//                         </span>
//                       </label>
//                     </td>


//                     {/* ACTIONS */}
//                     <td className="px-6 py-4 text-right">
//                       <div className="inline-flex items-center gap-2">
//                         <button
//                           onClick={() => handleOpenView(c)}
//                           className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-50"
//                         >
//                           View
//                         </button>
//                         <button
//                           onClick={() => handleOpenEdit(c)}
//                           className="px-3 py-1 rounded-md border text-sm text-green-700 hover:bg-green-50"
//                         >
//                           Edit
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* ✅ MODALS BELOW */}

//         {/* NEW MODAL */}
//         <Modal open={openNew} setOpen={setOpenNew} title="Add New Category">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Name</label>
//               <input
//                 value={newForm.name}
//                 onChange={(e) =>
//                   setNewForm({ ...newForm, name: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Slug (optional)
//               </label>
//               <input
//                 value={newForm.slug}
//                 onChange={(e) =>
//                   setNewForm({ ...newForm, slug: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//             </div>

//             <div className="flex justify-end gap-3 pt-2">
//               <button
//                 className="px-4 py-2 rounded-md border"
//                 onClick={() => setOpenNew(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveNew}
//                 className="px-4 py-2 rounded-md bg-green-600 text-white"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </Modal>

//         {/* VIEW MODAL */}
//         <Modal open={openView} setOpen={setOpenView} title="View Category">
//           {viewItem && (
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm text-gray-500">Name</label>
//                 <div className="mt-1 text-lg font-medium">
//                   {viewItem.name}
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Slug</label>
//                 <div className="mt-1 text-gray-600">{viewItem.slug}</div>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Status</label>
//                 <div className="mt-1">
//                   {viewItem.status === 1 ? (
//                     <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
//                       Active
//                     </span>
//                   ) : (
//                     <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
//                       Inactive
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </Modal>

//         {/* EDIT MODAL */}
//         <Modal open={openEdit} setOpen={setOpenEdit} title="Edit Category">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Name
//               </label>
//               <input
//                 value={editForm.name}
//                 onChange={(e) =>
//                   setEditForm({ ...editForm, name: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Slug</label>
//               <input
//                 value={editForm.slug}
//                 onChange={(e) =>
//                   setEditForm({ ...editForm, slug: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//             </div>

//             <div className="flex justify-end gap-3 pt-2">
//               <button
//                 className="px-4 py-2 rounded-md border"
//                 onClick={() => setOpenEdit(false)}
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSaveEdit}
//                 className="px-4 py-2 rounded-md bg-green-600 text-white"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default BlogsAdminPage;



import React, { useEffect, useState, useMemo } from "react";
import { blogService } from "../../services/blogService";

const Modal = ({ children, open, setOpen, title }: any) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 animate-fadeIn">
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

const BlogsAdminPage = () => {
  const [categories, setCategories] = useState<any[]>([]);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // modals
  const [openNew, setOpenNew] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // forms
  const [newForm, setNewForm] = useState({ name: "", slug: "" });
  const [editForm, setEditForm] = useState({ id: null, name: "", slug: "" });
  const [viewItem, setViewItem] = useState<any>(null);

  // Search
  const [q, setQ] = useState("");

  // Load categories
  const loadData = async () => {
    try {
      const res = await blogService.getCategories();
      setCategories(res?.data || res);
    } catch (e) {
      console.error("Failed to load categories", e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // reset page on search
  useEffect(() => {
    setPage(1);
  }, [q]);

  // Filter Search
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return categories;
    return categories.filter(
      (c: any) =>
        c.name.toLowerCase().includes(term) ||
        c.slug.toLowerCase().includes(term)
    );
  }, [q, categories]);

  // Pagination slice
  const paginated = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  // Create Category
  const handleSaveNew = async () => {
    if (!newForm.name.trim()) return alert("Name is required");

    try {
      await blogService.createCategory({
        name: newForm.name,
        slug:
          newForm.slug ||
          newForm.name.toLowerCase().replace(/\s+/g, "-"),
      });

      setOpenNew(false);
      setNewForm({ name: "", slug: "" });
      loadData();
    } catch {
      alert("Failed to create");
    }
  };

  // View
  const handleOpenView = (item: any) => {
    setViewItem(item);
    setOpenView(true);
  };

  // Edit
  const handleOpenEdit = (item: any) => {
    setEditForm(item);
    setOpenEdit(true);
  };

  const handleSaveEdit = async () => {
    if (!editForm.name.trim()) return alert("Name required");

    try {
      await blogService.updateCategory(editForm.id, {
        name: editForm.name,
        slug:
          editForm.slug ||
          editForm.name.toLowerCase().replace(/\s+/g, "-"),
      });

      setOpenEdit(false);
      loadData();
    } catch {
      alert("Failed to update");
    }
  };

  // Toggle Status
  const handleStatusToggle = async (item) => {
    const newStatus = item.status === 1 ? 0 : 1;

    try {
      await blogService.updateCategoryStatus(item.id, newStatus);
      loadData();
    } catch {
      alert("Failed to update status");
    }
  };

  const totalPages = Math.ceil(filtered.length / limit);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Blog Categories</h1>
            <p className="text-gray-500 mt-1">Manage categories for blog posts.</p>
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
              + New Category
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow border">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">S.N</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Slug</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              ) : (
                paginated.map((c: any, index: number) => {
                  const sn = (page - 1) * limit + index + 1;

                  return (
                    <tr key={c.id} className="border-t hover:bg-gray-50">

                      <td className="px-6 py-4">{sn}</td>

                      <td className="px-6 py-4 font-medium">{c.name}</td>
                      <td className="px-6 py-4 text-gray-600">{c.slug}</td>

                      <td className="px-6 py-4">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={c.status === 1}
                            onChange={() => handleStatusToggle(c)}
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full relative transition">
                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                          </div>
                          <span className="ml-3 text-sm font-medium">
                            {c.status === 1 ? "Active" : "Inactive"}
                          </span>
                        </label>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleOpenView(c)}
                            className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-50"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleOpenEdit(c)}
                            className="px-3 py-1 rounded-md border text-sm text-green-700 hover:bg-green-50"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* ✅ PAGINATION */}
          {filtered.length > limit && (
            <div className="flex items-center justify-between p-4 border-t bg-gray-50">
              
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded-md border ${
                  page === 1 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                ← Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded-md border ${
                  page >= totalPages ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                Next →
              </button>

            </div>
          )}
        </div>

        {/* ✅ MODALS */}

        {/* NEW */}
        <Modal open={openNew} setOpen={setOpenNew} title="Add New Category">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                value={newForm.name}
                onChange={(e) =>
                  setNewForm({ ...newForm, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Slug (optional)</label>
              <input
                value={newForm.slug}
                onChange={(e) =>
                  setNewForm({ ...newForm, slug: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                className="px-4 py-2 rounded-md border"
                onClick={() => setOpenNew(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNew}
                className="px-4 py-2 rounded-md bg-green-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>

        {/* VIEW */}
        <Modal open={openView} setOpen={setOpenView} title="View Category">
          {viewItem && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <div className="mt-1 text-lg font-medium">{viewItem.name}</div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Slug</label>
                <div className="mt-1 text-gray-600">{viewItem.slug}</div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Status</label>
                <div className="mt-1">
                  {viewItem.status === 1 ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* EDIT */}
        <Modal open={openEdit} setOpen={setOpenEdit} title="Edit Category">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                value={editForm.slug}
                onChange={(e) =>
                  setEditForm({ ...editForm, slug: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                className="px-4 py-2 rounded-md border"
                onClick={() => setOpenEdit(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-md bg-green-600 text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>

      </div>
    </div>
  );
};

export default BlogsAdminPage;
