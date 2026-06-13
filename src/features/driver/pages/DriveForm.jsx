import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/DriverProfile.module.css';

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
      setLicensePreview(null); // PDF أو أى نوع تانى
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // مثال: لو هتبعتيهم للباك استخدمى FormData
    // const fd = new FormData();
    // if (photoRef.current.files[0]) fd.append('photo', photoRef.current.files[0]);
    // if (licenseFile) fd.append('license', licenseFile);
    // if (vehicleFile) fd.append('vehicle', vehicleFile);
    // await axios.post('/api/driver/profile', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
    navigate('/login');
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
                    <select className={styles.input} required defaultValue="">
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
                    <input type="text" className={styles.input} placeholder="e.g. ABC 1234" required />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className={styles.label}>Vehicle model</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-car-suv" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <input type="text" className={styles.input} placeholder="e.g. Toyota Hiace" required />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className={styles.label}>Vehicle year</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-calendar" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <input type="number" className={styles.input} placeholder="e.g. 2020" min="2000" max="2025" required />
                  </div>
                </div>
                <div className="col-12">
                  <label className={styles.label}>Accessibility features</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-wheelchair" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <select className={styles.input} required defaultValue="">
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
                    <input type="time" className={styles.input} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className={styles.label}>Availability to</label>
                  <div className={styles.inputWrap}>
                    <i className="ti ti-clock" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'#94a3b8'}} />
                    <input type="time" className={styles.input} required />
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
                    <input type="text" className={styles.input} placeholder="Enter license number" required />
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
              <button type="submit" className={styles.btn} style={{flex:1, minWidth:200}}>
                Submit Application <i className="ti ti-arrow-right" />
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
