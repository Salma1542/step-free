import React from 'react';
import styles from '../styles/RegisterPlace.module.css';

const features = [
  { icon: 'ti-trending-up', label: 'Ramp' },
  { icon: 'ti-wheelchair',  label: 'Wheelchair Entrance' },
  { icon: 'ti-door-enter',  label: 'Wide Doors' },
  { icon: 'ti-elevator',    label: 'Elevator' },
  { icon: 'ti-parking',     label: 'Accessible Parking' },
];

export default function RegisterPlace() {
  return (
    <div className={styles.root}>

      {/* ===== Left Panel ===== */}
      <div className={styles.panel}>
        <div className={styles.dots} />
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.panelContent}>
          <h1 className={styles.panelTitle}>Register New<br />Facility</h1>
          <p className={styles.panelSub}>
            Help make your city more accessible. Add your facility to the
            StepFree network and reach people with disabilities easily.
          </p>
          <div className={styles.panelInfo}>
            <div className={styles.infoIcon}>
              <i className="ti ti-rosette-discount-check" aria-hidden="true" />
            </div>
            <p className={styles.infoText}>
              Verified facilities get a{' '}
              <strong style={{ color: '#fff' }}>"Verified Access"</strong>{' '}
              badge on their listing.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Right Panel ===== */}
      <div className={styles.right}>
        <div className={styles.formWrap}>
          <form>

            {/* Section 1 */}
            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>1</span>
                <h3 className={styles.secTitle}>Facility Information</h3>
              </div>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>Facility Name</label>
                  <input type="text" placeholder="Enter facility name" />
                </div>
                <div className={styles.field}>
                  <label>Category</label>
                  <select>
                    <option>Restaurants & Cafes</option>
                    <option>Hotels</option>
                    <option>Public Places</option>
                    <option>Hospitals</option>
                    <option>Malls & Shopping</option>
                  </select>
                </div>
                <div className={`${styles.field} ${styles.full}`}>
                  <label>Address</label>
                  <div className={styles.addr}>
                    <i className="ti ti-map-pin" aria-hidden="true" />
                    <input type="text" placeholder="Search for location or enter address" />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Section 2 */}
            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>2</span>
                <h3 className={styles.secTitle}>Accessibility Features</h3>
              </div>
              <div className={styles.featGrid}>
                {features.map((f) => (
                  <label className={styles.featLabel} key={f.label}>
                    <input type="checkbox" />
                    <div className={styles.featCard}>
                      <i className={`ti ${f.icon}`} aria-hidden="true" />
                      <span>{f.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.divider} />

            {/* Section 3 */}
            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>3</span>
                <h3 className={styles.secTitle}>Photo Verification</h3>
              </div>
              <div className={styles.upload}>
                <i className="ti ti-cloud-upload" aria-hidden="true" />
                <p>Drag photos here or click to upload</p>
                <span>Max 5 photos — entrances, ramps, elevators</span>
              </div>
              <div className={styles.alert}>
                <i className="ti ti-info-circle" aria-hidden="true" />
                <p>
                  Photos speed up the review process. Clear photos of entrances,
                  ramps, and elevators help verify your listing faster.
                </p>
              </div>
            </div>

            <button type="submit" className={styles.submit}>
              Submit for Review
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}