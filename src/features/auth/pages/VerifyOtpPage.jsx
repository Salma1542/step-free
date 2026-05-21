import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpInput from '../../../components/form/otpinput/OtpInput';
import styles from '../styles/ForgotPassword.module.css'; // تشارك نفس استايل اللوحة الجانبية والكارد

const STEPS = [
  { id: 1, label: 'Step 1' },
  { id: 2, label: 'Step 2' },
  { id: 3, label: 'Step 3' },
  { id: 4, label: 'Done ✓' },
];

const timeline = [
  { n: 1, title: 'Enter your email',  sub: "We'll send a verification code" },
  { n: 2, title: 'Verify the code',   sub: 'Enter the 4-digit OTP sent to you' },
  { n: 3, title: 'Set new password',  sub: 'Choose a strong new password' },
];

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);

  // هنا نحدد أننا في الخطوة الثانية ثابتة
  const currentStep = 2; 

  const handleVerify = () => {
    // هنا تضع الـ Logic الخاص بالتأكد من الكود مع السيرفر
    // بعد النجاح، ننتقل لصفحة تعيين كلمة المرور الجديدة (التي سنفصلها أو ندمجها لاحقاً)
    navigate('/reset-password'); 
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
                <div className={`${styles.fpTlDot} ${currentStep > t.n ? styles.fpTlDotDone : currentStep === t.n ? styles.fpTlDotActive : ''}`}>
                  {currentStep > t.n ? <i className="ti ti-check" /> : t.n}
                </div>
                {idx < timeline.length - 1 && (
                  <div className={`${styles.fpTlLine} ${currentStep > t.n ? styles.fpTlLineDone : ''}`} />
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
                className={`${styles.fpTab} ${currentStep === s.id ? styles.fpTabActive : ''} ${currentStep > s.id ? styles.fpTabDone : ''}`}>
                {s.label}
              </div>
            ))}
          </div>
          <div className={styles.fpFormBody}>
            <div className={styles.fpStepIcon}><i className="ti ti-device-mobile-message" /></div>
            <h4 className={styles.fpFormTitle}>Check your email</h4>
            <p className={styles.fpFormSub}>We sent a 4-digit code to your email. Enter it below.</p>
            
            <OtpInput otp={otp} onChange={setOtp} />
            
            <button className={styles.fpBtn} onClick={handleVerify} disabled={otp.some(v => !v)}>
              Verify Code
            </button>
            <p className={styles.fpBack} onClick={() => navigate('/forgot-password')}>← Back</p>
          </div>
        </div>
      </main>
    </div>
  );
}