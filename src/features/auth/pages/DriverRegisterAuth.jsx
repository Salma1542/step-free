import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/DriverRegisterAuth.module.css';

export default function DriverRegisterAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const role = location.state?.role || 'driver';
  console.log(location.state);

  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    city: '',
    nationalId: '',
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
    if (!formData.phone.trim()) {
      setError('Phone number is required');
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
    if (!formData.city) {
      setError('City is required');
      return false;
    }
    if (!formData.nationalId.trim() || formData.nationalId.length !== 14) {
      setError('National ID must be 14 digits');
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
  'http://localhost:3000/api/auth/register',
  {
    ...formData,
    role,
  }
);

      if (response.data.success) {
        setSuccess('Account created successfully! Verify your email...');
        setTimeout(() => {
          navigate('/otp', {
            state: {
              email: formData.email,
              role: role,
              nextStep: '/driver-form',
            },
          });
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
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

          {error && (
            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
              ✕ {error}
            </div>
          )}

          {success && (
            <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className={styles.label}>First name</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-user" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input 
                    type="text" 
                    name="firstName"
                    className={styles.input} 
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={loading}
                    required 
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>Last name</label>
                <div className={styles.inputWrap}>
                  <input 
                    type="text" 
                    name="lastName"
                    className={`${styles.input} ${styles.noIcon}`} 
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={loading}
                    required 
                  />
                </div>
              </div>

              <div className="col-12">
                <label className={styles.label}>Email address</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-mail" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input 
                    type="email" 
                    name="email"
                    className={styles.input} 
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    required 
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>Phone number</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-phone" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input 
                    type="tel" 
                    name="phone"
                    className={styles.input} 
                    placeholder="+20 1xx xxxx xxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    required 
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>Gender</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-gender-bigender" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <select 
                    name="gender"
                    className={styles.input}
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>Date of birth</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-calendar" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input 
                    type="date" 
                    name="dateOfBirth"
                    className={styles.input}
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    disabled={loading}
                    required 
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>City</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-building-community" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <select 
                    name="city"
                    className={styles.input}
                    value={formData.city}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">Select city</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Giza">Giza</option>
                    <option value="Menoufia">Menoufia</option>
                    <option value="Luxor">Luxor</option>
                    <option value="Aswan">Aswan</option>
                    <option value="Mansoura">Mansoura</option>
                    <option value="Tanta">Tanta</option>
                    <option value="Port Said">Port Said</option>
                    <option value="Suez">Suez</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>National ID</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-id-badge" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input 
                    type="text" 
                    name="nationalId"
                    className={styles.input} 
                    placeholder="14-digit national ID"
                    value={formData.nationalId}
                    onChange={handleChange}
                    disabled={loading}
                    required 
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className={styles.label}>Password</label>
                <div className={`${styles.inputWrap} ${styles.passWrap}`}>
                  <i className="ti ti-lock" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                  <input
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    className={styles.input}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                  <button 
                    type="button" 
                    className={styles.eye} 
                    onClick={() => setShowPass(p => !p)}
                    disabled={loading}
                  >
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
                    name="confirmPassword"
                    className={styles.input}
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                  <button 
                    type="button" 
                    className={styles.eye} 
                    onClick={() => setShowConfirm(p => !p)}
                    disabled={loading}
                  >
                    <i className={`ti ${showConfirm ? 'ti-eye-off' : 'ti-eye'}`} />
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <span className={styles.error}>Passwords do not match</span>
                )}
              </div>

            </div>

            <div className={styles.divider} />

            <label className={styles.terms}>
              <input type="checkbox" required disabled={loading} />
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>

            <button
              type="submit"
              className={styles.btn}
              disabled={!formData.password || formData.password !== formData.confirmPassword || formData.password.length < 8 || loading}
            >
              {loading ? 'Creating account...' : 'Next Step'} <i className="ti ti-arrow-right" />
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