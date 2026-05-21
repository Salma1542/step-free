import React from 'react';
import styles from '../styles/OtpInput.module.css';

export default function OtpInput({ otp, onChange }) {
  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    onChange(next);
    if (val && idx < 3) document.getElementById(`otp-${idx + 1}`)?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0)
      document.getElementById(`otp-${idx - 1}`)?.focus();
  };

  return (
    <div className={styles.fpOtpRow}>
      {otp.map((v, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          className={`${styles.fpOtpBox} ${v ? styles.fpOtpBoxFilled : ''}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={e => handleChange(e.target.value, i)}
          onKeyDown={e => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
}