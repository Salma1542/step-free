import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/ForgotPassword.module.css';

const STEPS = [
  { id: 1, label: 'Step 1' },
  { id: 2, label: 'Step 2' },
  { id: 3, label: 'Done ✓' },
];

const timeline = [
  { n: 1, title: 'Enter your email',   sub: "We'll send a verification code" },
  { n: 2, title: 'Reset password',     sub: 'Enter OTP and your new password' },
];

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep]         = useState(1);
  const [email, setEmail]       = useState('');
  const [otp, setOtp]           = useState(['', '', '', '', '', '']);
  const [pass, setPass]         = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSendCode = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/forgot-password',
        { email }
      );

      if (response.data.success) {
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const handleOtp = (val, idx) => {
    if (!/^\d?$/.test(val)) return;

    const next = [...otp];
    next[idx] = val;
    setOtp(next);

    if (val && idx < 5) {
      document.getElementById(`otp-fp-${idx + 1}`)?.focus();
    }
  };

  const handleOtpKey = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      document.getElementById(`otp-fp-${idx - 1}`)?.focus();
    }
  };

  const handleResetPassword = async () => {
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    if (!pass || pass !== confirm || pass.length < 8) {
      setError('Passwords do not match or less than 8 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/reset-password',
        { 
          email, 
          otp: otpCode, 
          newPassword: pass,
          confirmPassword: confirm
        }
      );

      if (response.data.success) {
        setStep(3);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    if (step === 1) return (
      <>
        <div className={`${styles.fpStepIcon} mb-3`}><i className="ti ti-mail" /></div>
        <h4 className={styles.fpFormTitle}>Forgot your password?</h4>
        <p className={styles.fpFormSub}>No worries! Enter your email and we'll send you a verification code.</p>
        
        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
            ✕ {error}
          </div>
        )}

        <div className={styles.fpField}>
          <label className={styles.fpLabel}>Email address</label>
          <div className={styles.fpInputWrap}>
            <i className="ti ti-mail" style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'#aaa',fontSize:16}} />
            <input 
              className={styles.fpInput} 
              type="email" 
              placeholder="you@example.com"
              value={email} 
              onChange={e => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              disabled={loading}
            />
          </div>
        </div>
        <button 
          className={styles.fpBtn} 
          onClick={handleSendCode} 
          disabled={!email || loading}
        >
          {loading ? 'Sending...' : 'Send Code'}
        </button>
        <p className={styles.fpBack} onClick={() => navigate('/login')}>Back to Sign in</p>
      </>
    );

    if (step === 2) return (
      <>
        <div className={`${styles.fpStepIcon} mb-3`}><i className="ti ti-lock-open" /></div>
        <h4 className={styles.fpFormTitle}>Reset your password</h4>
        <p className={styles.fpFormSub}>Enter the 6-digit OTP sent to<br /><strong>{email}</strong> and set a new password</p>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
            ✕ {error}
          </div>
        )}

        <div className={styles.fpField}>
          <label className={styles.fpLabel}>Verification code</label>
          <div className={styles.fpOtpRow} style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '16px' }}>
            {otp.map((v, i) => (
              <input
                key={i}
                id={`otp-fp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={v}
                onChange={(e) => handleOtp(e.target.value, i)}
                onKeyDown={(e) => handleOtpKey(e, i)}
                disabled={loading}
                style={{
                  width: '40px',
                  height: '48px',
                  fontSize: '20px',
                  textAlign: 'center',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  transition: 'border-color 0.2s',
                }}
              />
            ))}
          </div>
        </div>

        <div className={styles.fpField}>
          <label className={styles.fpLabel}>New password</label>
          <div className={styles.fpInputWrap}>
            <i className="ti ti-lock" style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'#aaa',fontSize:16}} />
            <input 
              className={`${styles.fpInput} ${styles.fpInputPaddedRight}`}
              type={showPass ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              value={pass} 
              onChange={e => {
                setPass(e.target.value);
                if (error) setError('');
              }}
              disabled={loading}
            />
            <button 
              type="button" 
              className={styles.fpEye} 
              onClick={() => setShowPass(p => !p)}
              disabled={loading}
            >
              <i className={`ti ${showPass ? 'ti-eye-off' : 'ti-eye'}`} />
            </button>
          </div>
        </div>

        <div className={styles.fpField}>
          <label className={styles.fpLabel}>Confirm password</label>
          <div className={styles.fpInputWrap}>
            <i className="ti ti-lock-check" style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'#aaa',fontSize:16}} />
            <input 
              className={styles.fpInput} 
              type="password"
              placeholder="Repeat your password"
              value={confirm} 
              onChange={e => {
                setConfirm(e.target.value);
                if (error) setError('');
              }}
              disabled={loading}
            />
          </div>
          {confirm && pass !== confirm && <span className={styles.fpError}>Passwords do not match</span>}
        </div>

        <button 
          className={styles.fpBtn} 
          onClick={handleResetPassword}
          disabled={otp.some(v => !v) || !pass || pass !== confirm || pass.length < 8 || loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        <p className={styles.fpBack} onClick={() => setStep(1)}>← Back</p>
      </>
    );

    return (
      <>
        <div className={`${styles.fpDoneIcon} mb-3`}><i className="ti ti-circle-check" /></div>
        <h4 className={styles.fpFormTitle}>Password Reset!</h4>
        <p className={styles.fpFormSub}>Your password has been updated. You can now sign in.</p>
        <button className={styles.fpBtn} onClick={() => navigate('/login')}>Back to Sign in</button>
      </>
    );
  };

  return (
    <div className={styles.fpRoot}>

      {/* ===== LEFT PANEL ===== */}
      <aside className={styles.fpPanel}>
        <div className={styles.fpPanelDots} />
        <div className={styles.fpPanelC1} />
        <div className={styles.fpPanelC2} />
        <div className={styles.fpPanelContent}>
          <div className={styles.fpPanelBadge}>
            <i className="ti ti-shield-lock" /> Password Recovery
          </div>
          <h1 className={styles.fpPanelTitle}>Reset your<br />password safely.</h1>
          <p className={styles.fpPanelSub}>Follow the simple steps to recover access to your account.</p>

          <div className={styles.fpTimeline}>
            {timeline.map((t, idx) => (
              <div key={t.n} className={styles.fpTimelineItem}>
                <div className={`${styles.fpTlDot} ${step > t.n ? styles.fpTlDotDone : step === t.n ? styles.fpTlDotActive : ''}`}>
                  {step > t.n ? <i className="ti ti-check" /> : t.n}
                </div>
                {idx < timeline.length - 1 && (
                  <div className={`${styles.fpTlLine} ${step > t.n ? styles.fpTlLineDone : ''}`} />
                )}
                <div className={styles.fpTlText}>
                  <span className={styles.fpTlTitle}>{t.title}</span>
                  <span className={styles.fpTlSub}>{t.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ===== RIGHT FORM ===== */}
      <main className={styles.fpMain}>
        <div className={styles.fpCard}>
          <div className={styles.fpTabs}>
            {STEPS.map(s => (
              <div key={s.id}
                className={`${styles.fpTab} ${step === s.id ? styles.fpTabActive : ''} ${step > s.id ? styles.fpTabDone : ''}`}>
                {s.label}
              </div>
            ))}
          </div>
          <div className={styles.fpFormBody}>
            {renderStep()}
          </div>
        </div>
      </main>
    </div>
  );
}