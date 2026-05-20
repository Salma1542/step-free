import { useEffect } from "react";
import HeroSection from "../../features/places/HeroSection";
import AboutSection from "../../features/places/AboutSection";
import CommunityReviews from "../../features/reviews/CommunityReviews";
import DriversSidebar from "../../features/places/DriversSidebar";
import placeData from "../../features/places/data/placeData.json";
import "./PlacesPage.module.css"; // استيراد الأنماط العامة فقط

// ─── حساب وهمي لتجربة واجهة كتابة المراجعة ───
const dummyUser = {
 id: "usr_dummy_001",
 name: "Ahmed Hassan",
 email: "ahmed.hassan@example.com",
 avatar: "https://i.pravatar.cc/150?img=12", // صورة رمزية
 bio: "Accessibility advocate & frequent traveler",
 joinedAt: "2024-02-15",
};

// ─── مراجعة وهمية مضافة للاختبار ───
const extraReview = {
 id: "rev_dummy_001",
 user: dummyUser,
 rating: 5,
 comment:
 "This place is incredibly accessible! The staff is very helpful and the ramps are well-maintained.",
 date: "2026-05-15",
};

export default function PlacesPage() {
 // دمج المراجعة الوهمية مع المراجعات الموجودة
 const reviews = [extraReview, ...placeData.reviews];
 const { description, rating, reviewCount, features, drivers } = placeData;

 // تفعيل حركة الظهور عند التمرير
 useEffect(() => {
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

 document
 .querySelectorAll(".animate-on-scroll")
 .forEach((el) => observer.observe(el));

 return () => observer.disconnect();
 }, []);

 return (
 <div className="min-vh-100 bg-light">
 <div className="container-xl px-3 px-sm-4 py-4 py-lg-5">
 {/* Hero Section */}
 <div className="animate-on-scroll">
 <HeroSection place={placeData} />
 </div>

 <h2 className="display-6 fw-extrabold mb-4 mb-lg-5 animate-on-scroll">
 Accessibility Highlights
 </h2>

 <div className="row g-4 g-lg-5">
 {/* المحتوى الرئيسي */}
 <div className="col-12 col-lg-8 d-flex flex-column gap-4 gap-lg-5">
 {/* About Section */}
 <div className="animate-on-scroll hover-lift rounded-4">
 <AboutSection description={description} features={features} />
 </div>

 {/* Community Reviews */}
 <div className="animate-on-scroll hover-lift rounded-4">
 <CommunityReviews
 reviews={reviews}
 rating={rating}
 reviewCount={reviewCount + 1} // لاحتساب المراجعة المضافة
 currentUser={dummyUser} // ← تمرير الحساب الوهمي
 />
 </div>
 </div>

 {/* Sidebar */}
 <div className="col-12 col-lg-4">
 <div className="animate-on-scroll hover-lift rounded-4">
 <DriversSidebar drivers={drivers} />
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}