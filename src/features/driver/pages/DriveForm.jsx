import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/DriverProfile.module.css';
import { getDriverProfile, saveDriverProfile } from '../services/driverApi';

export default function DriverProfile() {
  const navigate = useNavigate();
  const photoRef = useRef();
  const licenseRef = useRef();
  const vehicleRef = useRef();

  const [photoPreview, setPhotoPreview] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [licensePreview, setLicensePreview] = useState(null);
  const [vehicleFile, setVehicleFile] = useState(null);
  const [vehiclePreview, setVehiclePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    vehicleType: '',
    licensePlate: '',
    vehicleModel: '',
    vehicleYear: '',
    accessibilityFeatures: '',
    availabilityFrom: '',
    availabilityTo: '',
    licenseNumber: '',
  });

  useEffect(() => {
    let mounted = true;

    async function loadSavedProfile() {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      if (!token) {
        setLoadingProfile(false);
        return;
      }

      const result = await getDriverProfile();
      if (!mounted) return;

      if (result.success && result.data) {
        setFormData({
          vehicleType: result.data.vehicleType || '',
          licensePlate: result.data.licensePlate || '',
          vehicleModel: result.data.vehicleModel || '',
          vehicleYear: result.data.vehicleYear || '',
          accessibilityFeatures: result.data.accessibilityFeatures || '',
          availabilityFrom: result.data.availabilityFrom || '',
          availabilityTo: result.data.availabilityTo || '',
          licenseNumber: result.data.licenseNumber || '',
        });

        const profileImage = result.data.photoUrl || result.data.profileImage;
        if (profileImage) {
          setPhotoPreview(profileImage.startsWith('/uploads') ? `http://localhost:3000${profileImage}` : profileImage);
        }

        if (result.data.licenseImageUrl) {
          const licenseImage = result.data.licenseImageUrl;
          setLicensePreview(licenseImage.startsWith('/uploads') ? `http://localhost:3000${licenseImage}` : licenseImage);
        }

        if (result.data.vehicleImageUrl) {
          const vehicleImage = result.data.vehicleImageUrl;
          setVehiclePreview(vehicleImage.startsWith('/uploads') ? `http://localhost:3000${vehicleImage}` : vehicleImage);
        }
      }

      setLoadingProfile(false);
    }

    loadSavedProfile();
    return () => { mounted = false; };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errMsg) setErrMsg('');
    if (successMsg) setSuccessMsg('');
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleLicense = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLicenseFile(file);
    if (file.type.startsWith('image/')) {
      setLicensePreview(URL.createObjectURL(file));
    } else {
      setLicensePreview(null);
    }
  };

  const handleVehicle = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVehicleFile(file);
    if (file.type.startsWith('image/')) {
      setVehiclePreview(URL.createObjectURL(file));
    } else {
      setVehiclePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');

    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    if (!token) {
      setErrMsg('لازم تعملى Login الأول');
      navigate('/login');
      return;
    }

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });

    if (photoRef.current?.files?.[0]) fd.append('photo', photoRef.current.files[0]);
    if (licenseFile) fd.append('license', licenseFile);
    if (vehicleFile) fd.append('vehicle', vehicleFile);

    setSubmitting(true);
    const result = await saveDriverProfile(fd);
    setSubmitting(false);

    if (result.success) {
      if (result.data) {
        localStorage.setItem('user', JSON.stringify(result.data));
      }
      setSuccessMsg('تم حفظ بيانات العربية والبروفايل بنجاح');
      navigate('/driver/places');
    } else {
      setErrMsg(result.message || 'حصل خطأ أثناء حفظ بيانات العربية. البيانات لم يتم حفظها.');
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
          <h1 className={styles.panelTitle}>Almost there!<br />Last step.</h1>
          <p className={styles.panelSub}>
            Complete your vehicle details and upload your documents to start accepting rides.
          </p>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={`${styles.stepDot} ${styles.stepDotDone}`}>
                <i className="ti ti-check" />
              </div>
              <div className={styles.stepText}>
                <span className={styles.stepTitle}>Personal Info</span>
                <span className={styles.stepSub}>Completed ✓</span>
              </div>
            </div>
            <div className={`${styles.stepLine} ${styles.stepLineDone}`} />
            <div className={styles.step}>
              <div className={`${styles.stepDot} ${styles.stepDotActive}`}>2</div>
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
            <h2 className={styles.headTitle}>Vehicle & Profile Setup</h2>
            <p className={styles.headSub}>Step 2 of 2 — Vehicle Details & Documents</p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Profile Photo */}
            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>1</span>
                <h3 className={styles.secTitle}>Profile Photo</h3>
              </div>
              <div className={styles.photoWrap}>
                <div className={styles.photoCircle} onClick={() => photoRef.current.click()}>
                  {photoPreview
                    ? <img src={photoPreview} alt="preview" className={styles.photoImg} />
                    : <i className="ti ti-user-circle" />
                  }
                  <div className={styles.photoOverlay}>
                    <i className="ti ti-camera" />
                  </div>
                </div>
                <div className={styles.photoInfo}>
                  <p>Upload a clear profile photo</p>
                  <span>JPEG, PNG up to 5 MB</span>
                  <button type="button" className={styles.photoBtn} onClick={() => photoRef.current.click()}>
                    Choose Photo
                  </button>
                </div>
                <input ref={photoRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
              </div>
            </div>

            <div className={styles.divider} />

            {/* Vehicle Info */}
            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>2</span>
                <h3 className={styles.secTitle}>Vehicle Information</h3>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className={styles.label}>Vehicle type</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-car" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <select name="vehicleType" className={styles.input} required value={formData.vehicleType} onChange={handleInputChange}>
                      <option value="" disabled>Select type</option>
                      <option>Wheelchair Van</option>
                      <option>Adapted Minibus</option>
                      <option>Accessible Sedan</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className={styles.label}>License plate</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-license" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <input name="licensePlate" type="text" className={styles.input} placeholder="e.g. ABC 1234" required value={formData.licensePlate} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className={styles.label}>Vehicle model</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-car-suv" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <input name="vehicleModel" type="text" className={styles.input} placeholder="e.g. Toyota Hiace" required value={formData.vehicleModel} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className={styles.label}>Vehicle year</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-calendar" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <input name="vehicleYear" type="number" className={styles.input} placeholder="e.g. 2020" min="2000" max="2035" required value={formData.vehicleYear} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="col-12">
                  <label className={styles.label}>Accessibility features</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-wheelchair" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <select name="accessibilityFeatures" className={styles.input} required value={formData.accessibilityFeatures} onChange={handleInputChange}>
                      <option value="" disabled>Select feature</option>
                      <option>Wheelchair Ramp</option>
                      <option>Hydraulic Lift</option>
                      <option>Swivel Seat</option>
                      <option>Hand Controls</option>
                      <option>Multiple Features</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className={styles.label}>Availability from</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-clock" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <input name="availabilityFrom" type="time" className={styles.input} required value={formData.availabilityFrom} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className={styles.label}>Availability to</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-clock" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <input name="availabilityTo" type="time" className={styles.input} required value={formData.availabilityTo} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Documents */}
            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>3</span>
                <h3 className={styles.secTitle}>Documents & Verification</h3>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <label className={styles.label}>Driver's license number</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-id-badge" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <input name="licenseNumber" type="text" className={styles.input} placeholder="Enter license number" required value={formData.licenseNumber} onChange={handleInputChange} />
                  </div>
                </div>

                {/* === Upload Driver's License === */}
                <div className="col-md-6">
                  <label className={styles.label}>Upload driver's license</label>
                  <div className={styles.upload} onClick={() => licenseRef.current.click()}>
                    {licensePreview ? (
                      <img src={licensePreview} alt="license preview"
                           style={{maxWidth:'100%',maxHeight:140,borderRadius:8,objectFit:'cover'}} />
                    ) : licenseFile ? (
                      <>
                        <i className="ti ti-file-check" style={{color:'#16a34a',fontSize:28}} />
                        <p style={{color:'#16a34a',margin:'6px 0 0',fontWeight:600}}>{licenseFile.name}</p>
                        <span>{(licenseFile.size/1024).toFixed(1)} KB • Click to change</span>
                      </>
                    ) : (
                      <>
                        <i className="ti ti-file-upload" />
                        <p>Click to upload license</p>
                        <span>PDF, JPEG, PNG up to 10 MB</span>
                      </>
                    )}
                  </div>
                  <input
                    ref={licenseRef}
                    type="file"
                    accept="image/*,application/pdf"
                    hidden
                    onChange={handleLicense}
                  />
                </div>

                {/* === Upload Vehicle Photo === */}
                <div className="col-md-6">
                  <label className={styles.label}>Upload vehicle photo</label>
                  <div className={styles.upload} onClick={() => vehicleRef.current.click()}>
                    {vehiclePreview ? (
                      <img src={vehiclePreview} alt="vehicle preview"
                           style={{maxWidth:'100%',maxHeight:140,borderRadius:8,objectFit:'cover'}} />
                    ) : vehicleFile ? (
                      <>
                        <i className="ti ti-file-check" style={{color:'#16a34a',fontSize:28}} />
                        <p style={{color:'#16a34a',margin:'6px 0 0',fontWeight:600}}>{vehicleFile.name}</p>
                        <span>{(vehicleFile.size/1024).toFixed(1)} KB • Click to change</span>
                      </>
                    ) : (
                      <>
                        <i className="ti ti-cloud-upload" />
                        <p>Click to upload vehicle photo</p>
                        <span>JPEG, PNG up to 10 MB</span>
                      </>
                    )}
                  </div>
                  <input
                    ref={vehicleRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleVehicle}
                  />
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
              {errMsg && <div style={{color:'#dc2626', marginBottom:10, width:'100%'}}>✕ {errMsg}</div>}
              {successMsg && <div style={{color:'#16a34a', marginBottom:10, width:'100%'}}>✓ {successMsg}</div>}

              <button type="submit" disabled={submitting || loadingProfile} className={styles.btn} style={{flex:1, minWidth:200}}>
                {submitting ? 'Saving...' : loadingProfile ? 'Loading saved data...' : 'Save & Continue'} <i className="ti ti-arrow-right" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/driver/places')}
                style={{
                  flex:1, minWidth:200, padding:'12px 20px',
                  background:'#e0f2fe', color:'#0369a1',
                  border:'1px solid #7dd3fc', borderRadius:8,
                  cursor:'pointer', fontWeight:600
                }}
              >
                Manage Service Areas
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
