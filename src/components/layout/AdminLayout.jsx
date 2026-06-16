import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import { useAuth } from '../../context/AuthContext';

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
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // بناء اسم الادمن من الـ AuthContext
  const firstName = user?.firstName?.trim() || '';
  const lastName = user?.lastName?.trim() || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'Admin';

  // أول حرفين للـ avatar
  const initials = [firstName.charAt(0), lastName.charAt(0)]
    .filter(Boolean)
    .join('')
    .toUpperCase() || 'A';

  // Lock body scroll when mobile sidebar open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const handleLogout = () => {
    logout();
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
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
                  }
                >
                  <i className={`bi ${item.icon}`} />
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

          {/* Avatar بس — من غير notification ومن غير صورة */}
          <div className={styles.topbarActions}>
            <div className={styles.profile}>
              <div className={styles.avatarInitials} aria-hidden="true">
                {initials}
              </div>
              <div className={styles.profileMeta}>
                <strong>{fullName}</strong>
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