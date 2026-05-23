
import { useState } from 'react'
import { Link } from 'react-router-dom'


import styles from './AdminDashboardPage.module.css'

function AdminDashboardPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sara Khalifa',
      email: 'sara@gmail.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Mona Ahmed',
      email: 'mona@gmail.com',
      role: 'Owner',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Ali Hassan',
      email: 'ali@gmail.com',
      role: 'User',
      status: 'Blocked',
    },
  ])

  const stats = [
    {
      title: 'Total Users',
      value: '1,240',
      icon: '👥',
    },
    {
      title: 'Places Added',
      value: '320',
      icon: '📍',
    },
    {
      title: 'Reviews',
      value: '875',
      icon: '⭐',
    },
    {
      title: 'Pending Requests',
      value: '18',
      icon: '⏳',
    },
  ]

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div>
          <h2 className={styles.logo}>Step Free</h2>

          <ul className={styles.menu}>
  <li className={styles.active}>
    <Link to="/dashboard">Dashboard</Link>
  </li>

  <li>
    <Link to="/users">Users</Link>
  </li>

  <li>
    <Link to="/Adminplaces">Places</Link>
  </li>

  <li>
    <Link to="/reviews">Reviews</Link>
  </li>
</ul>
        </div>

        <button className={styles.logout}>Logout</button>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage users, places, reviews and platform activity.</p>
          </div>

          <div className={styles.adminInfo}>
            <div>
              <h3>Sara Khalifa</h3>
              <span>Super Admin</span>
            </div>

            <img
              src='https://i.pravatar.cc/100'
              alt='admin'
            />
          </div>
        </header>

        <section className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={styles.statCard}
            >
              <div className={styles.statTop}>
                <span>{stat.icon}</span>
                <h3>{stat.title}</h3>
              </div>

              <h2>{stat.value}</h2>
            </div>
          ))}
        </section>

        <section className={styles.contentGrid}>
          <div className={styles.tableCard}>
            <div className={styles.cardHeader}>
              <h2>Users Management</h2>
              <button>Add User</button>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>

                    <td>
                      <span
                        className={`${styles.status} ${
                          user.status === 'Active'
                            ? styles.activeStatus
                            : user.status === 'Pending'
                            ? styles.pendingStatus
                            : styles.blockedStatus
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className={styles.actions}>
                      <button>Edit</button>

                      <button onClick={() => deleteUser(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.activityCard}>
            <h2>Recent Activity</h2>

            <div className={styles.activityItem}>
              <span>✅</span>
              <div>
                <h4>New user registered</h4>
                <p>2 minutes ago</p>
              </div>
            </div>

            <div className={styles.activityItem}>
              <span>📍</span>
              <div>
                <h4>New accessible place added</h4>
                <p>10 minutes ago</p>
              </div>
            </div>

            <div className={styles.activityItem}>
              <span>⭐</span>
              <div>
                <h4>New review submitted</h4>
                <p>30 minutes ago</p>
              </div>
            </div>

            <div className={styles.activityItem}>
              <span>⚠️</span>
              <div>
                <h4>Report received</h4>
                <p>1 hour ago</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboardPage
