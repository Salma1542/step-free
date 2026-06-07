import { useMemo, useState } from 'react';
import styles from './ReviewsPage.module.css';

const INITIAL_REVIEWS = [
  { id: 1, user: 'Sara Khalifa', place: 'Cairo Mall', rating: 5, comment: 'Amazing accessibility and ramps everywhere. Staff was super helpful.', date: '2 days ago' },
  { id: 2, user: 'Ali Hassan', place: 'Smart Village', rating: 4, comment: 'Good experience overall. Could improve signage for accessible routes.', date: '5 days ago' },
  { id: 3, user: 'Mona Ahmed', place: 'City Center', rating: 2, comment: 'Needs better wheelchair access. Elevators were out of service.', date: '1 week ago' },
  { id: 4, user: 'Omar Nabil', place: 'The Terrace Bistro', rating: 5, comment: 'Wide doors and accessible bathroom. Great food too!', date: '1 week ago' },
  { id: 5, user: 'Yara Mostafa', place: 'Brew Co Cafe', rating: 3, comment: 'Mostly accessible but tight spaces between tables.', date: '2 weeks ago' },
];

const RATING_FILTERS = [
  { label: 'All', value: 0 },
  { label: '5★', value: 5 },
  { label: '4★', value: 4 },
  { label: '3★', value: 3 },
  { label: '≤ 2★', value: 2 },
];

function Stars({ value }) {
  return (
    <span className={styles.stars} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <i key={n} className={`bi ${n <= value ? 'bi-star-fill' : 'bi-star'}`} />
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reviews.filter((r) => {
      const matchesRating =
        filter === 0 ||
        (filter === 2 ? r.rating <= 2 : r.rating === filter);
      const matchesQuery =
        !q ||
        r.user.toLowerCase().includes(q) ||
        r.place.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q);
      return matchesRating && matchesQuery;
    });
  }, [reviews, query, filter]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this review?')) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Reviews Management</h1>
          <p className={styles.subtitle}>Monitor all user reviews and reports.</p>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <i className="bi bi-search" />
          <input
            type="search"
            placeholder="Search reviews, users, or places…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search reviews"
          />
        </div>
        <div className={styles.tabs}>
          {RATING_FILTERS.map((f) => (
            <button
              key={f.label}
              type="button"
              className={`${styles.tab} ${filter === f.value ? styles.tabActive : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <i className="bi bi-chat-square-text" />
          <p>No reviews match your filters.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((r) => (
            <article key={r.id} className={styles.card}>
              <header className={styles.cardHead}>
                <div className={styles.userBlock}>
                  <span className={styles.avatar}>{r.user.charAt(0)}</span>
                  <div>
                    <h3 className={styles.userName}>{r.user}</h3>
                    <p className={styles.placeName}>
                      <i className="bi bi-geo-alt-fill" /> {r.place}
                    </p>
                  </div>
                </div>
                <Stars value={r.rating} />
              </header>

              <p className={styles.comment}>{r.comment}</p>

              <footer className={styles.cardFoot}>
                <span className={styles.date}>{r.date}</span>
                <div className={styles.actions}>
                  <button type="button" className={styles.btnGhost}>
                    <i className="bi bi-eye" /> View
                  </button>
                  <button
                    type="button"
                    className={styles.btnDanger}
                    onClick={() => handleDelete(r.id)}
                  >
                    <i className="bi bi-trash" /> Delete
                  </button>
                </div>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
