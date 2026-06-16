

import styles from "../features/driver/styles/Field.module.css"

export default function Field({ label, icon, value, editing, onChange, type = 'text', colClass = 'col-sm-6' }) {
  return (
    <div className={colClass}>
      <label className="form-label-sm">
        <i className={`bi ${icon}`}></i> {label}
      </label>
      <input
        type={type}
        className={styles.field}
        value={value}
        disabled={!editing}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}