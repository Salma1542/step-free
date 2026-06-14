import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from '../styles/RegisterPlace.module.css';
import axios from 'axios';
export default function RegisterPlace() {
  const navigate = useNavigate();
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
  setServerError('');

  try {
    const names = data.contactName.trim().split(' ');

    const response = await axios.post(
      'http://localhost:3000/api/auth/register',
      {
        firstName: names[0],
        lastName: names.slice(1).join(' ') || names[0],

        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,

        city: data.city,
        phone: data.phone,

        role: 'placeOwner',
      }
    );

  if (response.data.success) {
  navigate('/otp', {
    state: {
      email: data.email,

      role: 'placeOwner',

      formData: {
        orgName: data.orgName,
        category: data.category,
      }
    }
  });
}
  } catch (err) {
    setServerError(
      err.response?.data?.message || 'Something went wrong'
    );
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
            <i className="ti ti-building" aria-hidden="true" /> Step Free Organizations
          </div>
          <h1 className={styles.panelTitle}>Register your<br />facility today.</h1>
          <p className={styles.panelSub}>
            Join the StepFree network and make your facility accessible to
            thousands of people with disabilities.
          </p>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={`${styles.stepDot} ${styles.stepDotActive}`}>1</div>
              <div className={styles.stepText}>
                <span className={styles.stepTitle}>Account Info</span>
                <span className={styles.stepSub}>Name, email &amp; password</span> 
              </div>
            </div>
            <div className={styles.stepLine} />
            <div className={styles.step}>
              <div className={styles.stepDot}>2</div>
              <div className={styles.stepText}>
                <span className={styles.stepTitle}>Facility Details</span>
                <span className={styles.stepSub}>Location &amp; accessibility features</span>
              </div>
            </div>
          </div>
          <div className={styles.verifiedBox}>
            <i className="ti ti-rosette-discount-check" aria-hidden="true" />
            <p>Verified facilities get a <strong>"Verified Access"</strong> badge on their listing.</p>
          </div>
        </div>
      </aside>

      {/* ===== Right Form ===== */}
      <main className={styles.right}>
        <div className={styles.card}>
          <div className={styles.head}>
            <h2 className={styles.headTitle}>Create Organization Account</h2>
            <p className={styles.headSub}>Step 1 of 2 — Account Information</p>
          </div>

          {serverError && (
            <div className={styles.serverError}>
              <i className="ti ti-alert-circle" aria-hidden="true" /> {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.row}>

              {/* Organization Name */}
              <div className={`${styles.fieldGroup} ${styles.col12}`}>
                <label className={styles.lbl}>Organization / Facility name</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-building" aria-hidden="true"
                     style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:15, color:'#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="e.g. Cairo Medical Center"
                    className={`${styles.inp} ${errors.orgName ? styles.inpErr : ''}`}
                    {...register('orgName', {
                      required: 'Organization name is required',
                      minLength: { value: 3, message: 'Min 3 characters' },
                    })}
                  />
                </div>
                {errors.orgName && <span className={styles.fieldErr}>{errors.orgName.message}</span>}
              </div>

              {/* Contact Person */}
              <div className={`${styles.fieldGroup} ${styles.col6}`}>
                <label className={styles.lbl}>Contact person name</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-user" aria-hidden="true"
                     style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:15, color:'#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="Full name"
                    className={`${styles.inp} ${errors.contactName ? styles.inpErr : ''}`}
                    {...register('contactName', {
                      required: 'Contact name is required',
                      minLength: { value: 3, message: 'Min 3 characters' },
                    })}
                  />
                </div>
                {errors.contactName && <span className={styles.fieldErr}>{errors.contactName.message}</span>}
              </div>

              {/* Category */}
              <div className={`${styles.fieldGroup} ${styles.col6}`}>
                <label className={styles.lbl}>Facility category</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-category" aria-hidden="true"
                     style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:15, color:'#94a3b8' }} />
                  <select
                    className={`${styles.inp} ${errors.category ? styles.inpErr : ''}`}
                    {...register('category', { required: 'Please select a category' })}
                  >
                    <option value="">Select category</option>
                    <option>Restaurants &amp; Cafes</option>
                    <option>Hotels</option>
                    <option>Public Places</option>
                    <option>Hospitals</option>
                    <option>Malls &amp; Shopping</option>
                    <option>Other</option>
                  </select>
                </div>
                {errors.category && <span className={styles.fieldErr}>{errors.category.message}</span>}
              </div>

              {/* Email */}
              <div className={`${styles.fieldGroup} ${styles.col12}`}>
                <label className={styles.lbl}>Email address</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-mail" aria-hidden="true"
                     style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:15, color:'#94a3b8' }} />
                  <input
                    type="email"
                    placeholder="org@example.com"
                    className={`${styles.inp} ${errors.email ? styles.inpErr : ''}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                </div>
                {errors.email && <span className={styles.fieldErr}>{errors.email.message}</span>}
              </div>

              {/* Phone */}
              <div className={`${styles.fieldGroup} ${styles.col6}`}>
                <label className={styles.lbl}>Phone number</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-phone" aria-hidden="true"
                     style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:15, color:'#94a3b8' }} />
                  <input
                    type="tel"
                    placeholder="+20 1xx xxxx xxxx"
                    className={`${styles.inp} ${errors.phone ? styles.inpErr : ''}`}
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[+]?[0-9]{10,15}$/,
                        message: 'Invalid phone number',
                      },
                    })}
                  />
                </div>
                {errors.phone && <span className={styles.fieldErr}>{errors.phone.message}</span>}
              </div>

              {/* City */}
              <div className={`${styles.fieldGroup} ${styles.col6}`}>
                <label className={styles.lbl}>City</label>
                <div className={styles.inputWrap}>
                  <i className="ti ti-building-community" aria-hidden="true"
                     style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:15, color:'#94a3b8' }} />
                  <select
                    className={`${styles.inp} ${errors.city ? styles.inpErr : ''}`}
                    {...register('city', { required: 'Please select your city' })}
                  >
                    <option value="">Select city</option>
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
                {errors.city && <span className={styles.fieldErr}>{errors.city.message}</span>}
              </div>

              {/* Password */}
              <div className={`${styles.fieldGroup} ${styles.col6}`}>
                <label className={styles.lbl}>Password</label>
                <div className={`${styles.inputWrap} ${styles.passWrap}`}>
                  <i className="ti ti-lock" aria-hidden="true"
                     style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:15, color:'#94a3b8' }} />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className={`${styles.inp} ${errors.password ? styles.inpErr : ''}`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Min 8 characters' },
                    })}
                  />
                  <button
                    type="button"
                    className={styles.eye}
                    onClick={() => setShowPass(p => !p)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    <i className={`ti ${showPass ? 'ti-eye-off' : 'ti-eye'}`} />
                  </button>
                </div>
                {errors.password && <span className={styles.fieldErr}>{errors.password.message}</span>}
              </div>

              {/* Confirm Password */}
              <div className={`${styles.fieldGroup} ${styles.col6}`}>
                <label className={styles.lbl}>Confirm password</label>
                <div className={`${styles.inputWrap} ${styles.passWrap}`}>
                  <i className="ti ti-lock-check" aria-hidden="true"
                     style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:15, color:'#94a3b8' }} />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repeat password"
                    className={`${styles.inp} ${errors.confirmPassword ? styles.inpErr : ''}`}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (val) => val === password || 'Passwords do not match',
                    })}
                  />
                  <button
                    type="button"
                    className={styles.eye}
                    onClick={() => setShowConfirm(p => !p)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    <i className={`ti ${showConfirm ? 'ti-eye-off' : 'ti-eye'}`} />
                  </button>
                </div>
                {errors.confirmPassword && <span className={styles.fieldErr}>{errors.confirmPassword.message}</span>}
              </div>

            </div>{/* end .row */}

            <div className={styles.divider} />

            {/* Terms */}
            <label className={styles.terms}>
              <input
                type="checkbox"
                {...register('terms', { required: 'You must agree to the terms' })}
              />
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>
            {errors.terms && <span className={styles.fieldErr}>{errors.terms.message}</span>}

            <button type="submit" className={styles.btn} disabled={isSubmitting}>
              {isSubmitting ? (
                <><i className="ti ti-loader-2" aria-hidden="true" /> Creating account...</>
              ) : (
                <>Next Step <i className="ti ti-arrow-right" aria-hidden="true" /></>
              )}
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