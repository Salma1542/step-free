import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/UserRegister.module.css';

export default function UserRegister() {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  return (
    <div className={styles.urRoot}>

      {/* ===== Left Panel ===== */}
      <div className={styles.urPanel}>
        <div className={styles.urDots} />
        <div className={styles.urCircle1} />
        <div className={styles.urCircle2} />
        <div className={styles.urPanelContent}>
          <div className={styles.urBadge}>
            <i className="ti ti-wheelchair" aria-hidden="true" /> Step Free
          </div>
          <h1 className={styles.urPanelTitle}>
            Your accessibility<br />journey starts here.
          </h1>
          <p className={styles.urPanelSub}>
            Create your account and start finding places equipped for your needs —
            ramps, elevators, wide doors and more.
          </p>
          <div className={styles.urPerks}>
            <div className={styles.urPerk}>
              <div className={styles.urPerkDot}><i className="ti ti-map-search" aria-hidden="true" /></div>
              <span>Search by accessibility features</span>
            </div>
            <div className={styles.urPerk}>
              <div className={styles.urPerkDot}><i className="ti ti-navigation" aria-hidden="true" /></div>
              <span>Get directions to accessible entrances</span>
            </div>
            <div className={styles.urPerk}>
              <div className={styles.urPerkDot}><i className="ti ti-star" aria-hidden="true" /></div>
              <span>Save and review your favourite spots</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Right Panel ===== */}
      <div className={styles.urRight}>
        <div className={styles.urFormWrap}>
          <div className={styles.urHead}>
            <h2 className={styles.urHeadTitle}>Create your account</h2>
            <p className={styles.urHeadSub}>Fill in your details to get started</p>
          </div>

          <form>
            <div className={styles.urGrid}>

              <div className={styles.urField}>
                <label>First name</label>
                <div className={styles.urInputWrap}>
                  <i className="ti ti-user" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <input type="text" placeholder="John" />
                </div>
              </div>

              <div className={styles.urField}>
                <label>Last name</label>
                <div className={`${styles.urInputWrap} ${styles.urNoIcon}`}>
                  <input type="text" placeholder="Doe" />
                </div>
              </div>

              <div className={`${styles.urField} ${styles.urFull}`}>
                <label>Email address</label>
                <div className={styles.urInputWrap}>
                  <i className="ti ti-mail" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <input type="email" placeholder="you@example.com" />
                </div>
              </div>

              <div className={`${styles.urField} ${styles.urFull}`}>
                <label>Phone number <span className={styles.urOptional}>(optional)</span></label>
                <div className={styles.urInputWrap}>
                  <i className="ti ti-phone" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <input type="tel" placeholder="+20 1xx xxxx xxxx" />
                </div>
              </div>

              <div className={`${styles.urField} ${styles.urFull}`}>
                <label>City</label>
                <div className={styles.urInputWrap}>
                  <i className="ti ti-building-community" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <select defaultValue="">
                    <option value="" disabled>Select your city</option>
                    <option>Cairo</option>
                    <option>Alexandria</option>
                    <option>Giza</option>
                    <option>Menoufia</option>
                    <option>Luxor</option>
                    <option>Aswan</option>
                    <option>Port Said</option>
                    <option>Suez</option>
                    <option>Mansoura</option>
                    <option>Tanta</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.urField}>
                <label>Password</label>
                <div className={`${styles.urInputWrap} ${styles.urPass}`}>
                  <i className="ti ti-lock" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <input type={showPass1 ? 'text' : 'password'} placeholder="Min. 8 characters" />
                  <button type="button" className={styles.urEye} onClick={() => setShowPass1(!showPass1)}>
                    <i className={`ti ${showPass1 ? 'ti-eye-off' : 'ti-eye'}`} />
                  </button>
                </div>
              </div>

              <div className={styles.urField}>
                <label>Confirm password</label>
                <div className={`${styles.urInputWrap} ${styles.urPass}`}>
                  <i className="ti ti-lock" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <input type={showPass2 ? 'text' : 'password'} placeholder="Repeat password" />
                  <button type="button" className={styles.urEye} onClick={() => setShowPass2(!showPass2)}>
                    <i className={`ti ${showPass2 ? 'ti-eye-off' : 'ti-eye'}`} />
                  </button>
                </div>
              </div>

            </div>

            <div className={styles.urDivider} />

            <label className={styles.urTerms}>
              <input type="checkbox" />
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>

            <button type="submit" className={styles.urSubmit}>
              Create account
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </button>
          </form>

          <div className={styles.urFooter}>
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>

    </div>
  );
}