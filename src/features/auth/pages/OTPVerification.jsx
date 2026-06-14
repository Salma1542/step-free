import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/OTPVerification.module.css';

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOtp = (val, idx) => {
    if (!/^\d?$/.test(val)) return;

    const next = [...otp];
    next[idx] = val;
    setOtp(next);

    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleOtpKey = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError('');

      const otpCode = otp.join('');

      const response = await axios.post(
        'http://localhost:3000/api/auth/verify-otp',
        {
          email,
          otp: otpCode,
        }
      );

      if (response.data.success) {
        alert('Account verified successfully');

        navigate('/login');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Verification failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.otpRoot}>
      <aside className={styles.otpPanel}>
        <div className={styles.otpPanelDots} />
        <div className={styles.otpPanelC1} />
        <div className={styles.otpPanelC2} />

        <div className={styles.otpPanelContent}>
          <div className={styles.otpPanelBadge}>
            <i className="ti ti-shield-lock" /> Verification
          </div>

          <h1 className={styles.otpPanelTitle}>
            Almost there,
            <br />
            verify your code.
          </h1>

          <p className={styles.otpPanelSub}>
            We sent a 6-digit code to your email.
            Enter it below to activate your account.
          </p>

          <div className={styles.otpPanelHint}>
            <i className="ti ti-mail" />
            <span>{email}</span>
          </div>
        </div>
      </aside>

      <main className={styles.otpMain}>
        <div className={styles.otpCard}>
          <div className={`${styles.otpStepIcon} mb-3`}>
            <i className="ti ti-device-mobile-message" />
          </div>

          <h4 className={styles.otpFormTitle}>
            Verify your account
          </h4>

          <p className={styles.otpFormSub}>
            Enter the verification code sent to:
            <br />
            <strong>{email}</strong>
          </p>

          {error && (
            <div
              style={{
                background: '#fee2e2',
                color: '#b91c1c',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '15px',
              }}
            >
              {error}
            </div>
          )}

          <div className={styles.otpRow}>
            {otp.map((v, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                className={`${styles.otpBox} ${
                  v ? styles.otpBoxFilled : ''
                }`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={v}
                onChange={(e) =>
                  handleOtp(e.target.value, i)
                }
                onKeyDown={(e) =>
                  handleOtpKey(e, i)
                }
              />
            ))}
          </div>

          <button
            className={styles.otpBtn}
            onClick={handleVerify}
            disabled={
              loading || otp.some((v) => !v)
            }
          >
            {loading
              ? 'Verifying...'
              : 'Verify Account'}
          </button>

          <p
            className={styles.otpBack}
            onClick={() => navigate('/register')}
          >
            ← Back
          </p>
        </div>
      </main>
    </div>
  );
}