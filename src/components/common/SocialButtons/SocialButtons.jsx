import React from 'react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import styles from './SocialButtons.module.css';

export default function SocialButtons() {
  return (
    <div className="row g-2">
      <div className="col">
        <button
          type="button"
          className={`btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 py-2 shadow-none ${styles.socialButton}`}
        >
          <FaGoogle className={styles.googleIcon} /> Google
        </button>
      </div>
      <div className="col">
        <button
          type="button"
          className={`btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 py-2 shadow-none ${styles.socialButton}`}
        >
          <FaApple className={styles.appleIcon} /> Apple
        </button>
      </div>
    </div>
  );
}