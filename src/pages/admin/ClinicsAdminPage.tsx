import React, { useEffect, useMemo, useState } from "react";
import ClinicForm from "../../components/ClinicForm";
import { clinicService } from "../../services/clinicService";
import ClinicEditWrapper from "../../components/ClinicEditWrapper";


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

const ClinicAdminPage: React.FC = () => {
  const [clinics, setClinics] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editItem, setEditItem] = useState<any>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const [q, setQ] = useState("");

  /* ===== DATE FILTER (ADDED) ===== */
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const loadData = async () => {
    try {
      const res = await clinicService.getClinics({
        from_date: fromDate || undefined,
        to_date: toDate || undefined,
      });
      setClinics(Array.isArray(res) ? res : []);
    } catch (e) {
      console.error("Failed to load clinics", e);
      setClinics([]);
    }
  };

  useEffect(() => {
    loadData();
  }, [fromDate, toDate]);

  useEffect(() => {
    setPage(1);
  }, [q]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return clinics;
    return clinics.filter((c) =>
      [c.name, c.slug].join(" ").toLowerCase().includes(term)
    );
  }, [q, clinics]);

  const paginated = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleOpenEdit = async (item: any) => {
    try {
      setEditItem(null);
      setLoadingEdit(true);

      const data = await clinicService.getClinicById(item.id);

      setEditItem(data);

      setTimeout(() => {
        setOpenEdit(true);
        setLoadingEdit(false);
      }, 50);
    } catch (err) {
      console.error(err);
      alert("Failed to load clinic details");
      setLoadingEdit(false);
    }
  };

  const handleDelete = async (item: any) => {
    const ok = window.confirm("Delete this clinic? This action cannot be undone.");
    if (!ok) return;

    try {
      await clinicService.deleteClinic(item.id);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete clinic");
    }
  };

  const handleSaved = () => {
    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Clinics</h1>
            <p className="text-gray-500 mt-1">Manage clinics.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* DATE FILTER (ADDED) */}
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />

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

            <button
              onClick={handleOpenNew}
              className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
            >
              + New Clinic
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow border">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">SL</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Image</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Slug</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No clinics found.
                  </td>
                </tr>
              ) : (
                paginated.map((c, index) => {
                  const sn = (page - 1) * limit + index + 1;
                  return (
                    <tr key={c.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{sn}</td>

                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                          {c.image_url ? (
                            <img
                              src={c.image_url}
                              alt={c.name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="text-xs text-gray-400 p-3">
                              No image
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-medium">{c.name}</td>
                      <td className="px-6 py-4">{c.slug}</td>

                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(c)}
                            className="px-3 py-1 rounded-md border text-sm text-green-700 hover:bg-green-50"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(c)}
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
                className={`px-4 py-2 rounded-md border ${
                  page === 1 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                ← Previous
              </button>

              <span className="text-sm">
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

        {/* NEW CLINIC */}
        <Modal open={openNew} setOpen={setOpenNew} title="Add Clinic">
          <ClinicForm
            mode="add"
            onClose={() => setOpenNew(false)}
            onSaved={() => {
              setOpenNew(false);
              handleSaved();
            }}
          />
        </Modal>

        {/* EDIT CLINIC */}
        <Modal open={openEdit} setOpen={setOpenEdit} title="Edit Clinic">
          {!editItem || loadingEdit ? (
            <div className="p-6 text-center text-gray-600">Loading...</div>
          ) : (
            // <ClinicForm
            //   mode="edit"
            //   initialData={editItem}
            //   onClose={() => setOpenEdit(false)}
            //   onSaved={() => {
            //     setOpenEdit(false);
            //     handleSaved();
            //   }}
            // />
            <ClinicEditWrapper
              clinic={editItem}
              onClose={() => setOpenEdit(false)}
              onSaved={handleSaved}
            />

          )}
        </Modal>
      </div>
    </div>
  );
};

export default ClinicAdminPage;
