import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/ResetPassword.module.css';

export default function ResetPassword() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const email     = location.state?.email || '';
  const [pass, setPass]         = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPass, setShowPass] = useState(false);
  const [done, setDone]         = useState(false);

  if (done) return (
    <div className={styles.rpRoot}>
      <aside className={styles.rpPanel}>
        <div className={styles.rpPanelDots} />
        <div className={styles.rpPanelC1} />
        <div className={styles.rpPanelC2} />
        <div className={styles.rpPanelContent}>
          <div className={styles.rpPanelBadge}>
            <i className="ti ti-shield-lock" /> Password Recovery
          </div>
          <h1 className={styles.rpPanelTitle}>Reset your<br />password safely.</h1>
          <p className={styles.rpPanelSub}>Your password has been updated successfully.</p>
        </div>
      </aside>
      <main className={styles.rpMain}>
        <div className={styles.rpCard}>
          <div className={`${styles.rpDoneIcon} mb-3`}>
            <i className="ti ti-circle-check" />
          </div>
          <h4 className={styles.rpFormTitle}>Password Reset!</h4>
          <p className={styles.rpFormSub}>
            Your password has been successfully updated. You can now sign in with your new password.
          </p>
          <button className={styles.rpBtn} onClick={() => navigate('/login')}>
            Back to Sign in
          </button>
        </div>
      </main>
    </div>
  );

  return (
    <div className={styles.rpRoot}>

      {/* ===== LEFT PANEL ===== */}
      <aside className={styles.rpPanel}>
        <div className={styles.rpPanelDots} />
        <div className={styles.rpPanelC1} />
        <div className={styles.rpPanelC2} />
        <div className={styles.rpPanelContent}>
          <div className={styles.rpPanelBadge}>
            <i className="ti ti-shield-lock" /> Password Recovery
          </div>
          <h1 className={styles.rpPanelTitle}>Reset your<br />password safely.</h1>
          <p className={styles.rpPanelSub}>
            Choose a strong new password to secure your account.
          </p>
          <div className={styles.rpTips}>
            <div className={styles.rpTip}>
              <div className={styles.rpTipDot}><i className="ti ti-check" /></div>
              <span>At least 8 characters</span>
            </div>
            <div className={styles.rpTip}>
              <div className={styles.rpTipDot}><i className="ti ti-check" /></div>
              <span>Mix of letters and numbers</span>
            </div>
            <div className={styles.rpTip}>
              <div className={styles.rpTipDot}><i className="ti ti-check" /></div>
              <span>At least one special character</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ===== RIGHT FORM ===== */}
      <main className={styles.rpMain}>
        <div className={styles.rpCard}>
          <div className={`${styles.rpStepIcon} mb-3`}>
            <i className="ti ti-lock-open" />
          </div>
          <h4 className={styles.rpFormTitle}>Set a new password</h4>
          <p className={styles.rpFormSub}>
            Choose a strong password with at least 8 characters.
          </p>

          <div className={styles.rpField}>
            <label className={styles.rpLabel}>New password</label>
            <div className={styles.rpInputWrap}>
              <i className="ti ti-lock" style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'#aaa',fontSize:16}} />
              <input
                className={`${styles.rpInput} ${styles.rpInputPaddedRight}`}
                type={showPass ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={pass}
                onChange={e => setPass(e.target.value)}
              />
              <button type="button" className={styles.rpEye} onClick={() => setShowPass(p => !p)}>
                <i className={`ti ${showPass ? 'ti-eye-off' : 'ti-eye'}`} />
              </button>
            </div>
          </div>

          <div className={styles.rpField}>
            <label className={styles.rpLabel}>Confirm password</label>
            <div className={styles.rpInputWrap}>
              <i className="ti ti-lock-check" style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'#aaa',fontSize:16}} />
              <input
                className={styles.rpInput}
                type="password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
              />
            </div>
            {confirm && pass !== confirm && (
              <span className={styles.rpError}>Passwords do not match</span>
            )}
          </div>

          <button
            className={styles.rpBtn}
            onClick={() => setDone(true)}
            disabled={!pass || pass !== confirm || pass.length < 8}
          >
            Reset Password
          </button>

          <p className={styles.rpBack} onClick={() => navigate('/otp', { state: { email } })}>
            ← Back
          </p>
        </div>
      </main>
    </div>
  );
}