import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/UserRegister.module.css';

export default function UserRegister() {
  const navigate = useNavigate();
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Email is invalid');
      return false;
    }
    if (!formData.city) {
      setError('City is required');
      return false;
    }
    if (!formData.gender) {
      setError('Gender is required');
      return false;
    }
    if (!formData.dateOfBirth) {
      setError('Date of birth is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );

      if (response.data.success) {
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate("/otp", {
            state: {
              email: formData.email,
            },
          });
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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

          {success && (
            <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
              ✓ {success}
            </div>
          )}

          {error && (
            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
              ✕ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.urGrid}>

              <div className={styles.urField}>
                <label>First name</label>
                <div className={styles.urInputWrap}>
                  <i className="ti ti-user" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={styles.urField}>
                <label>Last name</label>
                <div className={`${styles.urInputWrap} ${styles.urNoIcon}`}>
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={`${styles.urField} ${styles.urFull}`}>
                <label>Email address</label>
                <div className={styles.urInputWrap}>
                  <i className="ti ti-mail" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={styles.urField}>
                <label>Gender</label>
                <div className={styles.urInputWrap}>
                  <i className="ti ti-users" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.urField}>
                <label>Date of Birth</label>
                <div className={styles.urInputWrap}>
                  <i className="ti ti-calendar" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <input 
                    type="date" 
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={`${styles.urField} ${styles.urFull}`}>
                <label>Phone number <span className={styles.urOptional}>(optional)</span></label>
                <div className={styles.urInputWrap}>
                  <i className="ti ti-phone" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+20 1xx xxxx xxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={`${styles.urField} ${styles.urFull}`}>
                <label>City</label>
                <div className={styles.urInputWrap}>
                  <i className="ti ti-building-community" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <select 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Select your city</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Giza">Giza</option>
                    <option value="Menoufia">Menoufia</option>
                    <option value="Luxor">Luxor</option>
                    <option value="Aswan">Aswan</option>
                    <option value="Port Said">Port Said</option>
                    <option value="Suez">Suez</option>
                    <option value="Mansoura">Mansoura</option>
                    <option value="Tanta">Tanta</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.urField}>
                <label>Password</label>
                <div className={`${styles.urInputWrap} ${styles.urPass}`}>
                  <i className="ti ti-lock" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <input 
                    type={showPass1 ? 'text' : 'password'} 
                    name="password"
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <button 
                    type="button" 
                    className={styles.urEye} 
                    onClick={() => setShowPass1(!showPass1)}
                    disabled={loading}
                  >
                    <i className={`ti ${showPass1 ? 'ti-eye-off' : 'ti-eye'}`} />
                  </button>
                </div>
              </div>

              <div className={styles.urField}>
                <label>Confirm password</label>
                <div className={`${styles.urInputWrap} ${styles.urPass}`}>
                  <i className="ti ti-lock" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} aria-hidden="true" />
                  <input 
                    type={showPass2 ? 'text' : 'password'} 
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <button 
                    type="button" 
                    className={styles.urEye} 
                    onClick={() => setShowPass2(!showPass2)}
                    disabled={loading}
                  >
                    <i className={`ti ${showPass2 ? 'ti-eye-off' : 'ti-eye'}`} />
                  </button>
                </div>
              </div>

            </div>

            <div className={styles.urDivider} />

            <label className={styles.urTerms}>
              <input type="checkbox" required disabled={loading} />
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>

            <button type="submit" className={styles.urSubmit} disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
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