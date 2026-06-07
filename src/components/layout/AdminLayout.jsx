import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.css';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: 'bi-speedometer2', end: true },
  { to: '/admin/users', label: 'Users', icon: 'bi-people-fill' },
  { to: '/admin/Adminplaces', label: 'Places', icon: 'bi-geo-alt-fill' },
  { to: '/admin/reviews', label: 'Reviews', icon: 'bi-star-fill' },
  { to: '/admin/analytics', label: 'Analytics', icon: 'bi-graph-up-arrow' },
  { to: '/admin/settings', label: 'Settings', icon: 'bi-sliders' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile sidebar open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const handleLogout = () => {
    // Replace with real logout logic
    navigate('/login');
  };

  return (
    <div className={styles.shell}>
      {/* Mobile backdrop */}
      <div
        className={`${styles.backdrop} ${sidebarOpen ? styles.backdropOpen : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}
        aria-label="Admin navigation"
      >
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">SF</span>
          <span className={styles.brandText}>Step Free</span>
        </div>

        <nav className={styles.nav}>
          <p className={styles.navLabel}>Main</p>
          <ul className={styles.menu}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
                  }
                >
                  <i className={`bi ${item.icon}`} aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            <i className="bi bi-box-arrow-right" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.body}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={sidebarOpen}
          >
            <i className={`bi ${sidebarOpen ? 'bi-x-lg' : 'bi-list'}`} />
          </button>

          <div className={styles.topbarTitle}>Admin Panel</div>

          <div className={styles.topbarActions}>
            <button type="button" className={styles.iconBtn} aria-label="Notifications">
              <i className="bi bi-bell" />
              <span className={styles.notifyDot} aria-hidden="true" />
            </button>
            <div className={styles.profile}>
              <img
                src="https://i.pravatar.cc/80?img=47"
                alt="Sara Khalifa"
                className={styles.avatar}
              />
              <div className={styles.profileMeta}>
                <strong>Sara Khalifa</strong>
                <span>Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
