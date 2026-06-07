import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

export default function HeroSection({ place }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const thumbnailsRef = useRef(null);

  const allImages = [
    { src: place.heroSrc, alt: place.heroAlt },
    ...(place.images || []).map((img) => ({ src: img.src, alt: img.alt })),
  ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setIsTransitioning(false);
  }, []);

  const navigate = useCallback(
    (dir) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + dir + allImages.length) % allImages.length);
      setTimeout(() => setIsTransitioning(false), 250);
    },
    [allImages.length, isTransitioning]
  );

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, navigate, closeLightbox]);

  // Auto-scroll thumbnails to current image
  useEffect(() => {
    if (lightboxOpen && thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.children[currentIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentIndex, lightboxOpen]);

  const visibleImages = allImages.slice(0, 3);
  const hiddenCount = allImages.length - 3;

  return (
    <>
      {/* Hero Grid - unchanged */}
      <div className="row g-2 mb-4 mb-lg-5">
        <div className="col-7">
          <div
            className="position-relative overflow-hidden rounded-4 shadow-soft hover-lift"
            style={{ height: "460px", cursor: "zoom-in" }}
            onClick={() => openLightbox(0)}
          >
            <img
              src={allImages[0].src}
              alt={allImages[0].alt}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                transition: "transform 0.5s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                zIndex: 10,
              }}
            />
            <div className="position-absolute bottom-0 start-0 end-0 p-4" style={{ zIndex: 20 }}>
              <h1 className="text-white fw-extrabold display-5 mb-1">{place.name}</h1>
              <p className="text-white-50 mb-0 d-flex align-items-center gap-2">
                <span>{place.district}</span>
                <span
                  className="d-inline-block bg-teal rounded-circle"
                  style={{ width: 5, height: 5 }}
                />
                <span className="badge bg-teal text-white">Fully Accessible</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-5 d-flex flex-column gap-2" style={{ height: "460px" }}>
          {visibleImages.slice(1, 3).map((img, i) => {
            const globalIndex = i + 1;
            const isLast = i === 1;
            return (
              <div
                key={globalIndex}
                className="position-relative overflow-hidden rounded-4 shadow hover-lift"
                style={{ flex: 1, minHeight: 0, cursor: "zoom-in" }}
                onClick={() => openLightbox(globalIndex)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.5s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background:
                      isLast && hiddenCount > 0
                        ? "rgba(0,0,0,0.45)"
                        : "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
                    zIndex: 10,
                    transition: "background 0.3s",
                  }}
                />
                {isLast && hiddenCount > 0 && (
                  <div
                    className="position-absolute top-50 start-50 translate-middle text-white text-center"
                    style={{ zIndex: 20 }}
                  >
                    <span style={{ fontSize: "1.6rem", fontWeight: 700 }}>+{hiddenCount}</span>
                    <p className="mb-0" style={{ fontSize: "0.75rem", opacity: 0.85 }}>
                      View all photos
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox using Portal */}
      {lightboxOpen &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.95)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              animation: "fadeIn 0.2s ease",
            }}
            onClick={(e) => e.target === e.currentTarget && closeLightbox()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "20px",
                right: "30px",
                background: "rgba(0,0,0,0.6)",
                border: "none",
                color: "white",
                fontSize: "30px",
                cursor: "pointer",
                zIndex: 10000,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.6)")}
            >
              ✕
            </button>

            {/* Main image container */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "90vw",
                maxHeight: "75vh",
                margin: "0 auto",
                position: "relative",
              }}
            >
              {/* Previous button */}
              <button
                onClick={() => navigate(-1)}
                style={{
                  position: "absolute",
                  left: "10px",
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  color: "white",
                  fontSize: "40px",
                  cursor: "pointer",
                  padding: "10px 15px",
                  borderRadius: "50%",
                  zIndex: 10000,
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)")}
              >
                ‹
              </button>

              <img
                key={currentIndex}
                src={allImages[currentIndex].src}
                alt={allImages[currentIndex].alt}
                style={{
                  maxWidth: "85vw",
                  maxHeight: "75vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  transition: "transform 0.2s",
                  animation: isTransitioning ? "fadeScale 0.2s ease" : "none",
                }}
              />

              {/* Next button */}
              <button
                onClick={() => navigate(1)}
                style={{
                  position: "absolute",
                  right: "10px",
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  color: "white",
                  fontSize: "40px",
                  cursor: "pointer",
                  padding: "10px 15px",
                  borderRadius: "50%",
                  zIndex: 10000,
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)")}
              >
                ›
              </button>
            </div>

            {/* Counter */}
            <div
              style={{
                marginTop: "20px",
                color: "white",
                fontSize: "16px",
                background: "rgba(0,0,0,0.6)",
                padding: "6px 16px",
                borderRadius: "30px",
                backdropFilter: "blur(4px)",
              }}
            >
              {currentIndex + 1} / {allImages.length}
            </div>

            {/* Thumbnails */}
            <div
              ref={thumbnailsRef}
              style={{
                display: "flex",
                gap: "10px",
                overflowX: "auto",
                marginTop: "20px",
                padding: "10px",
                maxWidth: "90vw",
                justifyContent: "center",
              }}
            >
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: "70px",
                    height: "50px",
                    flexShrink: 0,
                    cursor: "pointer",
                    border: idx === currentIndex ? "3px solid white" : "3px solid transparent",
                    borderRadius: "6px",
                    overflow: "hidden",
                    opacity: idx === currentIndex ? 1 : 0.6,
                    transition: "0.2s",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>

            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes fadeScale {
                0% { opacity: 0; transform: scale(0.95); }
                100% { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>,
          document.body
        )}
    </>
  );
}