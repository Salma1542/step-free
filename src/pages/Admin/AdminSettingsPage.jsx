import { useEffect, useState } from "react";
import axios from "../../config/axiosInstance";
import styles from "./AdminSettingsPage.module.css";

function SavedBadge({ show }) {
  if (!show) return null;
  return (
    <span className={styles.savedBadge}>
      <i className="ti ti-check" aria-hidden="true" /> Saved
    </span>
  );
}

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState({ firstName: "", lastName: "", email: "", role: "" });
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [notifications, setNotifications] = useState({
    newPlace: true,
    newReview: true,
    reportedReview: false,
  });
  const [notificationsSaved, setNotificationsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProfile(); }, []);

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("TOKEN =", token);

    const res = await axios.get("/admin/profile");
      const data = res?.data?.data;
      if (data) {
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          role: data.role || "",
        });
        if (data.notificationSettings) {
          setNotifications({
            newPlace: data.notificationSettings.newPlace ?? true,
            newReview: data.notificationSettings.newReview ?? true,
            reportedReview: data.notificationSettings.reportedReview ?? false,
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const flash = (setter) => {
    setter(true);
    setTimeout(() => setter(false), 2500);
  };

  const getInitials = () => {
    const f = profile.firstName?.[0] || "";
    const l = profile.lastName?.[0] || "";
    return (f + l).toUpperCase() || "A";
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileError("");
    if (!profile.firstName || !profile.lastName || !profile.email) {
      setProfileError("Please fill in all fields.");
      return;
    }
    try {
      await axios.patch("/admin/profile", {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
      });
      setEditingProfile(false);
      flash(setProfileSaved);
    } catch (err) {
      setProfileError(err?.response?.data?.message || "Could not update profile.");
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setPasswordError("");
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setPasswordError("Please fill in all password fields.");
      return;
    }
    if (passwords.next.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }
    try {
      await axios.patch("/admin/change-password", {
        currentPassword: passwords.current,
        newPassword: passwords.next,
      });
      setPasswords({ current: "", next: "", confirm: "" });
      flash(setPasswordSaved);
    } catch (err) {
      setPasswordError(err?.response?.data?.message || "Could not update password. Please check your current password.");
    }
  };

  const handleNotificationsSave = async () => {
    try {
      await axios.patch("/admin/notification-settings", notifications);
      flash(setNotificationsSaved);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingState}>
          <i className="ti ti-refresh" />
          <p>Loading settings…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your admin account and preferences.</p>
      </header>

      {/* ── Profile ── */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.cardIcon}><i className="ti ti-user-circle" aria-hidden="true" /></div>
          <div>
            <p className={styles.cardTitle}>Profile information</p>
            <p className={styles.cardDesc}>Your basic account details.</p>
          </div>
        </div>

        {!editingProfile ? (
          <div className={styles.hero}>
            <div className={styles.avatar}>{getInitials()}</div>
            <p className={styles.heroName}>{profile.firstName} {profile.lastName}</p>
            <p className={styles.heroEmail}>{profile.email}</p>
            <span className={styles.rolePill}>
              <i className="ti ti-shield-check" aria-hidden="true" />
              {profile.role === "admin" ? "Admin" : profile.role || "—"}
            </span>
            <button className={styles.editBtn} onClick={() => setEditingProfile(true)}>
              <i className="ti ti-pencil" aria-hidden="true" /> Edit profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleProfileSave}>
            <div className={styles.form}>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label htmlFor="fn">First name</label>
                  <input id="fn" type="text" value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                </div>
                <div className={styles.field}>
                  <label htmlFor="ln">Last name</label>
                  <input id="ln" type="text" value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="em">Email address</label>
                <input id="em" type="email" value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </div>
              <div className={styles.field}>
                <label>Role</label>
                <input type="text" value={profile.role === "admin" ? "Admin" : profile.role} disabled className={styles.disabledInput} />
              </div>
              {profileError && (
                <p className={styles.errorText}>
                  <i className="ti ti-alert-circle" aria-hidden="true" /> {profileError}
                </p>
              )}
            </div>
            <div className={styles.cardFoot}>
              <button type="button" className={styles.ghostBtn}
                onClick={() => { setEditingProfile(false); setProfileError(""); }}>
                Cancel
              </button>
              <SavedBadge show={profileSaved} />
              <button type="submit" className={styles.primaryBtn}>Save changes</button>
            </div>
          </form>
        )}
      </section>

      {/* ── Password ── */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.cardIcon}><i className="ti ti-lock" aria-hidden="true" /></div>
          <div>
            <p className={styles.cardTitle}>Change password</p>
            <p className={styles.cardDesc}>Keep your account secure with a strong password.</p>
          </div>
        </div>

        <form onSubmit={handlePasswordSave}>
          <div className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="cp">Current password</label>
              <input id="cp" type={showPasswords ? "text" : "password"}
                placeholder="••••••••" value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                autoComplete="current-password" />
            </div>
            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="np">New password</label>
                <input id="np" type={showPasswords ? "text" : "password"}
                  placeholder="Min. 8 characters" value={passwords.next}
                  onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                  autoComplete="new-password" />
              </div>
              <div className={styles.field}>
                <label htmlFor="cnp">Confirm new password</label>
                <input id="cnp" type={showPasswords ? "text" : "password"}
                  placeholder="Repeat new password" value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  autoComplete="new-password" />
              </div>
            </div>
            <label className={styles.checkboxRow}>
              <input type="checkbox" checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)} />
              Show passwords
            </label>
            {passwordError && (
              <p className={styles.errorText}>
                <i className="ti ti-alert-circle" aria-hidden="true" /> {passwordError}
              </p>
            )}
          </div>
          <div className={styles.cardFoot}>
            <SavedBadge show={passwordSaved} />
            <button type="submit" className={styles.primaryBtn}>Update password</button>
          </div>
        </form>
      </section>

      {/* ── Notifications ── */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.cardIcon}><i className="ti ti-bell" aria-hidden="true" /></div>
          <div>
            <p className={styles.cardTitle}>Notifications</p>
            <p className={styles.cardDesc}>Choose what to be notified about.</p>
          </div>
        </div>

        {[
          { key: "newPlace", title: "New place submissions", desc: "When a user submits a place for review." },
          { key: "newReview", title: "New reviews", desc: "When a user posts a new review." },
          { key: "reportedReview", title: "Reported reviews", desc: "When a review is flagged by a user." },
        ].map(({ key, title, desc }) => (
          <div key={key} className={styles.toggleRow}>
            <div>
              <p className={styles.toggleTitle}>{title}</p>
              <p className={styles.toggleDesc}>{desc}</p>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" checked={notifications[key]}
                onChange={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))} />
              <span className={styles.slider} />
            </label>
          </div>
        ))}

        <div className={styles.notifFoot}>
          <SavedBadge show={notificationsSaved} />
          <button type="button" className={styles.primaryBtn} onClick={handleNotificationsSave}>
            Save preferences
          </button>
        </div>
      </section>
    </div>
  );
}