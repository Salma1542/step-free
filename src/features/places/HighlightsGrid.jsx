

// import Icon from "../../components/common/Icon";

// // خريطة تربط نص الميزة (بالإنجليزية الصغيرة) باسم الأيقونة المناسب
// const featureIconMap = {
//   "ramp": "wheelchair",          // أو "accessible-icon"
//   "elevator": "elevator",
//   "wide entrance": "door-open",
//   "parking": "parking",
//   "accessible bathroom": "restroom",
//   "ac": "snowflake",
//   // أضف المزيد حسب احتياجك
// };

// // دالة للحصول على اسم الأيقونة المناسب للميزة
// function getIconName(feature) {
//   const label = feature.label?.toLowerCase() || "";
//   // البحث في الخريطة أولاً
//   if (featureIconMap[label]) {
//     return featureIconMap[label];
//   }
//   // إذا لم توجد، استخدم الحقل icon الموجود (قد يكون صالحًا مباشرة)
//   return feature.icon || "check-circle";
// }

// export default function HighlightsGrid({ features }) {
//   return (
//     <section className="mb-5 p-4 p-sm-5 bg-light rounded-3 border">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="h5 fw-semibold text-dark mb-0">
//           Accessibility Features
//         </h2>
//         <span className="badge bg-teal-subtle text-teal border border-teal rounded-pill small">
//           {features?.length || 0} confirmed
//         </span>
//       </div>

//       {!features || features.length === 0 ? (
//         <p className="text-muted text-center mb-0">
//           No accessibility features recorded yet.
//         </p>
//       ) : (
//         <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-8 g-3">
//           {features.map((feature) => {
//             const iconName = getIconName(feature);
//             return (
//               <div key={feature.icon + feature.label} className="col">
//                 <div className="d-flex flex-column align-items-center text-center p-3 bg-white rounded-3 border hover-border-teal hover-shadow-sm transition-all">
//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-circle bg-teal bg-opacity-10"
//                     style={{ width: "2.5rem", height: "2.5rem" }}
//                   >
//                     <Icon
//                       name={iconName}
//                       className="text-teal"
//                       style={{ fontSize: "1.25rem" }}
//                     />
//                   </div>
//                   <span className="small fw-medium text-secondary mt-2">
//                     {feature.label}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </section>
//   );
// }








// import {
//   MdAccessibilityNew,
//   MdElevator,
//   MdDoorSliding,
//   MdLocalParking,
//   MdWc,
//   MdAcUnit,
//   MdBraille,
//   MdHearing,
//   MdPets,
//   MdCheckCircle,
// } from "react-icons/md";

// // خريطة تربط نص الميزة (lowercase) بمكون الأيقونة من Material Design
// const featureIconMap = {
//   "ramp": MdAccessibilityNew,        // أيقونة إتاحة عامة (كرسي متحرك)
//   "elevator": MdElevator,
//   "wide entrance": MdDoorSliding,    // باب منزلق (يمثل مدخل واسع)
//   "parking": MdLocalParking,
//   "accessible bathroom": MdWc,
//   "ac": MdAcUnit,
//   "braille": MdBraille,
//   "hearing loop": MdHearing,
//   "service animal": MdPets,
// };

// // دالة إرجاع الأيقونة المناسبة
// function getIconComponent(feature) {
//   const label = feature.label?.toLowerCase().trim() || "";
//   return featureIconMap[label] || MdCheckCircle; // أيقونة افتراضية
// }

// export default function HighlightsGrid({ features }) {
//   if (!features || features.length === 0) {
//     return (
//       <section className="mb-5 p-4 p-sm-5 bg-light rounded-3 border">
//         <div className="text-center">
//           <h2 className="h5 fw-semibold text-dark mb-3">Accessibility Features</h2>
//           <p className="text-muted mb-0">No accessibility features recorded yet.</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="mb-5 p-4 p-sm-5 bg-light rounded-3 border">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="h5 fw-semibold text-dark mb-0">
//           Accessibility Features
//         </h2>
//         <span className="badge bg-teal-subtle text-teal border border-teal rounded-pill small">
//           {features.length} confirmed
//         </span>
//       </div>

//       <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-8 g-3">
//         {features.map((feature, index) => {
//           const IconComponent = getIconComponent(feature);
//           return (
//             <div key={`${feature.label}-${index}`} className="col">
//               <div className="d-flex flex-column align-items-center text-center p-3 bg-white rounded-3 border hover-border-teal hover-shadow-sm transition-all">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-circle bg-teal bg-opacity-10"
//                   style={{ width: "2.5rem", height: "2.5rem" }}
//                 >
//                   <IconComponent className="text-teal" style={{ fontSize: "1.25rem" }} />
//                 </div>
//                 <span className="small fw-medium text-secondary mt-2">
//                   {feature.label}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }




// // لا نحتاج أي استيراد لأيقونات - فقط خط Material Symbols

// // خريطة تترجم التسمية (lowercase) إلى اسم الأيقونة في Material Symbols
// const featureIconMap = {
//   "ramp": "accessible",          // أيقونة وصول لذوي الاحتياجات الخاصة (كرسي متحرك)
//   "elevator": "elevator",
//   "wide entrance": "door_open",  // باب مفتوح يدل على مدخل واسع
//   "parking": "local_parking",
//   "accessible bathroom": "wc",   // حمام مخصص
//   "ac": "ac_unit",
//   "braille": "braille",
//   "hearing loop": "hearing",
//   "service animal": "pets",      // حيوانات الخدمة
// };

// // دالة ترجع اسم الأيقونة الصحيح
// function getIconName(feature) {
//   const label = feature.label?.toLowerCase().trim() || "";
//   return featureIconMap[label] || "check_circle"; // أيقونة افتراضية
// }

// export default function HighlightsGrid({ features }) {
//   if (!features || features.length === 0) {
//     return (
//       <section className="mb-5 p-4 p-sm-5 bg-light rounded-3 border">
//         <div className="text-center">
//           <h2 className="h5 fw-semibold text-dark mb-3">Accessibility Features</h2>
//           <p className="text-muted mb-0">No accessibility features recorded yet.</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="mb-5 p-4 p-sm-5 bg-light rounded-3 border">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="h5 fw-semibold text-dark mb-0">
//           Accessibility Features
//         </h2>
//         <span className="badge bg-teal-subtle text-teal border border-teal rounded-pill small">
//           {features.length} confirmed
//         </span>
//       </div>

//       <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-8 g-3">
//         {features.map((feature, index) => {
//           const iconName = getIconName(feature);
//           return (
//             <div key={`${feature.label}-${index}`} className="col">
//               <div className="d-flex flex-column align-items-center text-center p-3 bg-white rounded-3 border hover-border-teal hover-shadow-sm transition-all">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-circle bg-teal bg-opacity-10"
//                   style={{ width: "2.5rem", height: "2.5rem" }}
//                 >
//                   {/* استخدام نفس طريقة DriversSidebar */}
//                   <span
//                     className="material-symbols-outlined"
//                     style={{ fontSize: "1.25rem", color: "var(--teal)" }}
//                   >
//                     {iconName}
//                   </span>
//                 </div>
//                 <span className="small fw-medium text-secondary mt-2">
//                   {feature.label}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }








// لا نحتاج أي استيراد لأيقونات - فقط خط Material Symbols

// export default function HighlightsGrid({ features }) {
//   if (!features || features.length === 0) {
//     return (
//       <section className="mb-5 p-4 p-sm-5 bg-light rounded-3 border">
//         <div className="text-center">
//           <h2 className="h5 fw-semibold text-dark mb-3">Accessibility Features</h2>
//           <p className="text-muted mb-0">No accessibility features recorded yet.</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="mb-5 p-4 p-sm-5 bg-light rounded-3 border">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="h5 fw-semibold text-dark mb-0">
//           Accessibility Features
//         </h2>
//         <span className="badge bg-teal-subtle text-teal border border-teal rounded-pill small">
//           {features.length} confirmed
//         </span>
//       </div>

//       <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-8 g-3">
//         {features.map((feature, index) => (
//           <div key={`${feature.label}-${index}`} className="col">
//             <div className="d-flex flex-column align-items-center text-center p-3 bg-white rounded-3 border hover-border-teal hover-shadow-sm transition-all">
//               <div
//                 className="d-flex align-items-center justify-content-center rounded-circle bg-teal bg-opacity-10"
//                 style={{ width: "2.5rem", height: "2.5rem" }}
//               >
//                 {/* أيقونة موحدة: علامة صح لكل الميزات */}
//                 <span
//                   className="material-symbols-outlined"
//                   style={{
//                     fontSize: "1.25rem",
//                     color: "var(--teal, #0d6e6e)",
//                     fontFamily: "'Material Symbols Outlined'",
//                     fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
//                   }}
//                 >
//                   check_circle
//                 </span>
//               </div>
//               <span className="small fw-medium text-secondary mt-2">
//                 {feature.label}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }