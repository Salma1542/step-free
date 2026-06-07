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

function accessTone(level) {
  if (level === 'Accessible') return styles.badgeSuccess;
  if (level === 'Partial') return styles.badgeWarning;
  return styles.badgeDanger;
}

export default function AdminPlacesPage() {
  const [places, setPlaces] = useState(INITIAL_PLACES);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

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

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Places Management</h1>
          <p className={styles.subtitle}>Manage accessible places on the platform.</p>
        </div>
        <button type="button" className={styles.primaryBtn}>
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
                <button type="button" className={styles.btnGhost}>
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
    </div>
  );
}
