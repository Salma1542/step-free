// import StarRating from "../../components/common/StarRating";

// export default function ReviewCard({ review }) {
//   const user = review.user || {};
//   const firstName = user.firstName || "";
//   const lastName = user.lastName || "";
//   const fullName = `${firstName} ${lastName}`.trim();
//   const initials =
//     firstName && lastName
//       ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
//       : "?";

//   const avatarSrc = user.profileImage;
//   const showAvatar =
//     avatarSrc &&
//     avatarSrc !== "https://res.cloudinary.com/demo/image/upload/default-profile.png";

//   return (
//     <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 hover-lift">
//       <div className="d-flex align-items-center gap-3 mb-3">
//         {showAvatar ? (
//           <img
//             src={avatarSrc}
//             alt={fullName}
//             className="rounded-circle"
//             style={{ width: 44, height: 44, objectFit: "cover" }}
//             loading="lazy"
//           />
//         ) : (
//           <div
//             className="rounded-circle bg-teal text-white d-flex align-items-center justify-content-center fw-bold"
//             style={{ width: 44, height: 44, fontSize: 16 }}
//           >
//             {initials}
//           </div>
//         )}
//         <div>
//           <p className="fw-semibold mb-1">{fullName || "Anonymous"}</p>
//           <StarRating rating={review.rating} size={14} />
//         </div>
//       </div>
//       <p className="text-secondary fst-italic mb-0">“{review.comment}“</p>
//     </div>
//   );
// }

















import StarRating from "../../components/common/StarRating";

export default function ReviewCard({ review, isOwner, onEdit, onDelete }) {
  const user = review.user || {};
  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const initials =
    firstName && lastName
      ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
      : "?";

  const avatarSrc = user.profileImage;
  const showAvatar =
    avatarSrc &&
    avatarSrc !== "https://res.cloudinary.com/demo/image/upload/default-profile.png";

  return (
    <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 hover-lift position-relative">
      <div className="d-flex align-items-start gap-3">
        {/* الصورة الرمزية */}
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
            className="rounded-circle bg-teal text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
            style={{ width: 44, height: 44, fontSize: 16 }}
          >
            {initials}
          </div>
        )}

        {/* المحتوى النصي */}
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="fw-semibold mb-1">{fullName || "Anonymous"}</p>
              <StarRating rating={review.rating} size={14} />
            </div>

            {/* أيقونات التعديل والحذف (تظهر فقط لصاحب المراجعة) */}
            {isOwner && (
              <div className="d-flex gap-2 ms-2">
                <button
                  className="btn btn-sm btn-outline-teal border-0 p-1"
                  onClick={onEdit}
                  title="Edit review"
                >
                  <i className="ti ti-edit" style={{ fontSize: "1rem" }}></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger border-0 p-1"
                  onClick={onDelete}
                  title="Delete review"
                >
                  <i className="ti ti-trash" style={{ fontSize: "1rem" }}></i>
                </button>
              </div>
            )}
          </div>
          <p className="text-secondary fst-italic mb-0 mt-2">“{review.comment}“</p>
        </div>
      </div>
    </div>
  );
}