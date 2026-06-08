import styles from './AdminDashboardPage.module.css';

const STATS = [
  { title: 'Total Users', value: '1,240', delta: '+8.2%', up: true, icon: 'bi-people-fill', tone: 'blue' },
  { title: 'Places Added', value: '320', delta: '+3.1%', up: true, icon: 'bi-geo-alt-fill', tone: 'green' },
  { title: 'Reviews', value: '875', delta: '+12.4%', up: true, icon: 'bi-star-fill', tone: 'amber' },
  { title: 'Pending Requests', value: '18', delta: '-2', up: false, icon: 'bi-hourglass-split', tone: 'red' },
];

const RECENT_USERS = [
  { id: 1, name: 'Sara Khalifa', email: 'sara@gmail.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Mona Ahmed', email: 'mona@gmail.com', role: 'Owner', status: 'Pending' },
  { id: 3, name: 'Ali Hassan', email: 'ali@gmail.com', role: 'User', status: 'Blocked' },
  { id: 4, name: 'Omar Nabil', email: 'omar@gmail.com', role: 'User', status: 'Active' },
];

const ACTIVITY = [
  { icon: 'bi-person-plus-fill', tone: 'blue', title: 'New user registered', time: '2 minutes ago' },
  { icon: 'bi-geo-alt-fill', tone: 'green', title: 'New accessible place added', time: '10 minutes ago' },
  { icon: 'bi-star-fill', tone: 'amber', title: 'New review submitted', time: '30 minutes ago' },
  { icon: 'bi-exclamation-triangle-fill', tone: 'red', title: 'Report received', time: '1 hour ago' },
];

function statusClass(status) {
  if (status === 'Active') return styles.badgeSuccess;
  if (status === 'Pending') return styles.badgeWarning;
  return styles.badgeDanger;
}

export default function AdminDashboardPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Overview of users, places and activity on Step Free.</p>
        </div>
      </div>

      <section className={styles.statsGrid}>
        {STATS.map((s) => (
          <article key={s.title} className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles[s.tone]}`}>
              <i className={`bi ${s.icon}`} />
            </div>
            <div className={styles.statBody}>
              <p className={styles.statTitle}>{s.title}</p>
              <h2 className={styles.statValue}>{s.value}</h2>
              <span className={`${styles.statDelta} ${s.up ? styles.up : styles.down}`}>
                <i className={`bi ${s.up ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`} />
                {s.delta}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.grid}>
        <div className={styles.card}>
          <header className={styles.cardHeader}>
            <h2>Recent Users</h2>
            <a href="/admin/users" className={styles.linkBtn}>View all <i className="bi bi-arrow-right" /></a>
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
                {RECENT_USERS.map((u) => (
                  <tr key={u.id}>
                    <td data-label="Name">
                      <div className={styles.userCell}>
                        <span className={styles.userAvatar}>{u.name.charAt(0)}</span>
                        <span>{u.name}</span>
                      </div>
                    </td>
                    <td data-label="Email" className={styles.muted}>{u.email}</td>
                    <td data-label="Role">{u.role}</td>
                    <td data-label="Status">
                      <span className={`${styles.badge} ${statusClass(u.status)}`}>{u.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.card}>
          <header className={styles.cardHeader}>
            <h2>Recent Activity</h2>
          </header>
          <ul className={styles.activity}>
            {ACTIVITY.map((a, i) => (
              <li key={i} className={styles.activityItem}>
                <span className={`${styles.activityIcon} ${styles[a.tone]}`}>
                  <i className={`bi ${a.icon}`} />
                </span>
                <div>
                  <p className={styles.activityTitle}>{a.title}</p>
                  <p className={styles.activityTime}>{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
