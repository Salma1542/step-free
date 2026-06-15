

import styles from '../features/driver/styles//HistoryTabs.module.css'

function Stars({ n }) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`bi ${i < n ? 'bi-star-fill text-warning' : 'bi-star text-muted'}`}
        ></i>
      ))}
    </span>
  )
}

export default function HistoryTabs({ tab, setTab, trips, reviews }) {
  return (
    <div className={styles.wrapper}>
      <ul className={`nav nav-tabs ${styles.tabBar} m-0`} role="tablist">
        <li className="nav-item flex-fill" role="presentation">
          <button
            className={`nav-link ${tab === 'history' ? 'active' : ''}`}
            onClick={() => setTab('history')}
            type="button"
          >
            Service history
          </button>
        </li>
        <li className="nav-item flex-fill" role="presentation">
          <button
            className={`nav-link ${tab === 'reviews' ? 'active' : ''}`}
            onClick={() => setTab('reviews')}
            type="button"
          >
            Ratings received
          </button>
        </li>
      </ul>

      <div className={styles.tabBody}>
        {tab === 'history' ? (
          <ul className="list-unstyled m-0">
            {trips.map((t) => (
              <li key={t.id} className={styles.listItem}>
                <div className="d-flex justify-content-between gap-3">
                  <div className="min-w-0">
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-semibold small">{t.rider}</span>
                      <span
                        className={`${styles.badgeStatus} ${
                          t.status === 'Completed' ? styles.badgeCompleted : styles.badgeCancelled
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                    <div className="text-muted small mt-1">
                      {t.from} → {t.to}
                    </div>
                    <div className="text-muted" style={{ fontSize: '.7rem' }}>
                      {t.date} · {t.id}
                    </div>
                  </div>
                  <div className="text-end flex-shrink-0">
                    <div className="fw-semibold small">{t.fare}</div>
                    {t.rating > 0 && (
                      <div className="small text-muted mt-1">
                        <i className="bi bi-star-fill text-warning"></i> {t.rating}.0
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="list-unstyled m-0">
            {reviews.map((r) => (
              <li key={r.id} className={styles.listItem}>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold small">{r.rider}</span>
                  <span className="text-muted" style={{ fontSize: '.7rem' }}>
                    {r.date}
                  </span>
                </div>
                <div className="mt-1">
                  <Stars n={r.rating} />
                </div>
                <p className="text-muted small mt-2 mb-0">{r.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}