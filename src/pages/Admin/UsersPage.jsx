import { useMemo, useState } from 'react';
import styles from './UsersPage.module.css';

const INITIAL_USERS = [
  { id: 1, name: 'Sara Khalifa', email: 'sara@gmail.com', role: 'Admin', status: 'Active', joined: '2024-01-12' },
  { id: 2, name: 'Mona Ahmed', email: 'mona@gmail.com', role: 'Owner', status: 'Pending', joined: '2024-03-04' },
  { id: 3, name: 'Ali Hassan', email: 'ali@gmail.com', role: 'User', status: 'Blocked', joined: '2024-04-22' },
  { id: 4, name: 'Omar Nabil', email: 'omar@gmail.com', role: 'User', status: 'Active', joined: '2024-05-09' },
  { id: 5, name: 'Yara Mostafa', email: 'yara@gmail.com', role: 'Owner', status: 'Active', joined: '2024-06-18' },
  { id: 6, name: 'Hassan Adel', email: 'hassan@gmail.com', role: 'User', status: 'Pending', joined: '2024-07-01' },
];

const STATUSES = ['All', 'Active', 'Pending', 'Blocked'];

function statusClass(status) {
  if (status === 'Active') return styles.badgeSuccess;
  if (status === 'Pending') return styles.badgeWarning;
  return styles.badgeDanger;
}

export default function UsersPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const matchesStatus = filter === 'All' || u.status === filter;
      const matchesQuery =
        !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [users, query, filter]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this user? This action cannot be undone.')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Users Management</h1>
          <p className={styles.subtitle}>Manage all platform users and permissions.</p>
        </div>
        <button type="button" className={styles.primaryBtn}>
          <i className="bi bi-plus-lg" /> Add User
        </button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <i className="bi bi-search" />
          <input
            type="search"
            placeholder="Search by name or email…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search users"
          />
        </div>
        <div className={styles.tabs} role="tablist">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              className={`${styles.tab} ${filter === s ? styles.tabActive : ''}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
                <th className={styles.actionsCol}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.empty}>
                    <i className="bi bi-inbox" />
                    <p>No users match your filters.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id}>
                    <td data-label="Name">
                      <div className={styles.userCell}>
                        <span className={styles.userAvatar}>{u.name.charAt(0)}</span>
                        <span>{u.name}</span>
                      </div>
                    </td>
                    <td data-label="Email" className={styles.muted}>{u.email}</td>
                    <td data-label="Role">{u.role}</td>
                    <td data-label="Joined" className={styles.muted}>{u.joined}</td>
                    <td data-label="Status">
                      <span className={`${styles.badge} ${statusClass(u.status)}`}>{u.status}</span>
                    </td>
                    <td data-label="Actions">
                      <div className={styles.actions}>
                        <button type="button" className={styles.iconBtn} aria-label="Edit user">
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          type="button"
                          className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                          aria-label="Delete user"
                          onClick={() => handleDelete(u.id)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <footer className={styles.tableFoot}>
          <span>Showing <strong>{filtered.length}</strong> of <strong>{users.length}</strong> users</span>
        </footer>
      </div>
    </div>
  );
}
