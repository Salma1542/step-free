// import StarRating from "../../components/common/StarRating";

// export default function ReviewCard({ review }) {
//   return (
//     <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 hover-lift">
//       <div className="d-flex align-items-center gap-3 mb-3">
//         <div
//           className="rounded-circle overflow-hidden"
//           style={{ width: 44, height: 44 }}
//         >
//           <img
//             src={review.avatarSrc}
//             alt={review.avatarAlt}
//             className="w-100 h-100 object-fit-cover"
//             loading="lazy"
//           />
//         </div>
//         <div>
//           <p className="fw-semibold mb-1">{review.author}</p>
//           <StarRating rating={review.rating} size={14} />
//         </div>
//       </div>
//       <p className="text-secondary fst-italic mb-0">“{review.text}“</p>
//     </div>
//   );
// }




import StarRating from "../../components/common/StarRating";

export default function ReviewCard({ review }) {
  // بيانات المستخدم من review.user (بعد populate)
  const user = review.user || {};
  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const initials =
    firstName && lastName
      ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
      : "?";

  const avatarSrc = user.profileImage;
  // إذا لم توجد صورة حقيقية نعرض الأحرف الأولى
  const showAvatar =
    avatarSrc &&
    avatarSrc !== "https://res.cloudinary.com/demo/image/upload/default-profile.png";

  return (
    <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 hover-lift">
      <div className="d-flex align-items-center gap-3 mb-3">
        {showAvatar ? (
          <img
            src={avatarSrc}
            alt={fullName}
            className="rounded-circle"
            style={{ width: 44, height: 44, objectFit: "cover" }}
            loading="lazy"
          />
        ) : (
          <div
            className="rounded-circle bg-teal text-white d-flex align-items-center justify-content-center fw-bold"
            style={{ width: 44, height: 44, fontSize: 16 }}
          >
            {initials}
          </div>
        )}
        <div>
          <p className="fw-semibold mb-1">{fullName || "Anonymous"}</p>
          <StarRating rating={review.rating} size={14} />
        </div>
      </div>
      <p className="text-secondary fst-italic mb-0">“{review.comment}“</p>
    </div>
  );
}