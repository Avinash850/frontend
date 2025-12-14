import React, { useEffect, useState, useMemo } from "react";
import { userService } from "../../services/userService";

const Modal = ({ children, open, setOpen, title }: any) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const UsersAdminPage = () => {
  const [users, setUsers] = useState<any[]>([]);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // modals
  const [openNew, setOpenNew] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // forms
  const [newForm, setNewForm] = useState({ name: "", email: "" });
  const [editForm, setEditForm] = useState({ id: null, name: "" });
  const [viewItem, setViewItem] = useState<any>(null);

  // search
  const [q, setQ] = useState("");

//   const loadData = async () => {
//     try {
//       const res = await userService.getUsers();
//       setUsers(res?.data || res);
//     } catch {
//       alert("Failed to load users");
//     }
//   };

const loadData = async () => {
  try {
    const res = await userService.getUsers();
    setUsers(res.data.data);
  } catch {
    alert("Failed to load users");
  }
};


  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [q]);

  // filter
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return users;

    return users.filter(
      (u: any) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }, [q, users]);

  // pagination slice
  const paginated = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / limit);

  // create user
  const handleSaveNew = async () => {
    if (!newForm.name.trim() || !newForm.email.trim())
      return alert("Name & Email required");

    try {
      await userService.createUser(newForm);
      setOpenNew(false);
      setNewForm({ name: "", email: "" });
      loadData();
    } catch {
      alert("Failed to create user");
    }
  };

  // view
  const handleOpenView = (user: any) => {
    setViewItem(user);
    setOpenView(true);
  };

  // edit
  const handleOpenEdit = (user: any) => {
    setEditForm({ id: user.id, name: user.name });
    setOpenEdit(true);
  };

  const handleSaveEdit = async () => {
    if (!editForm.name.trim()) return alert("Name required");

    try {
      await userService.updateUser(editForm.id, {
        name: editForm.name,
      });
      setOpenEdit(false);
      loadData();
    } catch {
      alert("Failed to update user");
    }
  };

  // status toggle
  const handleStatusToggle = async (user: any) => {
    const newStatus = user.status === 1 ? 0 : 1;

    try {
      await userService.updateUserStatus(user.id, newStatus);
      loadData();
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-gray-500 mt-1">Manage system users</p>
          </div>

          <div className="flex gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name or email..."
              className="px-4 py-2 border rounded-md"
            />

            <button
              onClick={() => setOpenNew(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              + Add User
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow border">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">S.N</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Created At</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                paginated.map((u, index) => {
                  const sn = (page - 1) * limit + index + 1;

                  return (
                    <tr key={u.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{sn}</td>
                      <td className="px-6 py-4 font-medium">{u.name}</td>
                      <td className="px-6 py-4 text-gray-600">{u.email}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>

                      {/* <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={u.status === 1}
                          onChange={() => handleStatusToggle(u)}
                        />
                      </td> */}

                      <td className="px-6 py-4">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={u.status === 1}
                                onChange={() => handleStatusToggle(u)}
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full relative transition">
                                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                                </div>
                                <span className="ml-3 text-sm font-medium">
                                {u.status === 1 ? "Active" : "Inactive"}
                                </span>
                            </label>
                            </td>


                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleOpenView(u)}
                          className="px-3 py-1 border rounded mr-2"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="px-3 py-1 border rounded text-green-700"
                        >
                          Edit
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
            <div className="flex justify-between p-4 border-t bg-gray-50">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                ← Previous
              </button>

              <span className="text-sm">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* ADD USER */}
        <Modal open={openNew} setOpen={setOpenNew} title="Add User">
          <div className="space-y-4">
            <input
              placeholder="Name"
              value={newForm.name}
              onChange={(e) =>
                setNewForm({ ...newForm, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />

            <input
              placeholder="Email"
              value={newForm.email}
              onChange={(e) =>
                setNewForm({ ...newForm, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setOpenNew(false)}>Cancel</button>
              <button
                onClick={handleSaveNew}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>

        {/* VIEW USER */}
        <Modal open={openView} setOpen={setOpenView} title="View User">
          {viewItem && (
            <div className="space-y-2">
              <div><b>Name:</b> {viewItem.name}</div>
              <div><b>Email:</b> {viewItem.email}</div>
              <div><b>Status:</b> {viewItem.status === 1 ? "Active" : "Inactive"}</div>
              <div><b>Created:</b> {viewItem.created_at}</div>
            </div>
          )}
        </Modal>

        {/* EDIT USER */}
        <Modal open={openEdit} setOpen={setOpenEdit} title="Edit User">
          <div className="space-y-4">
            <input
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setOpenEdit(false)}>Cancel</button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded"
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

export default UsersAdminPage;
