

import styles from '../features/driver/styles//SectionCard.module.css'

export default function SectionCard({ step, title, children }) {
  return (
    <section className={`${styles.sectionCard} mb-4`}>
      <div className={styles.sectionHeader}>
        <span className={styles.stepBadge}>{step}</span>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      {children}
    </section>
  )
}