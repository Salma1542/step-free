import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/DriverPlaces.module.css";
import {
  listMyAreas,
  createArea,
  updateArea,
  deleteArea,
  getCairoCities,
  CAIRO_CITIES,
} from "../services/driverApi";

export default function DriverPlaces() {
  const navigate = useNavigate();

  const [areas, setAreas] = useState([]);
  const [cities, setCities] = useState(CAIRO_CITIES);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await listMyAreas();

      if (res.success) {
        setAreas(res.data || []);
      } else {
        setError(res.message || "Failed to load service areas");
      }
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const cairoCities = await getCairoCities();
      setCities(cairoCities);
    })();

    load();
  }, []);

  const selectedAreaNames = useMemo(() => {
    return new Set(areas.map((area) => area.governorate));
  }, [areas]);

  const available = useMemo(() => {
    return cities.filter((city) => !selectedAreaNames.has(city));
  }, [cities, selectedAreaNames]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    if (!selected) {
      setError("Please select an area first");
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
    const confirmDelete = window.confirm(
      "Remove this area from your service areas?"
    );

    if (!confirmDelete) return;

    const res = await deleteArea(id);

    if (res.success) {
      await load();
    } else {
      alert(res.message || "Delete failed");
    }
  };

  const toggleActive = async (area) => {
    const res = await updateArea(area._id, { active: !area.active });

    if (res.success) {
      await load();
    } else {
      alert(res.message || "Update failed");
    }
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.badge}>Step Free Driver</span>
          <h1 className={styles.title}>Manage Service Areas</h1>
          <p className={styles.subtitle}>
            Select the Cairo areas where you are available to receive accessible
            ride requests.
          </p>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className={styles.alertContainer}>
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠</span>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* ADD AREA FORM */}
      <form onSubmit={handleAdd} className={styles.formContainer}>
        <div className={styles.formContent}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Where are you available?</label>

            <div className={styles.selectWrapper}>
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className={styles.select}
              >
                <option value="">Select a Cairo area</option>

                {available.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <p className={styles.helperText}>
              Choose the places you can cover regularly. You can turn any area
              on or off later.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving || !selected}
            className={styles.addBtn}
          >
            {saving ? "Saving..." : "+ Add Area"}
          </button>
        </div>
      </form>

      {/* CONTENT AREA */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loading}>Loading service areas...</p>
        </div>
      ) : areas.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📍</div>
          <h3>No service areas yet</h3>
          <p>
            Select the places where you are available to drive, then click "Add
            Area" above.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {areas.map((area) => (
            <div key={area._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <h4 className={styles.city}>{area.governorate}</h4>
                  <p className={styles.cardText}>Service area available</p>
                </div>

                <span
                  className={
                    area.active ? styles.activeBadge : styles.inactiveBadge
                  }
                >
                  {area.active ? "Active" : "Off"}
                </span>
              </div>

              <div className={styles.cardActions}>
                <button
                  type="button"
                  onClick={() => toggleActive(area)}
                  className={
                    area.active ? styles.toggleOffBtn : styles.toggleOnBtn
                  }
                >
                  {area.active ? "Turn Off" : "Turn On"}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(area._id)}
                  className={styles.deleteBtn}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER - PROFILE BUTTON */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.profileBtn}
          onClick={() => navigate("/driver/profile-view")}
        >
           View My Profile
        </button>
      </div>
    </div>
  );
}