// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import HeroSection from "../../features/places/HeroSection";
// import AboutSection from "../../features/places/AboutSection";
// import CommunityReviews from "../../features/reviews/CommunityReviews";
// import DriversSidebar from "../../features/places/DriversSidebar";
// import "./PlacesPage.module.css";

// // مستخدم وهمي لتجربة كتابة المراجعة (استبدله بنظام المصادقة الحقيقي)
// const dummyUser = {
//   id: "usr_dummy_001",
//   name: "Ahmed Hassan",
//   email: "ahmed.hassan@example.com",
//   avatar: "https://i.pravatar.cc/150?img=12",
//   bio: "Accessibility advocate & frequent traveler",
//   joinedAt: "2024-02-15",
// };

// export default function PlacesPage() {
//   const { id } = useParams();
//   const [place, setPlace] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ جلب بيانات المكان من الـ API
//   useEffect(() => {
//     const fetchPlace = async () => {
//       try {
//         const res = await fetch(`/api/places/${id}`);
//         const data = await res.json();
//         if (!data.success) throw new Error(data.message || "Failed to fetch place");
//         setPlace(data.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPlace();
//   }, [id]);

//   // ✅ Animation on scroll (يعاد تشغيله بعد تحميل البيانات)
//   useEffect(() => {
//     if (!place) return;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("is-visible");
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.15 }
//     );

//     const elements = document.querySelectorAll(".animate-on-scroll");
//     elements.forEach((el) => observer.observe(el));

//     return () => observer.disconnect();
//   }, [place]);

//   // حالات التحميل / الخطأ
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <div className="spinner-border text-teal" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger">{error}</div>
//       </div>
//     );
//   }

//   if (!place) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-warning">Place not found</div>
//       </div>
//     );
//   }

//   // استخراج البيانات المطلوبة
//   const {
//     name,
//     district,
//     description,
//     features = [],
//     reviews = [],
//     rating = 0,
//     reviewCount = 0,
//     images = [],
//   } = place;

//   return (
//     <div className="min-vh-100 bg-light">
//       <div className="container-xl px-3 px-sm-4 py-4 py-lg-5">
//         {/* Hero Section */}
//         <div className="animate-on-scroll">
//           <HeroSection
//             place={{
//               ...place,
//               heroSrc: images[0]?.src || place.image, // الصورة الرئيسية
//               heroAlt: images[0]?.alt || place.name,
//               images,
//             }}
//           />
//         </div>

//         <h2 className="display-6 fw-extrabold mb-4 mb-lg-5 animate-on-scroll">
//           Accessibility Highlights
//         </h2>

//         <div className="row g-4 g-lg-5">
//           {/* المحتوى الأساسي */}
//           <div className="col-12 col-lg-8 d-flex flex-column gap-4 gap-lg-5">
//             {/* About */}
//             <div className="animate-on-scroll hover-lift rounded-4">
//               <AboutSection description={description} features={features} />
//             </div>

//             {/* Reviews */}
//             <div className="animate-on-scroll hover-lift rounded-4">
//               <CommunityReviews
//                 reviews={reviews}
//                 rating={rating}
//                 reviewCount={reviewCount}
//                 currentUser={dummyUser} // مررنا المستخدم الوهمي
//               />
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="col-12 col-lg-4">
//             <div className="animate-on-scroll hover-lift rounded-4">
//               <DriversSidebar
//                 placeId={id}           // لتمريره إلى داخل المكون لجلب السائقين
//                 venueLat={place.lat}
//                 venueLng={place.lng}
//                 venueName={name}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import HeroSection from "../../features/places/HeroSection";
import AboutSection from "../../features/places/AboutSection";
import CommunityReviews from "../../features/reviews/CommunityReviews";
import DriversSidebar from "../../features/places/DriversSidebar";
import "./PlacesPage.module.css";

export default function PlacesPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // إذا لم يوجد id صحيح، ننتقل إلى صفحة explore
  if (!id) {
    return <Navigate to="/explore" replace />;
  }

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch(`/api/places/${id}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Failed to fetch place");
        setPlace(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  // Animation observer
  useEffect(() => {
    if (!place) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [place]);

  if (authLoading || loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-teal" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Place not found</div>
      </div>
    );
  }

  const {
    name,
    description,
    features = [],
    images = [],
  } = place;

  return (
<div className="min-vh-100" style={{ background: "var(--light-bg)" }}>
      <div className="container-xl px-3 px-sm-4 py-4 py-lg-5">
        <div className="animate-on-scroll">
          <HeroSection
            place={{
              ...place,
              heroSrc: images[0]?.src || place.image,
              heroAlt: images[0]?.alt || place.name,
              images,
            }}
          />
        </div>

        <h2 className="display-6 fw-extrabold mb-4 mb-lg-5 animate-on-scroll">
          Accessibility Highlights
        </h2>

        <div className="row g-4 g-lg-5">
          <div className="col-12 col-lg-8 d-flex flex-column gap-4 gap-lg-5">
            <div className="animate-on-scroll hover-lift rounded-4">
              <AboutSection description={description} features={features} />
            </div>

            <div className="animate-on-scroll hover-lift rounded-4">
              <CommunityReviews
                placeId={id}
                currentUser={user}   // المستخدم الحقيقي (أو null)
              />
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="animate-on-scroll hover-lift rounded-4">
              <DriversSidebar
                placeId={id}
                venueLat={place.lat}
                venueLng={place.lng}
                venueName={name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}