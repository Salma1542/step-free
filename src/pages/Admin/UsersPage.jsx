import { useState } from 'react'
import styles from './UsersPage.module.css'

function UsersPage() {
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

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Users Management</h1>
          <p>Manage all platform users and permissions.</p>
        </div>

        <button>Add User</button>
      </div>

      <div className={styles.tableCard}>
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
                        ? styles.active
                        : user.status === 'Pending'
                        ? styles.pending
                        : styles.blocked
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
    </div>
  )
}

export default UsersPage