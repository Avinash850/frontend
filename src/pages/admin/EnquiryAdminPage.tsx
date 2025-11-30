// import React, { useEffect, useMemo, useState } from "react";
// import { enquiryService } from "../../services/enquiryService";

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

// const EnquiryAdminPage = () => {
//   const [enquiries, setEnquiries] = useState<any[]>([]);
//   const [search, setSearch] = useState("");
//   const [openView, setOpenView] = useState(false);
//   const [viewItem, setViewItem] = useState<any | null>(null);

//   const [page, setPage] = useState(1);
//   const limit = 10;

//   useEffect(() => {
//     loadData();
//   }, []);

//   const formatDate = (isoDate: string) => {
//     const d = new Date(isoDate);
//     return d.toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });
//     };


//   const loadData = async () => {
//     try {
//       const res = await enquiryService.getEnquiries();
//       const data = Array.isArray(res.data)
//         ? res.data
//         : Array.isArray(res.data?.data)
//         ? res.data.data
//         : [];
//       setEnquiries(data);
//     } catch (e) {
//       console.log("Failed to load enquiries:", e);
//     }
//   };

//   useEffect(() => {
//     setPage(1);
//   }, [search]);

//   // ✅ Search Filter (same logic as Blog Category)
//   const filtered = useMemo(() => {
//     const term = search.trim().toLowerCase();
//     if (!term) return enquiries;
//     return enquiries.filter(
//       (e: any) =>
//         e.name.toLowerCase().includes(term) ||
//         e.email.toLowerCase().includes(term) ||
//         e.phone.toLowerCase().includes(term)
//     );
//   }, [search, enquiries]);

//   // ✅ Pagination (same)
//   const paginated = useMemo(() => {
//     const start = (page - 1) * limit;
//     return filtered.slice(start, start + limit);
//   }, [filtered, page]);

//   const totalPages = Math.ceil(filtered.length / limit);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">

//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold">Enquiries</h1>
//             <p className="text-gray-500 mt-1">All customer submitted enquiries.</p>
//           </div>

//           <div className="relative">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-56 px-4 py-2 border rounded-md bg-white shadow-sm"
//               placeholder="Search name, email, phone..."
//             />
//             {search && (
//               <button
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
//                 onClick={() => setSearch("")}
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-lg shadow border">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">S.N</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Service</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
//                 <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {paginated.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
//                     No enquiries found.
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((item: any, index: number) => {
//                   const sn = (page - 1) * limit + index + 1;

//                   return (
//                     <tr key={item.id} className="border-t hover:bg-gray-50">

//                       <td className="px-6 py-4">{sn}</td>

//                       <td className="px-6 py-4 font-medium">{item.name}</td>
//                       <td className="px-6 py-4">{item.email}</td>
//                       <td className="px-6 py-4">{item.phone}</td>
//                       <td className="px-6 py-4">{item.service}</td>
//                       <td className="px-6 py-4 text-gray-600">{formatDate(item.created_at)}</td>

//                       <td className="px-6 py-4 text-right">
//                         <button
//                           onClick={() => {
//                             setViewItem(item);
//                             setOpenView(true);
//                           }}
//                           className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-50"
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>

//           {/* PAGINATION */}
//           {filtered.length > limit && (
//             <div className="flex items-center justify-between p-4 border-t bg-gray-50">

//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//                 className={`px-4 py-2 rounded-md border ${
//                   page === 1 ? "opacity-40 cursor-not-allowed" : ""
//                 }`}
//               >
//                 ← Previous
//               </button>

//               <span className="text-sm text-gray-600">
//                 Page {page} of {totalPages}
//               </span>

//               <button
//                 disabled={page >= totalPages}
//                 onClick={() => setPage(page + 1)}
//                 className={`px-4 py-2 rounded-md border ${
//                   page >= totalPages ? "opacity-40 cursor-not-allowed" : ""
//                 }`}
//               >
//                 Next →
//               </button>
//             </div>
//           )}
//         </div>

//         {/* VIEW MODAL */}
//         <Modal open={openView} setOpen={setOpenView} title="Enquiry Details">
//           {viewItem && (
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm text-gray-500">Name</label>
//                 <div className="mt-1 text-lg font-medium">{viewItem.name}</div>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Email</label>
//                 <div className="mt-1">{viewItem.email}</div>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Phone</label>
//                 <div className="mt-1">{viewItem.phone}</div>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Service</label>
//                 <div className="mt-1">{viewItem.service}</div>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Message</label>
//                 <div className="mt-1 text-gray-700">
//                   {viewItem.message || "No message"}
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Created At</label>
//                 <div className="mt-1 text-gray-600">{viewItem.created_at}</div>
//               </div>
//             </div>
//           )}
//         </Modal>

//       </div>
//     </div>
//   );
// };

// export default EnquiryAdminPage;


import React, { useEffect, useMemo, useState } from "react";
import { enquiryService } from "../../services/enquiryService";

const Modal = ({ children, open, setOpen, title }: any) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
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

const formatDate = (iso?: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); // e.g. 11 Nov 2025
};

const EnquiryAdminPage = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [openView, setOpenView] = useState(false);
  const [viewItem, setViewItem] = useState<any | null>(null);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await enquiryService.getEnquiries();
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];
      setEnquiries(data);
    } catch (e) {
      console.log("Failed to load enquiries:", e);
      setEnquiries([]);
    }
  };

  // reset page when search term changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // same filter logic as Blog Category
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return enquiries;
    return enquiries.filter(
      (e: any) =>
        (e.name || "").toLowerCase().includes(term) ||
        (e.email || "").toLowerCase().includes(term) ||
        (e.phone || "").toLowerCase().includes(term) ||
        (e.service || "").toLowerCase().includes(term)
    );
  }, [search, enquiries]);

  // pagination slice
  const paginated = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

  // open view modal with fresh item (so it always shows current data)
  const handleOpenView = (item: any) => {
    const fresh = enquiries.find((x) => x.id === item.id) || item;
    setViewItem(fresh);
    setOpenView(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Enquiries</h1>
            <p className="text-gray-500 mt-1">All customer submitted enquiries.</p>
          </div>

          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 px-4 py-2 border rounded-md bg-white shadow-sm"
              placeholder="Search name, email, phone..."
            />
            {search && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow border">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">S.N</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Service</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                paginated.map((item: any, index: number) => {
                  const sn = (page - 1) * limit + index + 1;
                  return (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{sn}</td>
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.phone}</td>
                      <td className="px-6 py-4">{item.service}</td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(item.created_at)}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleOpenView(item)}
                          className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-50"
                        >
                          View
                        </button>
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
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`px-4 py-2 rounded-md border ${page === 1 ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                ← Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`px-4 py-2 rounded-md border ${page >= totalPages ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* VIEW MODAL */}
        <Modal open={openView} setOpen={setOpenView} title="Enquiry Details">
          {viewItem && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <div className="mt-1 text-lg font-medium">{viewItem.name}</div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Email</label>
                <div className="mt-1">{viewItem.email}</div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <div className="mt-1">{viewItem.phone}</div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Service</label>
                <div className="mt-1">{viewItem.service}</div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Message</label>
                <div className="mt-1 text-gray-700">{viewItem.message || "No message"}</div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Created At</label>
                <div className="mt-1 text-gray-600">{formatDate(viewItem.created_at)}</div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default EnquiryAdminPage;
