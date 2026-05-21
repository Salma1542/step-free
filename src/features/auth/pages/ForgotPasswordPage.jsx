import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ForgotPassword.module.css';

const STEPS = [
  { id: 1, label: 'Step 1' },
  { id: 2, label: 'Step 2' },
  { id: 3, label: 'Step 3' },
  { id: 4, label: 'Done ✓' },
];

const timeline = [
  { n: 1, title: 'Enter your email',   sub: "We'll send a verification code" },
  { n: 2, title: 'Verify the code',    sub: 'Enter the 6-digit OTP sent to you' },
  { n: 3, title: 'Set new password',   sub: 'Choose a strong new password' },
];

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep]         = useState(1);
  const [email, setEmail]       = useState('');
  const [pass, setPass]         = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPass, setShowPass] = useState(false);

  const next = () => setStep(s => Math.min(s + 1, 4));

  const renderStep = () => {
    if (step === 1) return (
      <>
        <div className={`${styles.fpStepIcon} mb-3`}><i className="ti ti-mail" /></div>
        <h4 className={styles.fpFormTitle}>Forgot your password?</h4>
        <p className={styles.fpFormSub}>No worries! Enter your email and we'll send you a verification code.</p>
        <div className={styles.fpField}>
          <label className={styles.fpLabel}>Email address</label>
          <div className={styles.fpInputWrap}>
            <i className="ti ti-mail" style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'#aaa',fontSize:16}} />
            <input className={styles.fpInput} type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>
        <button className={styles.fpBtn} onClick={next} disabled={!email}>Send Code</button>
        <p className={styles.fpBack} onClick={() => navigate('/login')}>Back to Sign in</p>
      </>
    );

    if (step === 2) return (
      // بيروح على صفحة OTP منفصلة
      navigate('/otp', { state: { email } })
    );

    if (step === 3) return (
      <>
        <div className={`${styles.fpStepIcon} mb-3`}><i className="ti ti-lock-open" /></div>
        <h4 className={styles.fpFormTitle}>Set a new password</h4>
        <p className={styles.fpFormSub}>Choose a strong password with at least 8 characters.</p>
        <div className={styles.fpField}>
          <label className={styles.fpLabel}>New password</label>
          <div className={styles.fpInputWrap}>
            <i className="ti ti-lock" style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'#aaa',fontSize:16}} />
            <input className={`${styles.fpInput} ${styles.fpInputPaddedRight}`}
              type={showPass ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              value={pass} onChange={e => setPass(e.target.value)} />
            <button type="button" className={styles.fpEye} onClick={() => setShowPass(p => !p)}>
              <i className={`ti ${showPass ? 'ti-eye-off' : 'ti-eye'}`} />
            </button>
          </div>
        </div>
        <div className={styles.fpField}>
          <label className={styles.fpLabel}>Confirm password</label>
          <div className={styles.fpInputWrap}>
            <i className="ti ti-lock-check" style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'#aaa',fontSize:16}} />
            <input className={styles.fpInput} type="password"
              placeholder="Repeat your password"
              value={confirm} onChange={e => setConfirm(e.target.value)} />
          </div>
          {confirm && pass !== confirm && <span className={styles.fpError}>Passwords do not match</span>}
        </div>
        <button className={styles.fpBtn} onClick={next}
          disabled={!pass || pass !== confirm || pass.length < 8}>
          Reset Password
        </button>
        <p className={styles.fpBack} onClick={() => setStep(2)}>← Back</p>
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