import { useState } from 'react';
import styles from './AdminSettingsPage.module.css';

const SettingsSection = ({ icon, title, description, children, active = true }) => (
  <div className={styles.section}>
    <div className={styles.sectionHeader}>
      <div className={styles.headerContent}>
        <i className={`bi ${icon} ${styles.sectionIcon}`} />
        <div>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <p className={styles.sectionDesc}>{description}</p>
        </div>
      </div>
    </div>
    {active && <div className={styles.sectionContent}>{children}</div>}
  </div>
);

const SettingItem = ({ label, description, children, type = 'normal' }) => (
  <div className={`${styles.settingItem} ${styles[`type${type.charAt(0).toUpperCase() + type.slice(1)}`]}`}>
    <div className={styles.settingLabel}>
      <label>{label}</label>
      {description && <p className={styles.settingDesc}>{description}</p>}
    </div>
    <div className={styles.settingControl}>{children}</div>
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <label className={styles.toggleLabel}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={styles.toggleInput}
    />
    <span className={styles.toggleSwitch} />
  </label>
);

const ColorInput = ({ value, onChange }) => (
  <div className={styles.colorInput}>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.colorField}
    />
    <span className={styles.colorValue}>{value}</span>
  </div>
);

const Select = ({ value, onChange, options }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} className={styles.select}>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

const Input = ({ type = 'text', value, onChange, placeholder }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={styles.input}
  />
);

const Button = ({ children, variant = 'primary', onClick, disabled = false }) => (
  <button
    className={`${styles.button} ${styles[`btn${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default function AdminSettingsPage() {
  // General settings
  const [siteName, setSiteName] = useState('Step Free');
  const [siteEmail, setSiteEmail] = useState('admin@stepfree.com');
  const [sitePhone, setSitePhone] = useState('+966 50 000 0000');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Site settings
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('Asia/Riyadh');
  const [currency, setCurrency] = useState('SAR');
  const [itemsPerPage, setItemsPerPage] = useState('20');

  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [maxLoginAttempts, setMaxLoginAttempts] = useState('5');
  const [passwordExpiry, setPasswordExpiry] = useState('90');

  // Email settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [emailHost, setEmailHost] = useState('smtp.gmail.com');
  const [emailPort, setEmailPort] = useState('587');
  const [emailUsername, setEmailUsername] = useState('');

  // Interface settings
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#667eea');
  const [accentColor, setAccentColor] = useState('#764ba2');

  // Backup settings
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [lastBackup, setLastBackup] = useState(new Date().toLocaleDateString('en-US'));

  // API settings
  const [apiRateLimit, setApiRateLimit] = useState('1000');
  const [enableAPICaching, setEnableAPICaching] = useState(true);
  const [cacheExpiry, setCacheExpiry] = useState('3600');

  // Loading states
  const [loadingBackup, setLoadingBackup] = useState(false);
  const [loadingEmailTest, setLoadingEmailTest] = useState(false);

  const handleSaveSettings = (section) => {
    console.log(`Saving ${section} settings...`);
    alert(`${section} settings saved successfully`);
  };

  const handleTestEmail = async () => {
    setLoadingEmailTest(true);
    try {
      console.log('Sending test email...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Test email sent successfully to ${emailUsername}`);
    } catch {
      alert('Failed to send test email');
    } finally {
      setLoadingEmailTest(false);
    }
  };

  const handleBackupNow = async () => {
    setLoadingBackup(true);
    try {
      console.log('Creating backup...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      const today = new Date().toLocaleDateString('en-US');
      setLastBackup(today);
      alert('Backup created successfully');
    } catch {
      alert('Failed to create backup');
    } finally {
      setLoadingBackup(false);
    }
  };

  const handleDeleteAllData = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete ALL data? This action cannot be undone.'
    );
    if (confirmed) {
      const doubleConfirm = window.confirm(
        'This will permanently delete all data. Type "DELETE" to confirm'
      );
      if (doubleConfirm) {
        console.log('Deleting all data...');
        alert('All data has been deleted');
      }
    }
  };

  const handleResetSystem = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset the system? This action cannot be undone.'
    );
    if (confirmed) {
      const doubleConfirm = window.confirm(
        'This will reset all system settings to default. Type "RESET" to confirm'
      );
      if (doubleConfirm) {
        console.log('Resetting system...');
        alert('System has been reset to default settings');
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>Manage all system settings and configurations</p>
        </div>
      </div>

      {/* Settings */}
      <div className={styles.contentWrapper}>
        {/* General Settings */}
        <SettingsSection
          icon="bi-gear-fill"
          title="General Settings"
          description="Basic information about the site"
        >
          <SettingItem label="Site Name" description="The name that will appear in the page header">
            <Input value={siteName} onChange={setSiteName} />
          </SettingItem>
          
          <SettingItem label="Email Address" description="Email for communication">
            <Input type="email" value={siteEmail} onChange={setSiteEmail} />
          </SettingItem>
          
          <SettingItem label="Phone Number" description="Phone number for technical support">
            <Input value={sitePhone} onChange={setSitePhone} />
          </SettingItem>
          
          <SettingItem label="Maintenance Mode" description="Put the site temporarily on maintenance">
            <Toggle checked={maintenanceMode} onChange={setMaintenanceMode} />
          </SettingItem>

          <div className={styles.buttonGroup}>
            <Button onClick={() => handleSaveSettings('General')}>
              <i className="bi bi-check-circle" /> Save Changes
            </Button>
          </div>
        </SettingsSection>

        {/* Site Settings */}
        <SettingsSection
          icon="bi-globe"
          title="Site Settings"
          description="Customize basic site behavior"
        >
          <SettingItem label="Language">
            <Select value={language} onChange={setLanguage} options={[
              { value: 'en', label: 'English' },
              { value: 'ar', label: 'العربية' },
            ]} />
          </SettingItem>
          
          <SettingItem label="Timezone">
            <Select value={timezone} onChange={setTimezone} options={[
              { value: 'Asia/Riyadh', label: 'Riyadh' },
              { value: 'Asia/Dubai', label: 'Dubai' },
              { value: 'Europe/London', label: 'London' },
            ]} />
          </SettingItem>
          
          <SettingItem label="Currency">
            <Select value={currency} onChange={setCurrency} options={[
              { value: 'SAR', label: 'Saudi Riyal' },
              { value: 'AED', label: 'UAE Dirham' },
              { value: 'USD', label: 'US Dollar' },
            ]} />
          </SettingItem>
          
          <SettingItem label="Items Per Page">
            <Input type="number" value={itemsPerPage} onChange={setItemsPerPage} />
          </SettingItem>

          <div className={styles.buttonGroup}>
            <Button onClick={() => handleSaveSettings('Site')}>
              <i className="bi bi-check-circle" /> Save Changes
            </Button>
          </div>
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection
          icon="bi-shield-lock-fill"
          title="Security Settings"
          description="System and account protection"
        >
          <SettingItem label="Two-Factor Authentication" description="Enable two-step verification">
            <Toggle checked={twoFactorAuth} onChange={setTwoFactorAuth} />
          </SettingItem>
          
          <SettingItem label="Session Timeout (Minutes)">
            <Input type="number" value={sessionTimeout} onChange={setSessionTimeout} />
          </SettingItem>
          
          <SettingItem label="Maximum Login Attempts">
            <Input type="number" value={maxLoginAttempts} onChange={setMaxLoginAttempts} />
          </SettingItem>
          
          <SettingItem label="Password Expiry (Days)">
            <Input type="number" value={passwordExpiry} onChange={setPasswordExpiry} />
          </SettingItem>

          <div className={styles.buttonGroup}>
            <Button onClick={() => handleSaveSettings('Security')}>
              <i className="bi bi-check-circle" /> Save Changes
            </Button>
          </div>
        </SettingsSection>

        {/* Email Settings */}
        <SettingsSection
          icon="bi-envelope-fill"
          title="Email Settings"
          description="Email messaging configuration"
        >
          <SettingItem label="Enable Email Notifications">
            <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
          </SettingItem>
          
          <SettingItem label="Mail Server">
            <Input value={emailHost} onChange={setEmailHost} />
          </SettingItem>
          
          <SettingItem label="SMTP Port">
            <Input type="number" value={emailPort} onChange={setEmailPort} />
          </SettingItem>
          
          <SettingItem label="Username">
            <Input type="email" value={emailUsername} onChange={setEmailUsername} />
          </SettingItem>

          <div className={styles.buttonGroup}>
            <Button onClick={() => handleSaveSettings('Email')}>
              <i className="bi bi-check-circle" /> Save Changes
            </Button>
            <Button variant="secondary" onClick={handleTestEmail} disabled={loadingEmailTest}>
              <i className="bi bi-send" /> {loadingEmailTest ? 'Sending...' : 'Test Send'}
            </Button>
          </div>
        </SettingsSection>

        {/* Interface Settings */}
        <SettingsSection
          icon="bi-palette-fill"
          title="Interface Settings"
          description="Customize system appearance"
        >
          <SettingItem label="Theme">
            <Select value={theme} onChange={setTheme} options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'auto', label: 'Auto' },
            ]} />
          </SettingItem>
          
          <SettingItem label="Primary Color">
            <ColorInput value={primaryColor} onChange={setPrimaryColor} />
          </SettingItem>
          
          <SettingItem label="Accent Color">
            <ColorInput value={accentColor} onChange={setAccentColor} />
          </SettingItem>

          <div className={styles.buttonGroup}>
            <Button onClick={() => handleSaveSettings('Interface')}>
              <i className="bi bi-check-circle" /> Save Changes
            </Button>
          </div>
        </SettingsSection>

        {/* Backup Settings */}
        <SettingsSection
          icon="bi-cloud-arrow-down-fill"
          title="Backup Settings"
          description="System data protection"
        >
          <SettingItem label="Automatic Backup">
            <Toggle checked={autoBackup} onChange={setAutoBackup} />
          </SettingItem>
          
          <SettingItem label="Backup Frequency">
            <Select value={backupFrequency} onChange={setBackupFrequency} options={[
              { value: 'hourly', label: 'Hourly' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ]} />
          </SettingItem>
          
          <SettingItem label="Last Backup" type="readonly">
            <div className={styles.readonlyValue}>{lastBackup}</div>
          </SettingItem>

          <div className={styles.buttonGroup}>
            <Button onClick={() => handleSaveSettings('Backup')}>
              <i className="bi bi-check-circle" /> Save Changes
            </Button>
            <Button variant="secondary" onClick={handleBackupNow} disabled={loadingBackup}>
              <i className="bi bi-arrow-clockwise" /> {loadingBackup ? 'Creating...' : 'Backup Now'}
            </Button>
          </div>
        </SettingsSection>

        {/* API Settings */}
        <SettingsSection
          icon="bi-plug-fill"
          title="API Settings"
          description="API configuration"
        >
          <SettingItem label="Rate Limit (Requests/Hour)">
            <Input type="number" value={apiRateLimit} onChange={setApiRateLimit} />
          </SettingItem>
          
          <SettingItem label="Enable Caching">
            <Toggle checked={enableAPICaching} onChange={setEnableAPICaching} />
          </SettingItem>
          
          <SettingItem label="Cache Expiry (Seconds)">
            <Input type="number" value={cacheExpiry} onChange={setCacheExpiry} />
          </SettingItem>

          <div className={styles.buttonGroup}>
            <Button onClick={() => handleSaveSettings('API')}>
              <i className="bi bi-check-circle" /> Save Changes
            </Button>
          </div>
        </SettingsSection>

        {/* Danger Zone */}
        <div className={styles.dangerZone}>
          <div className={styles.dangerHeader}>
            <i className="bi bi-exclamation-triangle-fill" />
            <div>
              <h3>Danger Zone</h3>
              <p>Irreversible actions</p>
            </div>
          </div>
          <div className={styles.dangerButtons}>
            <Button variant="danger" onClick={handleDeleteAllData}>
              <i className="bi bi-x-circle" /> Delete All Data
            </Button>
            <Button variant="danger" onClick={handleResetSystem}>
              <i className="bi bi-arrow-counterclockwise" /> Reset System
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}