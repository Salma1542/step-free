import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './placeForm.module.css';
import axios from "axios";
const FEATURES = [
  { icon: "ti-trending-up", label: "Ramp" },
  { icon: "ti-elevator", label: "Elevator" },
  { icon: "ti-door-enter", label: "Wide Entrance" },
  { icon: "ti-home", label: "Accessible Bathroom" },
  { icon: "ti-parking", label: "Parking" },
  { icon: "ti-wind", label: "AC" },
];

export default function PlaceForm() {
  const navigate  = useNavigate();
  const uploadRef = useRef();
  const [photos, setPhotos]           = useState([]);
  const [serverError, setServerError] = useState('');
  const [submitted, setSubmitted]     = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

const handlePhotos = (e) => {
  const files = Array.from(e.target.files);

  if (files.length < 3) {
    setServerError("Please select at least 3 photos");
    setPhotos([]);
    return;
  }

  if (files.length > 5) {
    setServerError("Maximum 5 photos allowed");
    setPhotos(files.slice(0, 5));
    return;
  }

  setServerError("");
  setPhotos(files);
};

  const onSubmit = async (data) => {
  setServerError("");

  if (photos.length < 3) {
    setServerError("Please upload at least 3 photos");
    return;
  }

  try {
    const token = localStorage.getItem("token");

   const payload = {
  name: data.facilityName,
  description: data.description,
  type: data.category,
  image:
    data.image ||
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",

  area: data.address,

  distance: Number(data.distance),

  lat: Number(data.lat),

  lng: Number(data.lng),

  coordinates: {
    type: "Point",
    coordinates: [
      Number(data.lng),
      Number(data.lat),
    ],
  },

  tags: data.features || [],

  rating: 0,
};

    const response = await axios.post(
      "http://localhost:3000/api/places",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSubmittedData(payload);
    setSubmitted(true);
  } catch (err) {
    setServerError(
      err.response?.data?.message || "Failed to create place"
    );
  }
};
  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div className={styles.root}>
        <aside className={styles.panel}>
          <div className={styles.dots} />
          <div className={styles.c1} />
          <div className={styles.c2} />
          <div className={styles.pc}>
            <div className={styles.badge}>
              <i className="ti ti-building" aria-hidden="true" /> Step Free
            </div>
            <h1 className={styles.panelTitle}>You're almost<br />live!</h1>
            <p className={styles.panelSub}>
              Your facility has been submitted for review. Our team will verify
              the accessibility information within 2–3 business days.
            </p>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={`${styles.dot} ${styles.dotDone}`}>
                  <i className="ti ti-check" aria-hidden="true" />
                </div>
                <div className={styles.st}>
                  <span className={styles.stTitle}>Account info</span>
                  <span className={styles.stSub}>Done</span>
                </div>
              </div>
              <div className={styles.sline} />
              <div className={styles.step}>
                <div className={`${styles.dot} ${styles.dotDone}`}>
                  <i className="ti ti-check" aria-hidden="true" />
                </div>
                <div className={styles.st}>
                  <span className={styles.stTitle}>Facility details</span>
                  <span className={styles.stSub}>Done</span>
                </div>
              </div>
              <div className={styles.sline} />
              <div className={styles.step}>
                <div className={`${styles.dot} ${styles.dotActive}`}>3</div>
                <div className={styles.st}>
                  <span className={styles.stTitle}>Under review</span>
                  <span className={styles.stSub}>2–3 business days</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className={styles.right}>
          <div className={styles.wrap}>

            {/* Success icon */}
            <div className={styles.successIcon}>
              <i className="ti ti-circle-check" aria-hidden="true" />
            </div>

            <h2 className={styles.successTitle}>Submitted for review!</h2>
            <p className={styles.successSub}>
              Thank you for registering <strong>{submittedData?.name}</strong>
              We'll notify you once your listing is verified and live on StepFree.
            </p>

            {/* Summary card */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>
                  <i className="ti ti-building" aria-hidden="true" /> Facility
                </span>
                <span className={styles.summaryVal}>{submittedData?.name}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>
                  <i className="ti ti-category" aria-hidden="true" /> Category
                </span>
                <span className={styles.summaryVal}>{submittedData?.type}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>
                  <i className="ti ti-map-pin" aria-hidden="true" /> Address
                </span>
                <span className={styles.summaryVal}>{submittedData?.area}</span>
              </div>
              
              {submittedData?.features?.length > 0 && (
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>
                    <i className="ti ti-wheelchair" aria-hidden="true" /> Features
                  </span>
                  <span className={styles.summaryVal}>
                    {Array.isArray(submittedData.features)
                      ? submittedData.features.join(', ')
                      : submittedData.features}
                  </span>
                </div>
              )}
            </div>

            {/* What happens next */}
            <div className={styles.nextSteps}>
              <p className={styles.nextTitle}>What happens next?</p>
              <div className={styles.nextItem}>
                <div className={styles.nextDot}>1</div>
                <p>Our team reviews your facility details and photos</p>
              </div>
              <div className={styles.nextItem}>
                <div className={styles.nextDot}>2</div>
                <p>You'll receive an email once your listing is approved</p>
              </div>
              <div className={styles.nextItem}>
                <div className={styles.nextDot}>3</div>
                <p>Your facility goes live and becomes searchable on StepFree</p>
              </div>
            </div>

            <div className={styles.successActions}>
              <button
                className={styles.submit}
                onClick={() => navigate('/login')}
              >
                Go to my account <i className="ti ti-arrow-right" aria-hidden="true" />
              </button>
              <button
                className={styles.submitOutline}
                onClick={() => { setSubmitted(false); setPhotos([]); }}
              >
                <i className="ti ti-plus" aria-hidden="true" /> Register another facility
              </button>
            </div>

          </div>
        </main>
      </div>
    );
  }

  /* ── Main Form ── */
  return (
    <div className={styles.root}>

      {/* ===== Left Panel ===== */}
      <aside className={styles.panel}>
        <div className={styles.dots} />
        <div className={styles.c1} />
        <div className={styles.c2} />
        <div className={styles.pc}>
          <div className={styles.badge}>
            <i className="ti ti-building" aria-hidden="true" /> Step Free
          </div>
          <h1 className={styles.panelTitle}>Register new<br />facility</h1>
          <p className={styles.panelSub}>
            Help make your city more accessible. Add your facility to the
            StepFree network and reach people with disabilities easily.
          </p>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={`${styles.dot} ${styles.dotDone}`}>
                <i className="ti ti-check" aria-hidden="true" />
              </div>
              <div className={styles.st}>
                <span className={styles.stTitle}>Account info</span>
                <span className={styles.stSub}>Done</span>
              </div>
            </div>
            <div className={styles.sline} />
            <div className={styles.step}>
              <div className={`${styles.dot} ${styles.dotActive}`}>2</div>
              <div className={styles.st}>
                <span className={styles.stTitle}>Facility details</span>
                <span className={styles.stSub}>You are here</span>
              </div>
            </div>
          </div>

          <div className={styles.verified}>
            <i className="ti ti-rosette-discount-check" aria-hidden="true" />
            <p>
              Verified facilities get a{' '}
              <strong>"Verified Access"</strong> badge on their listing.
            </p>
          </div>
        </div>
      </aside>

      {/* ===== Right Panel ===== */}
      <main className={styles.right}>
        <div className={styles.wrap}>

          <div className={styles.head}>
            <h2 className={styles.headTitle}>Facility details</h2>
            <p className={styles.headSub}>
              Step 2 of 2 — Add your facility information &amp; accessibility features
            </p>
          </div>

          {/* Progress bar */}
          <div className={styles.progWrap}>
            <div className={styles.progLabels}>
              <span className={`${styles.progLabel} ${styles.progDone}`}>
                <i className="ti ti-check" aria-hidden="true" /> Account info
              </span>
              <span className={`${styles.progLabel} ${styles.progActive}`}>
                <i className="ti ti-building" aria-hidden="true" /> Facility details
              </span>
              <span className={styles.progLabel}>
                <i className="ti ti-check-list" aria-hidden="true" /> Review
              </span>
            </div>
            <div className={styles.progBar}>
              <div className={styles.progFill} />
            </div>
          </div>

          {serverError && (
            <div className={styles.serverError}>
              <i className="ti ti-alert-circle" aria-hidden="true" /> {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* ── Section 1 ── */}
            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>1</span>
                <h3 className={styles.secTitle}>Facility information</h3>
              </div>
              <div className={styles.grid}>

                <div className={styles.field}>
                  <label htmlFor="facilityName">Facility name</label>
                  <input
                    id="facilityName"
                    type="text"
                    placeholder="e.g. Cairo Medical Center"
                    className={errors.facilityName ? styles.inputErr : ''}
                    {...register('facilityName', { required: 'Facility name is required' })}
                  />
                  {errors.facilityName && (
                    <span className={styles.fieldErr}>{errors.facilityName.message}</span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    className={errors.category ? styles.inputErr : ''}
                    {...register('category', { required: 'Please select a category' })}
                  >
                  <option value="">Select category</option>
<option value="Restaurant">Restaurant</option>
<option value="Hospital">Hospital</option>
<option value="Mall">Mall</option>
<option value="Hotel">Hotel</option>
<option value="Cafe">Cafe</option>
<option value="Bank">Bank</option>
                  </select>
                  {errors.category && (
                    <span className={styles.fieldErr}>{errors.category.message}</span>
                  )}
                </div>

                <div className={`${styles.field} ${styles.full}`}>
                  <label htmlFor="address">Address</label>
                  <div className={`${styles.addr} ${errors.address ? styles.addrErr : ''}`}>
                    <i className="ti ti-map-pin" aria-hidden="true" />
                    <input
                      id="address"
                      type="text"
                      placeholder="Search for location or enter address"
                      {...register('address', { required: 'Address is required' })}
                    />
                  </div>
                  {errors.address && (
                    <span className={styles.fieldErr}>{errors.address.message}</span>
                  )}
                </div>
                <div className={styles.field}>
  <label>Distance (KM)</label>

  <input
    type="number"
    step="0.1"
    {...register("distance", {
      required: true,
    })}
  />
</div>
<div className={styles.field}>
  <label>Latitude</label>

  <input
    type="number"
    step="0.000001"
    {...register("lat", {
      required: true,
    })}
  />
</div>

<div className={styles.field}>
  <label>Longitude</label>

  <input
    type="number"
    step="0.000001"
    {...register("lng", {
      required: true,
    })}
  />
</div>
<div className={styles.field}>
<label>Cover Image URL</label>
  <input
    type="text"
    placeholder="https://..."
    {...register("image")}
  />
</div>
                <div className={styles.field}>
                  <label htmlFor="city">City</label>
                  <select
                    id="city"
                    className={errors.city ? styles.inputErr : ''}
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
                  {errors.city && (
                    <span className={styles.fieldErr}>{errors.city.message}</span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone">Contact phone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+20 1xx xxxx xxxx"
                    className={errors.phone ? styles.inputErr : ''}
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[+]?[0-9]{10,15}$/,
                        message: 'Invalid phone number',
                      },
                    })}
                  />
                  {errors.phone && (
                    <span className={styles.fieldErr}>{errors.phone.message}</span>
                  )}
                </div>

              </div>
            </div>

            <div className={styles.divider} />

            {/* ── Section 2 ── */}
            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>2</span>
                <h3 className={styles.secTitle}>Accessibility features</h3>
              </div>
              <div className={styles.featGrid}>
                {FEATURES.map((f) => (
                  <label className={styles.featLabel} key={f.label}>
                    <input
                      type="checkbox"
                      value={f.label}
                      {...register('features')}
                    />
                    <div className={styles.featCard}>
                      <i className={`ti ${f.icon}`} aria-hidden="true" />
                      <span>{f.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
<div className={styles.field}>
  <label>Description</label>

 <textarea
  className={errors.description ? styles.inputErr : ""}
  placeholder="Write a detailed description about your facility..."
  {...register("description", {
    required: "Description is required",
  })}
/>

{errors.description && (
  <span className={styles.fieldErr}>
    {errors.description.message}
  </span>
)}
</div>
            <div className={styles.divider} />

            {/* ── Section 3 ── */}
            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secNum}>3</span>
                <h3 className={styles.secTitle}>Photo verification</h3>
              </div>

              <div
                className={styles.upload}
                onClick={() => uploadRef.current.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && uploadRef.current.click()}
              >
                <i className="ti ti-cloud-upload" aria-hidden="true" />
                <p>Drag photos here or click to upload</p>
                <span>Max 5 photos — entrances, ramps, elevators</span>
                {photos.length > 0 && (
                  <span className={styles.photoCount}>
                    <i className="ti ti-check" aria-hidden="true" />
                    {photos.length} photo{photos.length > 1 ? 's' : ''} selected
                  </span>
                )}
              </div>

              <input
                ref={uploadRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handlePhotos}
              />

              {photos.length > 0 && (
                <div className={styles.previews}>
                  {photos.map((file, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${i}`}
                      className={styles.previewImg}
                    />
                  ))}
                </div>
              )}

              <div className={styles.alert}>
                <i className="ti ti-info-circle" aria-hidden="true" />
                <p>
                  Photos speed up the review process. Clear photos of entrances,
                  ramps, and elevators help verify your listing faster.
                </p>
              </div>
            </div>

            <button type="submit" className={styles.submit} disabled={isSubmitting}>
              {isSubmitting ? (
                <><i className="ti ti-loader-2" aria-hidden="true" /> Submitting...</>
              ) : (
                <>Submit for review <i className="ti ti-arrow-right" aria-hidden="true" /></>
              )}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}