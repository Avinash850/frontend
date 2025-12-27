import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { doctorService } from "../../services/doctorsService";
import DoctorForm from "../../components/DoctorForm";

const Modal = ({ children, open, setOpen, title }: any) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto animate-fadeIn">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const DoctorsAdminPage: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // modals
  const [openNew, setOpenNew] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // edit/view item
  const [editItem, setEditItem] = useState<any>(null);
  const [viewItem, setViewItem] = useState<any>(null);

  // search + date filter
  const [q, setQ] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const loadData = async () => {
    try {
      const res = await doctorService.getDoctors({
        from_date: fromDate || undefined,
        to_date: toDate || undefined,
      });
      const list = Array.isArray(res?.data) ? res.data : res || [];
      setDoctors(list);
    } catch (e) {
      console.error("Failed to load doctors", e);
      setDoctors([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // reload on date change
  useEffect(() => {
    setPage(1);
    loadData();
  }, [fromDate, toDate]);

  // reset page on search
  useEffect(() => {
    setPage(1);
  }, [q]);

  // Filter search
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return doctors;
    return doctors.filter((d: any) =>
      [d.name, d.slug].join(" ").toLowerCase().includes(term)
    );
  }, [q, doctors]);

  // Paginated
  const paginated = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

  const handleOpenNew = () => setOpenNew(true);

  const handleOpenEdit = (item: any) => {
    setEditItem(item);
    setOpenEdit(true);
  };

  // VIEW IS INTENTIONALLY COMMENTED (AS REQUESTED)
  /*
  const handleOpenView = async (item: any) => {
    try {
      const res = await doctorService.getDoctorById(item.id);
      setViewItem(res.data);
      setOpenView(true);
    } catch (e) {
      alert("Failed to load doctor details");
    }
  };
  */

  const handleDelete = async (item: any) => {
    const ok = window.confirm("Delete this doctor? This action cannot be undone.");
    if (!ok) return;
    try {
      await doctorService.deleteDoctor(item.id);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  // After saved (new or edit)
  const handleSaved = () => {
    loadData();
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
            <h1 className="text-3xl font-bold">Doctors</h1>
            <p className="text-gray-500 mt-1">Manage doctors list.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* DATE FILTER */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              />
              <span className="text-gray-400 text-sm">to</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              />
              {(fromDate || toDate) && (
                <button
                  onClick={() => {
                    setFromDate("");
                    setToDate("");
                  }}
                  className="text-sm text-gray-500"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-56 px-4 py-2 border rounded-md bg-white shadow-sm"
                placeholder="Search name or slug..."
              />
              {q && (
                <button className="absolute right-1 top-1/2 -translate-y-1/2 px-2 text-sm text-gray-500" onClick={() => setQ("")}>
                  Clear
                </button>
              )}
            </div>

            {/* New */}
            <button onClick={handleOpenNew} className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700">
              + New Doctor
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow border">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">SL</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Image</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Slug</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No doctors found.
                  </td>
                </tr>
              ) : (
                paginated.map((d: any, index: number) => {
                  const sn = (page - 1) * limit + index + 1;
                  return (
                    <tr key={d.id ?? index} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{sn}</td>

                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                          {d.image_url ? (
                            <img src={d.image_url} alt={d.name} className="object-cover w-full h-full" />
                          ) : (
                            <div className="text-xs text-gray-400">No image</div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-medium">{d.name}</td>
                      <td className="px-6 py-4 text-gray-600">{d.slug}</td>

                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          {/* <button onClick={() => handleOpenView(d)} className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-50">
                            View
                          </button> */}
                          <button onClick={() => handleOpenEdit(d)} className="px-3 py-1 rounded-md border text-sm text-green-700 hover:bg-green-50">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(d)} className="px-3 py-1 rounded-md border text-sm text-red-600 hover:bg-red-50">
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
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className={`px-4 py-2 rounded-md border ${page === 1 ? "opacity-40 cursor-not-allowed" : ""}`}>
                ← Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className={`px-4 py-2 rounded-md border ${page >= totalPages ? "opacity-40 cursor-not-allowed" : ""}`}>
                Next →
              </button>
            </div>
          )}
        </div>

        {/* NEW MODAL */}
        <Modal open={openNew} setOpen={setOpenNew} title="Add New Doctor">
          <DoctorForm
            mode="add"
            onClose={() => setOpenNew(false)}
            onSaved={() => {
              setOpenNew(false);
              handleSaved();
            }}
          />
        </Modal>

        {/* EDIT MODAL */}
        <Modal open={openEdit} setOpen={setOpenEdit} title="Edit Doctor">
          <DoctorForm
            mode="edit"
            initialData={editItem}
            onClose={() => setOpenEdit(false)}
            onSaved={() => {
              setOpenEdit(false);
              handleSaved();
            }}
          />
        </Modal>

        {/* VIEW MODAL */}
        <Modal open={openView} setOpen={setOpenView} title="View Doctor">
          <div className="max-h-[80vh] overflow-y-auto px-1">
            {viewItem ? (
              <div className="space-y-4 pb-4">
                <div className="flex gap-6">
                  <div className="w-32 h-32 bg-gray-100 rounded overflow-hidden">
                    {viewItem.image_url ? <img src={viewItem.image_url} alt={viewItem.name} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-gray-400">No image</div>}
                  </div>

                  <div>
                    <div className="text-lg font-semibold">{viewItem.name}</div>
                    <div className="text-sm text-gray-600">{viewItem.designation}</div>
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
                  <div className="mt-2 prose max-w-none" dangerouslySetInnerHTML={{ __html: viewItem.description || "" }} />
                </div>

                <div>
                  <label className="text-sm text-gray-500">SEO Title</label>
                  <div className="mt-1 text-sm text-gray-800">{viewItem.seo_title}</div>
                </div>
              </div>
            ) : null}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DoctorsAdminPage;
