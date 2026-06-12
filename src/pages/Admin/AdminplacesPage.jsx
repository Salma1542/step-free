import { useMemo, useState } from 'react';
import styles from './AdminplacesPage.module.css';

const INITIAL_PLACES = [
  { id: 1, name: 'Cairo Mall', city: 'Cairo', category: 'Mall', accessibility: 'Accessible', rating: 4.8 },
  { id: 2, name: 'Smart Village', city: 'Giza', category: 'Office', accessibility: 'Partial', rating: 4.5 },
  { id: 3, name: 'City Center', city: 'Alexandria', category: 'Mall', accessibility: 'Not Accessible', rating: 3.9 },
  { id: 4, name: 'The Terrace Bistro', city: 'Cairo', category: 'Restaurant', accessibility: 'Accessible', rating: 4.6 },
  { id: 5, name: 'Brew Co Cafe', city: 'Giza', category: 'Cafe', accessibility: 'Accessible', rating: 4.7 },
  { id: 6, name: 'Elite Care Center', city: 'Cairo', category: 'Hospital', accessibility: 'Partial', rating: 4.2 },
];

const FILTERS = ['All', 'Accessible', 'Partial', 'Not Accessible'];
const CATEGORIES = ['Mall', 'Office', 'Restaurant', 'Cafe', 'Hospital', 'Park', 'Library'];

function accessTone(level) {
  if (level === 'Accessible') return styles.badgeSuccess;
  if (level === 'Partial') return styles.badgeWarning;
  return styles.badgeDanger;
}

function AddPlaceModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    category: 'Mall',
    accessibility: 'Accessible',
    rating: 4.0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.city.trim()) {
      onAdd(formData);
      setFormData({ name: '', city: '', category: 'Mall', accessibility: 'Accessible', rating: 4.0 });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHead}>
          <h2>Add New Place</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="place-name">Place Name</label>
            <input
              id="place-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Downtown Mall"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Cairo"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="accessibility">Accessibility Level</label>
            <select
              id="accessibility"
              name="accessibility"
              value={formData.accessibility}
              onChange={handleChange}
            >
              <option>Accessible</option>
              <option>Partial</option>
              <option>Not Accessible</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="rating">Rating (0-5)</label>
            <input
              id="rating"
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.secondaryBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryBtn}>
              Add Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditPlaceModal({ isOpen, onClose, onSave, place }) {
  const [formData, setFormData] = useState(place || {
    name: '',
    city: '',
    category: 'Mall',
    accessibility: 'Accessible',
    rating: 4.0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.city.trim()) {
      onSave(formData);
    }
  };

  if (!isOpen || !place) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHead}>
          <h2>Edit Place</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="edit-place-name">Place Name</label>
            <input
              id="edit-place-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Downtown Mall"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-city">City</label>
            <input
              id="edit-city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Cairo"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-category">Category</label>
            <select
              id="edit-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-accessibility">Accessibility Level</label>
            <select
              id="edit-accessibility"
              name="accessibility"
              value={formData.accessibility}
              onChange={handleChange}
            >
              <option>Accessible</option>
              <option>Partial</option>
              <option>Not Accessible</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-rating">Rating (0-5)</label>
            <input
              id="edit-rating"
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.secondaryBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryBtn}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPlacesPage() {
  const [places, setPlaces] = useState(INITIAL_PLACES);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return places.filter((p) => {
      const matchesFilter = filter === 'All' || p.accessibility === filter;
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [places, query, filter]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this place?')) {
      setPlaces((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (place) => {
    setEditingPlace(place);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedData) => {
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === editingPlace.id
          ? { ...p, ...updatedData }
          : p
      )
    );
    setShowEditModal(false);
    setEditingPlace(null);
  };

  const handleAddPlace = (newPlaceData) => {
    const newPlace = {
      id: Math.max(...places.map(p => p.id), 0) + 1,
      ...newPlaceData
    };
    setPlaces(prev => [newPlace, ...prev]);
    setShowAddModal(false);
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Places Management</h1>
          <p className={styles.subtitle}>Manage accessible places on the platform.</p>
        </div>
        <button 
          type="button" 
          className={styles.primaryBtn}
          onClick={() => setShowAddModal(true)}
        >
          <i className="bi bi-plus-lg" /> Add Place
        </button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <i className="bi bi-search" />
          <input
            type="search"
            placeholder="Search by name or city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search places"
          />
        </div>
        <div className={styles.tabs}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.tab} ${filter === f ? styles.tabActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <i className="bi bi-geo-alt" />
          <p>No places match your filters.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((p) => (
            <article key={p.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.thumb}>
                  <i className="bi bi-geo-alt-fill" />
                </span>
                <span className={`${styles.badge} ${accessTone(p.accessibility)}`}>
                  {p.accessibility}
                </span>
              </div>

              <h3 className={styles.placeName}>{p.name}</h3>
              <ul className={styles.metaList}>
                <li><i className="bi bi-building" /> {p.category}</li>
                <li><i className="bi bi-pin-map" /> {p.city}</li>
                <li><i className="bi bi-star-fill" style={{ color: '#f59e0b' }} /> {p.rating.toFixed(1)}</li>
              </ul>

              <div className={styles.cardActions}>
                <button 
                  type="button" 
                  className={styles.btnGhost}
                  onClick={() => handleEdit(p)}
                >
                  <i className="bi bi-pencil" /> Edit
                </button>
                <button
                  type="button"
                  className={styles.btnDanger}
                  onClick={() => handleDelete(p.id)}
                >
                  <i className="bi bi-trash" /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <AddPlaceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddPlace}
      />

      <EditPlaceModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingPlace(null);
        }}
        onSave={handleSaveEdit}
        place={editingPlace}
      />
    </div>
  );
}