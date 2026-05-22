

import styles from '../features/driver/styles//StatCard.module.css'

export default function StatCard({ icon, label, value }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statLabel}>
        <i className={`bi ${icon}`}></i> {label}
      </div>
      <div className={styles.statValue}>{value}</div>
    </div>
  )
}