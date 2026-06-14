import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './PasswordInput.module.css';

export default function PasswordInput({ showPassword, setShowPassword, password, onChange, disabled }) {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between mb-1">
        <label className="form-label fw-semibold" htmlFor="password">Password</label>
        <Link to="/forgetPassword" className={`text-decoration-none shadow-none ${styles.forgotLink}`}>
          Forgot Password?
        </Link>
      </div>
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          className={`form-control py-2 border-end-0 shadow-none ${styles.customInput}`}
          placeholder="••••••••"
          value={password || ''}
          onChange={onChange}
          disabled={disabled}
        />
        <span
          className={`input-group-text bg-transparent border-start-0 text-muted ${styles.toggleIcon}`}
          onClick={() => setShowPassword(!showPassword)}
          style={{ cursor: 'pointer' }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </div>
  );
}