import { useEffect, useMemo, useState } from 'react';
import styles from './UsersPage.module.css';
import axios from "../../config/axiosInstance";

const STATUSES = ['All', 'Registered', 'Blocked'];

function statusClass(status) {
  if (status === 'Registered') return styles.badgeSuccess;
  return styles.badgeDanger;
}

// ─── Delete Confirm Modal ───────────────────────────────────────────────────
function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHead}>
          <h2>Delete User</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#fee2e2', display: 'grid',
            placeItems: 'center', margin: '0 auto 16px'
          }}>
            <i className="bi bi-trash" style={{ fontSize: 24, color: '#dc2626' }} />
          </div>
          <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 16, color: '#0f172a' }}>
            Are you sure?
          </p>
          <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>
            This action cannot be undone. The user will be permanently deleted.
          </p>
        </div>
        <div className={styles.modalActions}>
          <button type="button" className={styles.secondaryBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.primaryBtn}
            style={{ background: '#dc2626' }}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add User Modal ─────────────────────────────────────────────────────────
function AddUserModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '', email: '', role: 'User', status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim()) {
      onAdd({ ...formData, joined: new Date().toISOString().split('T')[0] });
      setFormData({ name: '', email: '', role: 'User', status: 'Active' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHead}>
          <h2>Add New User</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" name="name" value={formData.name}
              onChange={handleChange} placeholder="Enter user full name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="example@gmail.com" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role">Role</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}>
              <option>User</option>
              <option>Driver</option>
              <option>PlaceOwner</option>
              <option>Admin</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option>Active</option>
              <option>Blocked</option>
            </select>
          </div>
          <div className={styles.modalActions}>
            <button type="button" className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.primaryBtn}>Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Edit User Modal ─────────────────────────────────────────────────────────
function EditUserModal({ isOpen, onClose, onSave, user }) {
  const [formData, setFormData] = useState({
    name: '', email: '', role: 'User', status: 'Active'
  });

  useEffect(() => {
    if (user && isOpen) {
      const roleMap = { user: 'User', driver: 'Driver', placeowner: 'PlaceOwner', admin: 'Admin' };
      setFormData({
        name: user.name?.trim() || '',
        email: user.email || '',
        role: roleMap[user.role?.toLowerCase()] || 'User',
        status: user.status || 'Active'
      });
    }
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim()) {
      onSave({ ...user, ...formData });
    } else {
      alert('Please fill in all required fields');
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHead}>
          <h2>Edit User</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="editName">Full Name</label>
            <input id="editName" type="text" name="name" value={formData.name}
              onChange={handleChange} placeholder="Enter user full name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="editEmail">Email Address</label>
            <input id="editEmail" type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="example@gmail.com" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="editRole">Role</label>
            <select id="editRole" name="role" value={formData.role} onChange={handleChange}>
              <option>User</option>
              <option>Driver</option>
              <option>PlaceOwner</option>
              <option>Admin</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="editStatus">Status</label>
            <select id="editStatus" name="status" value={formData.status} onChange={handleChange}>
              <option>Active</option>
              <option>Blocked</option>
            </select>
          </div>
          <div className={styles.modalActions}>
            <button type="button" className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.primaryBtn}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      const formattedUsers = res.data.data.map((user) => {
        const firstName = user.firstName?.trim() || "";
        const lastName = user.lastName?.trim() || "";
        const fullName = `${firstName} ${lastName}`.trim() || "Unknown User";
        return {
          id: user._id,
          name: fullName,
          email: user.email || "",
          role: user.role || "user",
          status: user.isBlocked ? "Blocked" : "Registered",
          joined: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "",
        };
      });
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const matchesStatus = filter === 'All' || u.status === filter;
      const matchesQuery = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [users, query, filter]);

  // فتح modal التأكيد
  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  // تنفيذ الحذف بعد التأكيد
  const confirmDelete = async () => {
    try {
      await axios.delete(`/admin/users/${userToDelete}`);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user: ' + (error.response?.data?.message || error.message));
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleAddUser = async (newUserData) => {
    try {
      await axios.post('/admin/users', {
        firstName: newUserData.name.split(' ')[0] || '',
        lastName: newUserData.name.split(' ').slice(1).join(' ') || '',
        email: newUserData.email,
        role: newUserData.role.toLowerCase(),
        isBlocked: newUserData.status === 'Blocked'
      });
      fetchUsers();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      const nameParts = updatedUser.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      await axios.patch(`/admin/users/${updatedUser.id}`, {
        firstName, lastName,
        email: updatedUser.email,
        role: updatedUser.role.toLowerCase(),
        isBlocked: updatedUser.status === 'Blocked'
      });
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
      setShowEditModal(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Users Management</h1>
          <p className={styles.subtitle}>Manage all platform users and permissions.</p>
        </div>
        <button type="button" className={styles.primaryBtn} onClick={() => setShowAddModal(true)}>
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
              key={s} type="button"
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
                        <button type="button" className={styles.iconBtn}
                          aria-label="Edit user" onClick={() => handleEdit(u)}>
                          <i className="bi bi-pencil" />
                        </button>
                        <button type="button"
                          className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                          aria-label="Delete user" onClick={() => handleDelete(u.id)}>
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

      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddUser}
      />

      <EditUserModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setSelectedUser(null); }}
        onSave={handleSaveUser}
        user={selectedUser}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setUserToDelete(null); }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}