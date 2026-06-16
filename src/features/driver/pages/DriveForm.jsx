import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/DriverProfile.module.css";

const API_URL = "http://localhost:3000/api/drivers/profile";

export default function DriverProfile() {
  const navigate = useNavigate();
const [isEdit, setIsEdit] = useState(false);
  const photoRef = useRef();
  const licenseRef = useRef();
  const vehicleRef = useRef();

  const [form, setForm] = useState({
    vehicleType: "",
    licensePlate: "",
    vehicleModel: "",
    vehicleYear: "",
    accessibilityFeatures: "",
    availabilityFrom: "",
    availabilityTo: "",
    licenseNumber: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [licensePreview, setLicensePreview] = useState(null);
  const [vehicleFile, setVehicleFile] = useState(null);
  const [vehiclePreview, setVehiclePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
useEffect(() => {
  const loadProfile = async () => {
    try {
      if (!token) return;

      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const profile = data.data;

        setIsEdit(true);

        setForm({
          vehicleType: profile.vehicleType || "",
          licensePlate: profile.licensePlate || "",
          vehicleModel: profile.vehicleModel || "",
          vehicleYear: profile.vehicleYear || "",
          accessibilityFeatures: profile.accessibilityFeatures?.[0] || "",
          availabilityFrom: profile.availabilityFrom || "",
          availabilityTo: profile.availabilityTo || "",
          licenseNumber: profile.licenseNumber || "",
        });

        setPhotoPreview(profile.photoUrl || null);
        setLicensePreview(profile.licenseImageUrl || null);
        setVehiclePreview(profile.vehicleImageUrl || null);
      }
    } catch (error) {
      console.log("No existing driver profile yet");
    }
  };

  loadProfile();
}, [token]);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleLicense = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLicenseFile(file);

    if (file.type.startsWith("image/")) {
      setLicensePreview(URL.createObjectURL(file));
    } else {
      setLicensePreview(null);
    }
  };

  const handleVehicle = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVehicleFile(file);

    if (file.type.startsWith("image/")) {
      setVehiclePreview(URL.createObjectURL(file));
    } else {
      setVehiclePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const fd = new FormData();

      fd.append("vehicleType", form.vehicleType);
      fd.append("licensePlate", form.licensePlate);
      fd.append("vehicleModel", form.vehicleModel);
      fd.append("vehicleYear", form.vehicleYear);
      fd.append(
        "accessibilityFeatures",
        JSON.stringify([form.accessibilityFeatures])
      );
      fd.append("availabilityFrom", form.availabilityFrom);
      fd.append("availabilityTo", form.availabilityTo);
      fd.append("licenseNumber", form.licenseNumber);

      if (photoRef.current.files[0]) {
        fd.append("photo", photoRef.current.files[0]);
      }

      if (licenseFile) {
        fd.append("license", licenseFile);
      }

      if (vehicleFile) {
        fd.append("vehicle", vehicleFile);
      }

     const res = await fetch(API_URL, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: fd,
});

// اقرأ الرد مرة واحدة فقط
const text = await res.text();

let data;

try {
  data = JSON.parse(text);
} catch {
  console.error("SERVER RESPONSE:", text);
  throw new Error("Server returned HTML instead of JSON. Check backend terminal.");
}

if (!res.ok) {
  throw new Error(data.message || "Failed to save driver profile");
}

alert("Driver profile saved successfully");
navigate("/driver/places");

      alert("Driver profile saved successfully");
      navigate("/driver/places");
    } catch (error) {
      alert(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <aside className={styles.panel}>
        <div className={styles.dots} />
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.panelContent}>
          <div className={styles.badge}>
            <i className="ti ti-steering-wheel" /> Step Free Drivers
          </div>

          <h1 className={styles.panelTitle}>
            Almost there!
            <br />
            Last step.
          </h1>

          <p className={styles.panelSub}>
            Complete your vehicle details and upload your documents to start
            accepting rides.
          </p>
        </div>
      </aside>

      <main className={styles.right}>
        <div className={styles.card}>
          <div className={styles.head}>
            <h2 className={styles.headTitle}>Vehicle & Profile Setup</h2>
            <p className={styles.headSub}>
              Step 2 of 2 — Vehicle Details & Documents
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>1</span>
                <h3 className={styles.secTitle}>Profile Photo</h3>
              </div>

              <div className={styles.photoWrap}>
                <div
                  className={styles.photoCircle}
                  onClick={() => photoRef.current.click()}
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="preview"
                      className={styles.photoImg}
                    />
                  ) : (
                    <i className="ti ti-user-circle" />
                  )}

                  <div className={styles.photoOverlay}>
                    <i className="ti ti-camera" />
                  </div>
                </div>

                <div className={styles.photoInfo}>
                  <p>Upload a clear profile photo</p>
                  <span>JPEG, PNG up to 5 MB</span>
                  <button
                    type="button"
                    className={styles.photoBtn}
                    onClick={() => photoRef.current.click()}
                  >
                    Choose Photo
                  </button>
                </div>

                <input
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handlePhoto}
                />
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>2</span>
                <h3 className={styles.secTitle}>Vehicle Information</h3>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className={styles.label}>Vehicle type</label>
                  <select
                    name="vehicleType"
                    className={styles.input}
                    required
                    value={form.vehicleType}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                    <option value="Bus">Bus</option>
                    <option value="SUV">SUV</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className={styles.label}>License plate</label>
                  <input
                    name="licensePlate"
                    type="text"
                    className={styles.input}
                    placeholder="e.g. ABC 1234"
                    required
                    value={form.licensePlate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className={styles.label}>Vehicle model</label>
                  <input
                    name="vehicleModel"
                    type="text"
                    className={styles.input}
                    placeholder="e.g. Toyota Hiace"
                    required
                    value={form.vehicleModel}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className={styles.label}>Vehicle year</label>
                  <input
                    name="vehicleYear"
                    type="number"
                    className={styles.input}
                    placeholder="e.g. 2020"
                    min="2000"
                    max="2026"
                    required
                    value={form.vehicleYear}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className={styles.label}>
                    Accessibility features
                  </label>
                  <select
                    name="accessibilityFeatures"
                    className={styles.input}
                    required
                    value={form.accessibilityFeatures}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select feature
                    </option>
                    <option value="Wheelchair Ramp">Wheelchair Ramp</option>
                    <option value="Wheelchair Lift">Wheelchair Lift</option>
                    <option value="Wide Door">Wide Door</option>
                    <option value="Extra Space">Extra Space</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className={styles.label}>Availability from</label>
                  <input
                    name="availabilityFrom"
                    type="time"
                    className={styles.input}
                    required
                    value={form.availabilityFrom}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className={styles.label}>Availability to</label>
                  <input
                    name="availabilityTo"
                    type="time"
                    className={styles.input}
                    required
                    value={form.availabilityTo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>3</span>
                <h3 className={styles.secTitle}>Documents & Verification</h3>
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <label className={styles.label}>
                    Driver's license number
                  </label>
                  <input
                    name="licenseNumber"
                    type="text"
                    className={styles.input}
                    placeholder="Enter license number"
                    required
                    value={form.licenseNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className={styles.label}>
                    Upload driver's license
                  </label>

                  <div
                    className={styles.upload}
                    onClick={() => licenseRef.current.click()}
                  >
                    {licensePreview ? (
                      <img
                        src={licensePreview}
                        alt="license preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: 140,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    ) : licenseFile ? (
                      <>
                        <i
                          className="ti ti-file-check"
                          style={{ color: "#16a34a", fontSize: 28 }}
                        />
                        <p
                          style={{
                            color: "#16a34a",
                            margin: "6px 0 0",
                            fontWeight: 600,
                          }}
                        >
                          {licenseFile.name}
                        </p>
                        <span>
                          {(licenseFile.size / 1024).toFixed(1)} KB • Click to
                          change
                        </span>
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

                <div className="col-md-6">
                  <label className={styles.label}>
                    Upload vehicle photo
                  </label>

                  <div
                    className={styles.upload}
                    onClick={() => vehicleRef.current.click()}
                  >
                    {vehiclePreview ? (
                      <img
                        src={vehiclePreview}
                        alt="vehicle preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: 140,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    ) : vehicleFile ? (
                      <>
                        <i
                          className="ti ti-file-check"
                          style={{ color: "#16a34a", fontSize: 28 }}
                        />
                        <p
                          style={{
                            color: "#16a34a",
                            margin: "6px 0 0",
                            fontWeight: 600,
                          }}
                        >
                          {vehicleFile.name}
                        </p>
                        <span>
                          {(vehicleFile.size / 1024).toFixed(1)} KB • Click to
                          change
                        </span>
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

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                type="submit"
                className={styles.btn}
                style={{ flex: 1, minWidth: 200 }}
                disabled={loading}
              >
{loading ? "Saving..." : isEdit ? "Update Profile" : "Submit Application"}                <i className="ti ti-arrow-right" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/driver/places")}
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: "12px 20px",
                  background: "#e0f2fe",
                  color: "#0369a1",
                  border: "1px solid #7dd3fc",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 600,
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