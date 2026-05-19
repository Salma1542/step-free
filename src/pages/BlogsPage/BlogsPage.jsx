// import { useState, useCallback } from "react";
// import organizations from "../../features/organizations/data/organizations.json";
// import OrganizationCard from "../../features/organizations/OrganizationCard";
// import backgroundImage from "../assets/background.png";  // تأكد من وجود الصورة في assets/
// import "./BlogsPage.css";

// export default function BlogsPage() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(null);
//   const [animating, setAnimating] = useState(false);

//   const navigate = useCallback(
//     (delta) => {
//       if (animating) return;
//       setAnimating(true);
//       setDirection(delta > 0 ? "right" : "left");
//       setTimeout(() => {
//         setCurrentIndex((prev) =>
//           (prev + delta + organizations.length) % organizations.length
//         );
//         setDirection(null);
//         setAnimating(false);
//       }, 280);
//     },
//     [animating]
//   );

//   if (!organizations.length) {
//     return (
//       <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>
//         No organizations found.
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         position: 'relative',
//         minHeight: '100vh',
//         overflow: 'hidden',
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       <div
//         style={{
//           position: 'absolute',
//           inset: 0,
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           zIndex: 0,
//         }}
//       />
//       <div
//         aria-hidden="true"
//         style={{
//           position: 'absolute',
//           inset: 0,
//           zIndex: 1,
//         }}
//       />
//       <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
//         <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50%', height: '60%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(15,118,110,0.22) 0%, transparent 70%)', filter: 'blur(40px)' }} />
//         <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '45%', height: '55%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(31,168,159,0.16) 0%, transparent 70%)', filter: 'blur(48px)' }} />
//       </div>
//       <div
//         style={{
//           position: 'relative',
//           zIndex: 3,
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: '3rem 1.5rem 2.5rem',
//           fontFamily: 'var(--font-body, sans-serif)',
//         }}
//       >
//         <div
//           style={{
//             textAlign: 'center',
//             maxWidth: '42rem',
//             marginBottom: '2.5rem',
//             animation: 'fadeUp 0.6s cubic-bezier(0.25,1,0.5,1) both',
//           }}
//         >
//           <h1
//             style={{
//               fontFamily: 'var(--font-display, sans-serif)',
//               fontWeight: 800,
//               fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
//               lineHeight: 1.12,
//               letterSpacing: '-0.03em',
//               color: '#ffffff',
//               marginBottom: '0.9rem',
//               textShadow: '0 2px 24px rgba(0,0,0,0.4)',
//             }}
//           >
//             Organizations Supporting{' '}
//             <span style={{ color: '#1fa89f' }}>
//               People with Special Needs
//             </span>
//           </h1>
//           <p
//             style={{
//               fontSize: '0.9375rem',
//               lineHeight: 1.75,
//               color: 'rgba(255,255,255,0.52)',
//               maxWidth: '34rem',
//               margin: '0 auto',
//             }}
//           >
//             Discover trusted organizations and initiatives dedicated to improving
//             accessibility, inclusion, and quality of life for people with disabilities.
//           </p>
//         </div>
//         <div
//           style={{
//             position: 'relative',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: '100%',
//             maxWidth: '78rem',
//             animation: 'fadeUp 0.6s 0.1s cubic-bezier(0.25,1,0.5,1) both',
//           }}
//         >
//           <button
//             onClick={() => navigate(-1)}
//             aria-label="Previous organization"
//             style={{
//               position: 'absolute',
//               left: 0,
//               zIndex: 10,
//               flexShrink: 0,
//               width: '3.5rem',
//               height: '3.5rem',
//               borderRadius: '50%',
//               border: '1px solid rgba(255,255,255,0.18)',
//               background: 'rgba(4,20,20,0.7)',
//               backdropFilter: 'blur(12px)',
//               WebkitBackdropFilter: 'blur(12px)',
//               color: '#fff',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               transition: 'all 0.2s',
//               boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
//             }}
//             onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15,118,110,0.55)'; e.currentTarget.style.borderColor = 'rgba(31,168,159,0.45)'; }}
//             onMouseLeave={e => { e.currentTarget.style.background = 'rgba(4,20,20,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//               <path d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <div
//             style={{
//               flex: 1,
//               margin: '0 5rem',
//               transition: 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.25,1,0.5,1)',
//               opacity: animating ? 0 : 1,
//               transform: animating
//                 ? `translateX(${direction === 'right' ? '-28px' : '28px'})`
//                 : 'translateX(0)',
//             }}
//           >
//             <OrganizationCard org={organizations[currentIndex]} />
//           </div>
//           <button
//             onClick={() => navigate(1)}
//             aria-label="Next organization"
//             style={{
//               position: 'absolute',
//               right: 0,
//               zIndex: 10,
//               flexShrink: 0,
//               width: '3.5rem',
//               height: '3.5rem',
//               borderRadius: '50%',
//               border: '1px solid rgba(255,255,255,0.18)',
//               background: 'rgba(4,20,20,0.7)',
//               backdropFilter: 'blur(12px)',
//               WebkitBackdropFilter: 'blur(12px)',
//               color: '#fff',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               transition: 'all 0.2s',
//               boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
//             }}
//             onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15,118,110,0.55)'; e.currentTarget.style.borderColor = 'rgba(31,168,159,0.45)'; }}
//             onMouseLeave={e => { e.currentTarget.style.background = 'rgba(4,20,20,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//               <path d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: '0.6rem',
//             marginTop: '1.75rem',
//             animation: 'fadeUp 0.6s 0.18s cubic-bezier(0.25,1,0.5,1) both',
//           }}
//         >
//           <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
//             {organizations.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => { if (!animating) setCurrentIndex(idx); }}
//                 aria-label={`Go to organization ${idx + 1}`}
//                 aria-current={idx === currentIndex ? 'true' : undefined}
//                 style={{
//                   width: idx === currentIndex ? '1.75rem' : '0.5rem',
//                   height: '0.5rem',
//                   borderRadius: '999px',
//                   border: 'none',
//                   background: idx === currentIndex ? '#1fa89f' : 'rgba(255,255,255,0.28)',
//                   cursor: 'pointer',
//                   padding: 0,
//                   transition: 'all 0.3s cubic-bezier(0.25,1,0.5,1)',
//                 }}
//               />
//             ))}
//           </div>
//           <span
//             style={{
//               fontSize: '0.72rem',
//               color: 'rgba(255,255,255,0.3)',
//               fontFamily: 'var(--font-display, sans-serif)',
//               fontWeight: 500,
//               letterSpacing: '0.06em',
//             }}
//           >
//             {currentIndex + 1} / {organizations.length}
//           </span>
//         </div>
//       </div>
//       <style>{`
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(18px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }



