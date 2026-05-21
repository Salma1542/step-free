import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/DriverRegisterAuth.module.css';

export default function DriverRegisterAuth() {
  const navigate = useNavigate();
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pass, setPass]               = useState('');
  const [confirm, setConfirm]         = useState('');

  const handleSubmit = (e) => {
  e.preventDefault();
  navigate('/driver-form');  
};

  return (
    <div className={styles.root}>

      {/* ===== Left Panel ===== */}
      <aside className={styles.panel}>
        <div className={styles.dots} />
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.panelContent}>
          <div className={styles.badge}>
            <i className="ti ti-steering-wheel" /> Step Free Drivers
          </div>
          <h1 className={styles.panelTitle}>Join the Driver<br />Network Today.</h1>
          <p className={styles.panelSub}>
            Help people with disabilities move freely. Register now and start earning.
          </p>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={`${styles.stepDot} ${styles.stepDotActive}`}>1</div>
              <div className={styles.stepText}>
                <span className={styles.stepTitle}>Personal Info</span>
                <span className={styles.stepSub}>Name, email & password</span>
              </div>
            </div>
            <div className={styles.stepLine} />
            <div className={styles.step}>
              <div className={styles.stepDot}>2</div>
              <div className={styles.stepText}>
                <span className={styles.stepTitle}>Vehicle & Documents</span>
                <span className={styles.stepSub}>Car details & verification</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ===== Right Form ===== */}
      <main className={styles.right}>
        <div className={styles.card}>
          <div className={styles.head}>
            <h2 className={styles.headTitle}>Create Driver Account</h2>
            <p className={styles.headSub}>Step 1 of 2 — Personal Information</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className={styles.label}>First name</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-user" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input type="text" className={styles.input} placeholder="John" required />
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>Last name</label>
                <div className={styles.inputWrap}>
                  <input type="text" className={`${styles.input} ${styles.noIcon}`} placeholder="Doe" required />
                </div>
              </div>

              <div className="col-12">
                <label className={styles.label}>Email address</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-mail" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input type="email" className={styles.input} placeholder="you@example.com" required />
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>Phone number</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-phone" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input type="tel" className={styles.input} placeholder="+20 1xx xxxx xxxx" required />
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>Gender</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-gender-bigender" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <select className={styles.input} required>
                    <option value="" disabled>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>Date of birth</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-calendar" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input type="date" className={styles.input} required />
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>City</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-building-community" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <select className={styles.input} required>
                    <option value="" disabled>Select city</option>
                    <option>Cairo</option>
                    <option>Alexandria</option>
                    <option>Giza</option>
                    <option>Menoufia</option>
                    <option>Mansoura</option>
                    <option>Tanta</option>
                    <option>Port Said</option>
                    <option>Suez</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>National ID</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-id-badge" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input type="text" className={styles.input} placeholder="14-digit national ID" required />
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>Password</label>
                <div className={`${styles.inputWrap} ${styles.passWrap}`}>
                  <i className="ti ti-lock" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input
                    type={showPass ? 'text' : 'password'}
                    className={styles.input}
                    placeholder="Min. 8 characters"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    required
                  />
                  <button type="button" className={styles.eye} onClick={() => setShowPass(p => !p)}>
                    <i className={`ti ${showPass ? 'ti-eye-off' : 'ti-eye'}`} />
                  </button>
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>Confirm password</label>
                <div className={`${styles.inputWrap} ${styles.passWrap}`}>
                  <i className="ti ti-lock-check" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    className={styles.input}
                    placeholder="Repeat password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                  />
                  <button type="button" className={styles.eye} onClick={() => setShowConfirm(p => !p)}>
                    <i className={`ti ${showConfirm ? 'ti-eye-off' : 'ti-eye'}`} />
                  </button>
                </div>
                {confirm && pass !== confirm && (
                  <span className={styles.error}>Passwords do not match</span>
                )}
              </div>

            </div>

            <div className={styles.divider} />

            <label className={styles.terms}>
              <input type="checkbox" required />
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>

            <button
              type="submit"
              className={styles.btn}
              disabled={!pass || pass !== confirm || pass.length < 8}
            >
              Next Step <i className="ti ti-arrow-right" />
            </button>

          </form>

          <div className={styles.footer}>
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </main>
    </div>
  );
}