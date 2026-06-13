import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listMyAreas,
  createArea,
  updateArea,
  deleteArea,
  getGovernorates,
  EGYPT_GOVERNORATES,
} from "../services/driverApi";

export default function DriverPlaces() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  const [governorates, setGovernorates] = useState(EGYPT_GOVERNORATES);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await listMyAreas();
      if (res.success) setAreas(res.data);
      else setError(res.message || "Failed to load");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => setGovernorates(await getGovernorates()))();
    load();
  }, []);

  const selectedAreaNames = useMemo(() => new Set(areas.map((a) => a.governorate)), [areas]);

  const available = useMemo(() => {
    return governorates.filter((g) => !selectedAreaNames.has(g));
  }, [governorates, selectedAreaNames]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    if (!selected) {
      setError("Please select a governorate first");
      return;
    }
    setSaving(true);
    const res = await createArea(selected);
    setSaving(false);
    if (res.success) {
      setSelected("");
      await load();
    } else {
      setError(res.message || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this governorate from your service areas?")) return;
    const res = await deleteArea(id);
    if (res.success) await load();
    else alert(res.message);
  };

  const toggleActive = async (a) => {
    const res = await updateArea(a._id, { active: !a.active });
    if (res.success) await load();
    else alert(res.message);
  };

  return (
    <div style={{ maxWidth: 900, margin: "30px auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0 }}>Manage Service Areas</h2>
          <p style={{ color: "#64748b", margin: "6px 0 0" }}>
            Choose the Egyptian governorates where you are available to drive users.
          </p>
        </div>
        
      </div>

      {error && (
        <div style={{ background: "#fee2e2", color: "#991b1b", padding: 10, borderRadius: 6, marginBottom: 16 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleAdd} style={{ background: "#fff", padding: 18, borderRadius: 12, border: "1px solid #e2e8f0", marginBottom: 20, display: "flex", gap: 10, alignItems: "end", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label style={lbl}>Governorate</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            style={inp}
          >
            <option value="">Select a governorate</option>
            {available.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={saving || !selected}
          style={{
            padding: "10px 20px",
            background: saving || !selected ? "#94a3b8" : "#2563eb",
            color: "#fff", border: 0, borderRadius: 8,
            cursor: saving || !selected ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Saving..." : "+ Add"}
        </button>
      </form>

      {loading ? (
        <p>Loading…</p>
      ) : areas.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, background: "#f8fafc", borderRadius: 12, border: "2px dashed #cbd5e1" }}>
          <h4>No service areas yet</h4>
          <p style={{ color: "#64748b" }}>Select a governorate from the dropdown and click Add.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {areas.map((a) => (
            <div key={a._id} style={{ background: "#fff", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ margin: 0 }}> {a.governorate}</h4>
                <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 12, background: a.active ? "#dcfce7" : "#fee2e2", color: a.active ? "#166534" : "#991b1b" }}>
                  {a.active ? "Active" : "Off"}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button onClick={() => toggleActive(a)} style={{ flex: 1, padding: "7px", background: "#f1f5f9", border: 0, borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
                  {a.active ? "Turn off" : "Turn on"}
                </button>
                <button onClick={() => handleDelete(a._id)} style={{ flex: 1, padding: "7px", background: "#fee2e2", color: "#991b1b", border: 0, borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
                   Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const lbl = { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#334155" };
const inp = { width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 14, background: "#fff" };
