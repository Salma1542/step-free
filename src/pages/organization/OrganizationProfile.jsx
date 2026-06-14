import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles/OrganizationProfile.module.css";

export default function OrganizationProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:3000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {/* LEFT PANEL */}
      <aside className={styles.panel}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>

        <div className={styles.panelContent}>
          <div className={styles.badge}>
            <i className="ti ti-building-community" />
            Organization Dashboard
          </div>

          <h1 className={styles.title}>
            Welcome,
            <br />
            {user?.firstName || "Organization"}
          </h1>

          <p className={styles.sub}>
            Your account has been successfully verified.
            Complete your organization profile and submit your place details for
            admin review.
          </p>
        </div>
      </aside>

      {/* RIGHT */}
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <i className="ti ti-building-store" />
            </div>

            <div className={styles.status}>
              <i className="ti ti-clock-hour-4" />
              Waiting For Admin Review
            </div>

            <h2>Organization Profile</h2>

            <p>Review your account information below.</p>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <i className="ti ti-user" />
              <div>
                <label>Organizer Name</label>
                <span>
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <i className="ti ti-mail" />
              <div>
                <label>Email</label>
                <span>{user?.email}</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <i className="ti ti-map-pin" />
              <div>
                <label>City</label>
                <span>{user?.city}</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <i className="ti ti-phone" />
              <div>
                <label>Phone</label>
                <span>{user?.phone}</span>
              </div>
            </div>

            {/* <div className={styles.infoCard}>
              <i className="ti ti-calendar" />
              <div>
                <label>Date Of Birth</label>
                <span>
                  {user?.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div> */}

            <div className={styles.infoCard}>
              <i className="ti ti-shield-check" />
              <div>
                <label>Account Status</label>
                <span>
                  {user?.isVerified ? "Verified" : "Pending Verification"}
                </span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <i className="ti ti-user-cog" />
              <div>
                <label>Role</label>
                <span>{user?.role}</span>
              </div>
            </div>
          </div>

          <div className={styles.progressBox}>
            <div className={styles.progressHeader}>
              <span>Profile Completion</span>
              <span>40%</span>
            </div>

            <div className={styles.progressBar}>
              <div className={styles.progress}></div>
            </div>
          </div>

          <button
            className={styles.btn}
            onClick={() => navigate("/placeForm")}
          >
            Complete Place Information
            <i className="ti ti-arrow-right" />
          </button>
        </div>
      </main>
    </div>
  );
}