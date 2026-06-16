import { useEffect, useMemo, useState } from "react";
import axios from "../../config/axiosInstance";
import styles from "./AdminplacesPage.module.css";

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
];

export default function AdminPlacesPage() {
  const [places, setPlaces]               = useState([]);
  const [query, setQuery]                 = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeImage, setActiveImage]     = useState(null);
  const [statusFilter, setStatusFilter]   = useState("all");
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const res  = await axios.get("/admin/places");
      const raw  = res?.data;
      const list = Array.isArray(raw) ? raw
                 : Array.isArray(raw?.data) ? raw.data
                 : [];
      setPlaces(list);
    } catch (err) {
      console.error(err);
      setPlaces([]);
    }
  };

  const filtered = useMemo(() => {
    if (!Array.isArray(places)) return [];
    const q = query.trim().toLowerCase();
    return places.filter(p => {
      const matchesQuery =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.area?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ||
        (p.status || "pending") === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [places, query, statusFilter]);

  const openPlace = (place) => {
    setSelectedPlace(place);
    setActiveImage(null);
  };

  const closePlace = () => {
    setSelectedPlace(null);
    setActiveImage(null);
  };

  const handleAccept = async (id) => {
    try {
      await axios.patch(`/admin/places/${id}/accept`);
      await fetchPlaces();
      closePlace();
    } catch (err) {
      console.error(err);
    }
  };

  // Soft reject: just changes status to "rejected", place stays in the list
  const handleReject = async (id) => {
    try {
      await axios.patch(`/admin/places/${id}/reject`);
      await fetchPlaces();
      closePlace();
    } catch (err) {
      console.error(err);
    }
  };

  // Permanent delete: removes the place from the database entirely
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/places/${id}`);
      await fetchPlaces();
      closePlace();
    } catch (err) {
      console.error(err);
    }
  };

  const requestConfirm = (type, place) => {
    setConfirmAction({ type, place });
  };

  const runConfirmedAction = async () => {
    if (!confirmAction) return;
    const { type, place } = confirmAction;

    if (type === "reject") await handleReject(place._id);
    if (type === "delete") await handleDelete(place._id);

    setConfirmAction(null);
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Places management</h1>
          <p className={styles.subtitle}>Review and approve places submitted by users.</p>
        </div>
      </header>

      <div className={styles.tabs}>
        {STATUS_TABS.map(tab => (
          <button
            key={tab.key}
            className={`${styles.tabBtn} ${statusFilter === tab.key ? styles.tabActive : ""}`}
            onClick={() => setStatusFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <i className="ti ti-search" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by name or area…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <span className={styles.countBadge}>{filtered.length} places</span>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <i className="ti ti-map-pin-off" />
          <p>No places found.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(p => (
            <article key={p._id} className={styles.card} onClick={() => openPlace(p)}>
              <img
                className={styles.cardImg}
                src={p.image || "https://via.placeholder.com/400x200"}
                alt={p.name}
              />
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={`${styles.statusPill} ${
                    p.status === "accepted" ? styles.statusAccepted :
                    p.status === "rejected" ? styles.statusRejected : ""
                  }`}>
                    {p.status || "Pending"}
                  </span>
                  <span className={styles.ratingRow}>
                    <i className="ti ti-star-filled" style={{ color: "#f59e0b", fontSize: 13 }} />
                    {p.rating ?? 0}
                  </span>
                </div>
                <h3 className={styles.cardName}>{p.name}</h3>
                <div className={styles.cardInfo}>
                  <div className={styles.infoRow}>
                    <i className="ti ti-building-store" aria-hidden="true" />
                    {p.type || "—"}
                  </div>
                  <div className={styles.infoRow}>
                    <i className="ti ti-map-pin" aria-hidden="true" />
                    {p.area || p.district || "—"}
                  </div>
                  <div className={styles.infoRow}>
                    <i className="ti ti-message" aria-hidden="true" />
                    {p.reviewCount ?? 0} reviews
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedPlace && (
        <div className={styles.overlay} onClick={closePlace}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>

            <div className={styles.modalImgWrap}>
              <img
                className={styles.modalImg}
                src={activeImage || selectedPlace.image || "https://via.placeholder.com/780x280"}
                alt={selectedPlace.name}
              />
              <button className={styles.closeBtn} onClick={closePlace}>×</button>
            </div>

            {selectedPlace.images?.length > 0 && (
              <div className={styles.gallerySection}>
                <p className={styles.gallerySectionTitle}>Photos</p>
                <div className={styles.thumbGrid}>
                  <div
                    className={`${styles.thumbCard} ${(!activeImage || activeImage === selectedPlace.image) ? styles.thumbActive : ""}`}
                    onClick={() => setActiveImage(selectedPlace.image)}
                  >
                    <img src={selectedPlace.image} alt="main" className={styles.thumbImg} />
                  </div>
                  {selectedPlace.images.map(img => (
                    <div
                      key={img._id}
                      className={`${styles.thumbCard} ${activeImage === img.src ? styles.thumbActive : ""}`}
                      onClick={() => setActiveImage(img.src)}
                    >
                      <img src={img.src} alt={img.alt} className={styles.thumbImg} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.modalHead}>
              <span className={styles.modalTitle}>{selectedPlace.name}</span>
              <span className={`${styles.statusPill} ${
                selectedPlace.status === "accepted" ? styles.statusAccepted :
                selectedPlace.status === "rejected" ? styles.statusRejected : ""
              }`}>
                {selectedPlace.status || "Pending"}
              </span>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Type</span>
                <span className={styles.detailVal}>{selectedPlace.type || "—"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Area</span>
                <span className={styles.detailVal}>{selectedPlace.area || selectedPlace.district || "—"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Rating</span>
                <span className={styles.detailVal}>⭐ {selectedPlace.rating ?? 0}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Reviews</span>
                <span className={styles.detailVal}>{selectedPlace.reviewCount ?? 0}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Distance</span>
                <span className={styles.detailVal}>{selectedPlace.distance ?? 0} km</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Accessible</span>
                <span className={styles.detailVal}>{selectedPlace.isAccessible ? "Yes" : "No"}</span>
              </div>
              <div className={`${styles.detailItem} ${styles.detailFull}`}>
                <span className={styles.detailLabel}>Description</span>
                <span className={styles.detailVal}>{selectedPlace.description || "—"}</span>
              </div>
            </div>

            {selectedPlace.tags?.length > 0 && (
              <div className={styles.tagsSection}>
                <p className={styles.tagsSectionTitle}>Accessibility features</p>
                <div className={styles.tags}>
                  {selectedPlace.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.modalActions}>
              {selectedPlace.status !== "accepted" && (
                <button className={styles.acceptBtn} onClick={() => handleAccept(selectedPlace._id)}>
                  <i className="ti ti-check" aria-hidden="true" /> Accept place
                </button>
              )}

              {selectedPlace.status !== "rejected" && (
                <button className={styles.rejectBtn} onClick={() => requestConfirm("reject", selectedPlace)}>
                  <i className="ti ti-x" aria-hidden="true" /> Reject place
                </button>
              )}

              {selectedPlace.status === "rejected" && (
                <button className={styles.deleteBtn} onClick={() => requestConfirm("delete", selectedPlace)}>
                  <i className="ti ti-trash" aria-hidden="true" /> Delete permanently
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {confirmAction && (
        <div className={styles.confirmOverlay} onClick={() => setConfirmAction(null)}>
          <div className={styles.confirmBox} onClick={e => e.stopPropagation()}>
            <div className={styles.confirmIcon}>
              <i className={`ti ti-${confirmAction.type === "delete" ? "trash" : "x"}`} aria-hidden="true" />
            </div>

            {confirmAction.type === "reject" ? (
              <>
                <h3 className={styles.confirmTitle}>Reject this place?</h3>
                <p className={styles.confirmText}>
                  "{confirmAction.place.name}" will be marked as rejected and moved out of the pending list.
                </p>
              </>
            ) : (
              <>
                <h3 className={styles.confirmTitle}>Delete permanently?</h3>
                <p className={styles.confirmText}>
                  "{confirmAction.place.name}" will be permanently removed and cannot be recovered.
                </p>
              </>
            )}

            <div className={styles.confirmActions}>
              <button className={styles.confirmCancel} onClick={() => setConfirmAction(null)}>
                Cancel
              </button>
              <button className={styles.confirmDelete} onClick={runConfirmedAction}>
                {confirmAction.type === "reject" ? "Yes, reject" : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}