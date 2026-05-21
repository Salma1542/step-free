import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/OTPVerification.module.css';

export default function OTPVerification() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const email     = location.state?.email || '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtp = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
  };

  const handleOtpKey = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0)
      document.getElementById(`otp-${idx - 1}`)?.focus();
  };

  return (
    <div className={styles.otpRoot}>

      {/* ===== LEFT PANEL ===== */}
      <aside className={styles.otpPanel}>
        <div className={styles.otpPanelDots} />
        <div className={styles.otpPanelC1} />
        <div className={styles.otpPanelC2} />
        <div className={styles.otpPanelContent}>
          <div className={styles.otpPanelBadge}>
            <i className="ti ti-shield-lock" /> Verification
          </div>
          <h1 className={styles.otpPanelTitle}>Almost there,<br />verify your code.</h1>
          <p className={styles.otpPanelSub}>
            We sent a 6-digit code to your email. Enter it to continue resetting your password.
          </p>
          <div className={styles.otpPanelHint}>
            <i className="ti ti-mail" />
            <span>{email}</span>
          </div>
        </div>
      </aside>

      {/* ===== RIGHT FORM ===== */}
      <main className={styles.otpMain}>
        <div className={styles.otpCard}>
          <div className={`${styles.otpStepIcon} mb-3`}>
            <i className="ti ti-device-mobile-message" />
          </div>
          <h4 className={styles.otpFormTitle}>Check your email</h4>
          <p className={styles.otpFormSub}>
            We sent a 6-digit code to <strong>{email}</strong>. Enter it below.
          </p>

          <div className={styles.otpRow}>
            {otp.map((v, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                className={`${styles.otpBox} ${v ? styles.otpBoxFilled : ''}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={v}
                onChange={e => handleOtp(e.target.value, i)}
                onKeyDown={e => handleOtpKey(e, i)}
              />
            ))}
          </div>

          <button
            className={styles.otpBtn}
            onClick={() => navigate('/reset-password', { state: { email } })}
            disabled={otp.some(v => !v)}
          >
            Verify Code
          </button>

          <p className={styles.otpBack} onClick={() => navigate('/forgetPassword')}>← Back</p>

          <p className={styles.otpResend}>
            Didn't receive the code?{' '}
            <span className={styles.otpResendLink}>Resend</span>
          </p>
        </div>
      </main>
    </div>
  );
}