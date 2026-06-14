import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listMyAreas,
  createArea,
  updateArea,
  deleteArea,
  getGovernorates,
  EGYPT_GOVERNORATES,
  getDriverProfile,
} from "../services/driverApi";
import styles from "../styles/DriverPlaces.module.css";

export default function DriverPlaces() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  const [governorates, setGovernorates] = useState(EGYPT_GOVERNORATES);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [areasRes, profileRes] = await Promise.all([listMyAreas(), getDriverProfile()]);

      if (areasRes.success) setAreas(areasRes.data);
      else setError(areasRes.message || "Failed to load service areas");

      if (profileRes.success) setProfile(profileRes.data);
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
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Manage Service Areas</h2>
          <p className={styles.subtitle}>
            Choose the Egyptian governorates where you are available to drive users.
          </p>
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {profile && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Saved Vehicle & Profile Data</h3>
              <p className={styles.cardText}>
                These are the details saved from Vehicle & Profile Setup.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/driver-form")}
              className={styles.editBtn}
            >
              Edit Vehicle Data
            </button>
          </div>

          <div className={styles.infoGrid}>
            <Info label="Vehicle type" value={profile.vehicleType} />
            <Info label="License plate" value={profile.licensePlate} />
            <Info label="Vehicle model" value={profile.vehicleModel} />
            <Info label="Vehicle year" value={profile.vehicleYear} />
            <Info label="Accessibility" value={profile.accessibilityFeatures} />
            <Info
              label="Available"
              value={
                profile.availabilityFrom && profile.availabilityTo
                  ? `${profile.availabilityFrom} - ${profile.availabilityTo}`
                  : "Not saved"
              }
            />
            <Info label="License number" value={profile.licenseNumber} />
            <Info label="Profile completed" value={profile.profileCompleted ? "Yes" : "No"} />
          </div>
        </div>
      )}

      <form onSubmit={handleAdd} className={styles.formCard}>
        <div className={styles.field}>
          <label className={styles.label}>Governorate</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className={styles.select}
          >
            <option value="">Select a governorate</option>
            {available.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={saving || !selected} className={styles.addBtn}>
          {saving ? "Saving..." : "+ Add"}
        </button>
      </form>

      {loading ? (
        <p className={styles.loadingText}>Loading…</p>
      ) : areas.length === 0 ? (
        <div className={styles.emptyState}>
          <h4>No service areas yet</h4>
          <p>Select a governorate from the dropdown and click Add.</p>
        </div>
      ) : (
        <div className={styles.areasGrid}>
          {areas.map((a) => (
            <div key={a._id} className={styles.areaCard}>
              <div className={styles.areaTop}>
                <h4 className={styles.areaTitle}>{a.governorate}</h4>
                <span
                  className={`${styles.badge} ${
                    a.active ? styles.activeBadge : styles.offBadge
                  }`}
                >
                  {a.active ? "Active" : "Off"}
                </span>
              </div>
              <div className={styles.actions}>
                <button onClick={() => toggleActive(a)} className={styles.toggleBtn}>
                  {a.active ? "Turn off" : "Turn on"}
                </button>
                <button onClick={() => handleDelete(a._id)} className={styles.deleteBtn}>
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

function Info({ label, value }) {
  return (
    <div className={styles.infoBox}>
      <div className={styles.infoLabel}>{label}</div>
      <div className={styles.infoValue}>{value || "Not saved"}</div>
    </div>
  );
}
