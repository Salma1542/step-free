import { useEffect, useState } from 'react';
import styles from './AdminDashboardPage.module.css';
import axios from '../../config/axiosInstance';

// ─── Skeleton loader ────────────────────────────────────────────────────────
function Skeleton({ width = '100%', height = '20px', radius = '6px' }) {
  return (
    <div
      style={{
        width, height, borderRadius: radius,
        background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s infinite',
      }}
    />
  );
}

function statusClass(status) {
  if (status === 'Registered' || status === 'Active') return styles.badgeSuccess;
  if (status === 'Pending') return styles.badgeWarning;
  return styles.badgeDanger;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      // جلب كل البيانات بالتوازي
      const [usersRes, placesRes, reviewsRes] = await Promise.all([
        axios.get('/admin/users'),
        axios.get('/admin/places'),
        axios.get('/admin/reviews?limit=1'),
      ]);

      const allUsers = usersRes.data.data || [];
      const allPlaces = placesRes.data.data || [];
      const totalReviews = reviewsRes.data.totalReviews || 0;

      // حساب الـ stats
      const totalUsers = usersRes.data.count || allUsers.length;
      const totalPlaces = placesRes.data.count || allPlaces.length;
      const pendingPlaces = allPlaces.filter(p => p.status === 'pending').length;

      setStats({ totalUsers, totalPlaces, totalReviews, pendingPlaces });

      // آخر 5 users
      const recent = allUsers.slice(0, 5).map(u => ({
        id: u._id,
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Unknown',
        email: u.email || '',
        role: u.role || 'user',
        status: u.isBlocked ? 'Blocked' : 'Registered',
      }));
      setRecentUsers(recent);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const STAT_CARDS = stats ? [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: 'bi-people-fill',
      tone: 'blue',
    },
    {
      title: 'Places Added',
      value: stats.totalPlaces.toLocaleString(),
      icon: 'bi-geo-alt-fill',
      tone: 'green',
    },
    {
      title: 'Reviews',
      value: stats.totalReviews.toLocaleString(),
      icon: 'bi-star-fill',
      tone: 'amber',
    },
    {
      title: 'Pending Places',
      value: stats.pendingPlaces.toLocaleString(),
      icon: 'bi-hourglass-split',
      tone: 'red',
    },
  ] : [];

  return (
    <div className={styles.page}>
      {/* شامل لـ shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Overview of users, places and activity on Step Free.</p>
        </div>
        {!loading && (
          <button
            type="button"
            onClick={fetchDashboardData}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#f1f5f9', border: '1px solid #e2e8f0',
              borderRadius: 8, padding: '8px 14px', cursor: 'pointer',
              fontSize: 13, color: '#475569', fontWeight: 500,
              transition: 'background 0.15s',
            }}
          >
            <i className="bi bi-arrow-clockwise" />
            Refresh
          </button>
        )}
      </div>

      {error && (
        <div style={{
          background: '#fee2e2', color: '#dc2626', borderRadius: 10,
          padding: '14px 20px', fontSize: 14, display: 'flex',
          alignItems: 'center', gap: 8,
        }}>
          <i className="bi bi-exclamation-circle-fill" />
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <section className={styles.statsGrid}>
        {loading ? (
          // Skeleton للـ stat cards
          [1, 2, 3, 4].map(i => (
            <article key={i} className={styles.statCard}>
              <Skeleton width="48px" height="48px" radius="12px" />
              <div className={styles.statBody} style={{ gap: 8, display: 'flex', flexDirection: 'column' }}>
                <Skeleton width="80px" height="12px" />
                <Skeleton width="60px" height="28px" />
                <Skeleton width="50px" height="12px" />
              </div>
            </article>
          ))
        ) : (
          STAT_CARDS.map(s => (
            <article key={s.title} className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles[s.tone]}`}>
                <i className={`bi ${s.icon}`} />
              </div>
              <div className={styles.statBody}>
                <p className={styles.statTitle}>{s.title}</p>
                <h2 className={styles.statValue}>{s.value}</h2>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Recent Users */}
      <section className={styles.grid}>
        <div className={styles.card}>
          <header className={styles.cardHeader}>
            <h2>Recent Users</h2>
            <a href="/admin/users" className={styles.linkBtn}>
              View all <i className="bi bi-arrow-right" />
            </a>
          </header>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Skeleton للـ table rows
                  [1, 2, 3, 4, 5].map(i => (
                    <tr key={i}>
                      <td><Skeleton width="140px" height="14px" /></td>
                      <td><Skeleton width="180px" height="14px" /></td>
                      <td><Skeleton width="60px" height="14px" /></td>
                      <td><Skeleton width="70px" height="22px" radius="20px" /></td>
                    </tr>
                  ))
                ) : recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className={styles.empty}>
                      <i className="bi bi-inbox" />
                      <p>No users found.</p>
                    </td>
                  </tr>
                ) : (
                  recentUsers.map(u => (
                    <tr key={u.id}>
                      <td data-label="Name">
                        <div className={styles.userCell}>
                          <span className={styles.userAvatar}>{u.name.charAt(0).toUpperCase()}</span>
                          <span>{u.name}</span>
                        </div>
                      </td>
                      <td data-label="Email" className={styles.muted}>{u.email}</td>
                      <td data-label="Role">{u.role}</td>
                      <td data-label="Status">
                        <span className={`${styles.badge} ${statusClass(u.status)}`}>{u.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.card}>
          <header className={styles.cardHeader}>
            <h2>Quick Actions</h2>
          </header>
          <ul className={styles.activity}>
            {[
              { icon: 'bi-geo-alt-fill', tone: 'green', title: 'Review Places', link: '/admin/Adminplaces', sub: `${stats?.pendingPlaces ?? '—'} waiting for approval` },
              { icon: 'bi-people-fill', tone: 'blue', title: 'Manage Users', link: '/admin/users', sub: `${stats?.totalUsers ?? '—'} total users` },
              { icon: 'bi-star-fill', tone: 'amber', title: 'View Reviews', link: '/admin/reviews', sub: `${stats?.totalReviews ?? '—'} total reviews` },
              { icon: 'bi-sliders', tone: 'red', title: 'Settings', link: '/admin/settings', sub: 'Profile & notifications' },
            ].map((a, i) => (
              <li key={i} className={styles.activityItem}>
                <span className={`${styles.activityIcon} ${styles[a.tone]}`}>
                  <i className={`bi ${a.icon}`} />
                </span>
                <div style={{ flex: 1 }}>
                  <p className={styles.activityTitle}>{a.title}</p>
                  <p className={styles.activityTime}>{loading ? '...' : a.sub}</p>
                </div>
                <a
                  href={a.link}
                  style={{
                    fontSize: 13, color: '#006d67', fontWeight: 500,
                    textDecoration: 'none', whiteSpace: 'nowrap',
                  }}
                >
                  Go <i className="bi bi-arrow-right" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}