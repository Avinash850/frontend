import React, { useEffect, useState } from "react";
import ClinicForm from "../../components/ClinicForm";
import { clinicService } from "../../services/clinicService";

const ClinicAdminPage = () => {
  const [clinics, setClinics] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const load = async () => {
    const res = await clinicService.getClinics();
    setClinics(res || []);
  };

  useEffect(() => { load(); }, []);

  const edit = async (c: any) => {
    const data = await clinicService.getClinicById(c.id);
    setEditItem(data);
    setOpen(true);
  };

  return (
    <div className="p-6">
      <button onClick={() => { setEditItem(null); setOpen(true); }} className="btn-primary">
        + New Clinic
      </button>

      {clinics.map(c => (
        <div key={c.id} className="flex justify-between border p-2">
          <span>{c.name}</span>
          <button onClick={() => edit(c)}>Edit</button>
        </div>
      ))}

      {open && (
        <ClinicForm
          mode={editItem ? "edit" : "add"}
          initialData={editItem}
          onClose={() => setOpen(false)}
          onSaved={load}
        />
      )}
    </div>
  );
};

export default ClinicAdminPage;
