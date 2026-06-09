// import { useState, useEffect } from "react";
// import ReviewCard from "./ReviewCard";
// import StarRating from "../../components/common/StarRating";
// import Icon from "../../components/common/Icon";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function CommunityReviews({ placeId }) {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editingReviewId, setEditingReviewId] = useState(null);
//   const [newRating, setNewRating] = useState(0);
//   const [newText, setNewText] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const token = localStorage.getItem("token");

//   const fetchReviews = async () => {
//     try {
//       const res = await fetch(`/api/places/${placeId}/reviews`);
//       const data = await res.json();
//       if (data.success) setReviews(data.data);
//     } catch (err) {
//       console.error("Failed to fetch reviews", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [placeId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newText.trim() || newRating === 0) return;
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       let url, method;
//       if (editMode && editingReviewId) {
//         url = `/api/reviews/${editingReviewId}`;
//         method = "PUT";
//       } else {
//         url = `/api/places/${placeId}/reviews`;
//         method = "POST";
//       }

//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ rating: newRating, comment: newText.trim() }),
//       });

//       if (res.status === 401) {
//         localStorage.removeItem("token");
//         navigate("/login");
//         return;
//       }

//       const data = await res.json();
//       if (data.success) {
//         if (editMode) {
//           setReviews((prev) =>
//             prev.map((r) => (r._id === editingReviewId ? data.data : r))
//           );
//         } else {
//           setReviews((prev) => [data.data, ...prev]);
//         }
//         resetForm();
//       } else {
//         alert(data.message || "Failed to submit review");
//       }
//     } catch (err) {
//       console.error("Submit error", err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (reviewId) => {
//     if (!window.confirm("Delete this review?")) return;
//     try {
//       const res = await fetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.status === 401) {
//         localStorage.removeItem("token");
//         navigate("/login");
//         return;
//       }
//       const data = await res.json();
//       if (data.success) {
//         setReviews((prev) => prev.filter((r) => r._id !== reviewId));
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error("Delete error", err);
//     }
//   };

//   const startEdit = (review) => {
//     setEditMode(true);
//     setEditingReviewId(review._id);
//     setNewRating(review.rating);
//     setNewText(review.comment);
//     setShowForm(true);
//   };

//   const resetForm = () => {
//     setShowForm(false);
//     setEditMode(false);
//     setEditingReviewId(null);
//     setNewRating(0);
//     setNewText("");
//   };

//   // حساب التقييمات
//   const avgRating =
//     reviews.length > 0
//       ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
//       : "0.0";

//   const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
//     const count = reviews.filter((r) => r.rating === star).length;
//     return {
//       stars: star,
//       percent: reviews.length ? Math.round((count / reviews.length) * 100) : 0,
//     };
//   });

//   if (loading) {
//     return <div className="text-center py-3">Loading reviews...</div>;
//   }

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
//         <h3 className="h3 fw-bold mb-0">Community Reviews</h3>
//         <div className="d-flex align-items-center gap-2">
//           <Icon name="star" filled className="text-warning fs-5" />
//           <span className="fw-bold fs-5">{avgRating}</span>
//           <span className="text-muted">· {reviews.length} reviews</span>
//         </div>
//       </div>

//       <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 mb-4 hover-lift">
//         <div className="row align-items-center g-4">
//           <div className="col-auto">
//             <span className="display-3 fw-extrabold lh-1">{avgRating}</span>
//             <div className="mt-2">
//               <StarRating rating={Math.round(avgRating)} size={20} />
//             </div>
//             <small className="text-muted">out of 5</small>
//           </div>
//           <div className="col">
//             {ratingDistribution.map((bar) => (
//               <div key={bar.stars} className="d-flex align-items-center gap-2 mb-2">
//                 <span className="fw-medium" style={{ width: 28 }}>{bar.stars} ★</span>
//                 <div className="progress flex-grow-1" style={{ height: 6 }}>
//                   <div
//                     className="progress-bar bg-warning"
//                     style={{ width: `${bar.percent}%`, borderRadius: "inherit" }}
//                   />
//                 </div>
//                 <small className="text-muted" style={{ width: 32 }}>{bar.percent}%</small>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {user && !showForm && (
//         <button
//           className="btn btn-teal fw-semibold px-4 mb-3 hover-lift"
//           onClick={() => {
//             setShowForm(true);
//             setEditMode(false);
//             setNewRating(0);
//             setNewText("");
//           }}
//         >
//           Write a Review
//         </button>
//       )}

//       {!user && (
//         <button
//           className="btn btn-outline-teal fw-semibold px-4 mb-3"
//           onClick={() => navigate("/login")}
//         >
//           Log in to write a review
//         </button>
//       )}

//       {showForm && (
//         <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 mb-3 hover-lift">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label fw-semibold d-block">
//                 {editMode ? "Update your rating" : "Your Rating"}
//               </label>
//               <div className="d-flex gap-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     className="btn p-0 border-0 bg-transparent"
//                     onClick={() => setNewRating(star)}
//                   >
//                     <Icon
//                       name="star"
//                       filled={star <= newRating}
//                       className={star <= newRating ? "text-warning fs-4" : "text-warning fs-4"}
//                     />
//                   </button>
//                 ))}
//               </div>
//               {newRating > 0 && (
//                 <small className="ms-2 text-muted">{newRating} / 5</small>
//               )}
//             </div>
//             <div className="mb-3">
//               <label className="form-label fw-semibold">
//                 {editMode ? "Update your review" : "Your Review"}
//               </label>
//               <textarea
//                 className="form-control rounded-3"
//                 rows="4"
//                 placeholder="Share your experience…"
//                 value={newText}
//                 onChange={(e) => setNewText(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="d-flex gap-2">
//               <button type="submit" className="btn btn-teal fw-semibold px-4" disabled={submitting}>
//                 {submitting ? "Submitting..." : editMode ? "Update Review" : "Submit Review"}
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary fw-semibold px-4"
//                 onClick={resetForm}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {reviews.length === 0 ? (
//         <div className="text-muted text-center py-3">No reviews yet. Be the first!</div>
//       ) : (
//         <div className="d-flex flex-column gap-3">
//           {reviews.map((review) => (
//             <div key={review._id}>
//               <ReviewCard review={review} />
//               {user && review.user && review.user._id === user._id && (
//                 <div className="mt-2 d-flex gap-2">
//                   <button
//                     className="btn btn-sm btn-outline-teal"
//                     onClick={() => startEdit(review)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={() => handleDelete(review._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }











import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import StarRating from "../../components/common/StarRating";
import Icon from "../../components/common/Icon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CommunityReviews({ placeId }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  // حالة النموذج لإضافة مراجعة جديدة (أعلى الصفحة)
  const [showNewForm, setShowNewForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState("");
  // حالة التعديل المضمن
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editText, setEditText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/places/${placeId}/reviews`);
      const data = await res.json();
      if (data.success) setReviews(data.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [placeId]);

  // إرسال مراجعة جديدة
  const handleNewSubmit = async (e) => {
    e.preventDefault();
    if (!newText.trim() || newRating === 0) return;
    if (!user) {
      navigate("/login");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/places/${placeId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: newRating, comment: newText.trim() }),
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => [data.data, ...prev]);
        setShowNewForm(false);
        setNewRating(0);
        setNewText("");
      } else {
        alert(data.message || "Failed to submit review");
      }
    } catch (err) {
      console.error("Submit error", err);
    } finally {
      setSubmitting(false);
    }
  };

  // إرسال تعديل مراجعة
  const handleEditSubmit = async (e, reviewId) => {
    e.preventDefault();
    if (!editText.trim() || editRating === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: editRating, comment: editText.trim() }),
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setReviews((prev) =>
          prev.map((r) => (r._id === reviewId ? data.data : r))
        );
        cancelEdit();
      } else {
        alert(data.message || "Failed to update review");
      }
    } catch (err) {
      console.error("Update error", err);
    } finally {
      setSubmitting(false);
    }
  };

  // حذف مراجعة
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  // بدء تعديل (يظهر النموذج تحت المراجعة)
  const startEdit = (review) => {
    setEditingReviewId(review._id);
    setEditRating(review.rating);
    setEditText(review.comment);
  };

  // إلغاء التعديل
  const cancelEdit = () => {
    setEditingReviewId(null);
    setEditRating(0);
    setEditText("");
  };

  // الإحصائيات
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return {
      stars: star,
      percent: reviews.length ? Math.round((count / reviews.length) * 100) : 0,
    };
  });

  if (loading) {
    return <div className="text-center py-3">Loading reviews...</div>;
  }

  return (
    <div>
      {/* العنوان والتقييم العام */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3 className="h3 fw-bold mb-0">Community Reviews</h3>
        <div className="d-flex align-items-center gap-2">
          <Icon name="star" filled className="text-warning fs-5" />
          <span className="fw-bold fs-5">{avgRating}</span>
          <span className="text-muted">· {reviews.length} reviews</span>
        </div>
      </div>

      {/* بطاقة الإحصائيات */}
      <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 mb-4 hover-lift">
        <div className="row align-items-center g-4">
          <div className="col-auto">
            <span className="display-3 fw-extrabold lh-1">{avgRating}</span>
            <div className="mt-2">
              <StarRating rating={Math.round(avgRating)} size={20} />
            </div>
            <small className="text-muted">out of 5</small>
          </div>
          <div className="col">
            {ratingDistribution.map((bar) => (
              <div key={bar.stars} className="d-flex align-items-center gap-2 mb-2">
                <span className="fw-medium" style={{ width: 28 }}>{bar.stars} ★</span>
                <div className="progress flex-grow-1" style={{ height: 6 }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${bar.percent}%`, borderRadius: "inherit" }}
                  />
                </div>
                <small className="text-muted" style={{ width: 32 }}>{bar.percent}%</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* زر كتابة مراجعة جديدة */}
      {user && !showNewForm && (
        <button
          className="btn btn-teal fw-semibold px-4 mb-3 hover-lift"
          onClick={() => setShowNewForm(true)}
        >
          Write a Review
        </button>
      )}

      {!user && (
        <button
          className="btn btn-outline-teal fw-semibold px-4 mb-3"
          onClick={() => navigate("/login")}
        >
          Log in to write a review
        </button>
      )}

      {/* نموذج إضافة مراجعة جديدة (أعلى القائمة) */}
      {showNewForm && (
        <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 mb-3 hover-lift">
          <form onSubmit={handleNewSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold d-block">Your Rating</label>
              <div className="d-flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="btn p-0 border-0 bg-transparent"
                    onClick={() => setNewRating(star)}
                  >
                    <Icon
                      name="star"
                      filled={star <= newRating}
                      className={star <= newRating ? "text-warning fs-4" : "text-warning fs-4"}
                    />
                  </button>
                ))}
              </div>
              {newRating > 0 && (
                <small className="ms-2 text-muted">{newRating} / 5</small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Your Review</label>
              <textarea
                className="form-control rounded-3"
                rows="4"
                placeholder="Share your experience…"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                required
              />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-teal fw-semibold px-4" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary fw-semibold px-4"
                onClick={() => {
                  setShowNewForm(false);
                  setNewRating(0);
                  setNewText("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* قائمة المراجعات */}
         {/* قائمة المراجعات */}
      {reviews.length === 0 ? (
        <div className="text-muted text-center py-3">No reviews yet. Be the first!</div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {reviews.map((review) => (
            <div key={review._id}>
              <ReviewCard
                review={review}
                isOwner={user && review.user && review.user._id === user._id}
                onEdit={() => startEdit(review)}
                onDelete={() => handleDelete(review._id)}
              />
              {editingReviewId === review._id && (
                <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 mt-2 hover-lift">
                  <form onSubmit={(e) => handleEditSubmit(e, review._id)}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold d-block">Update your rating</label>
                      <div className="d-flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="btn p-0 border-0 bg-transparent"
                            onClick={() => setEditRating(star)}
                          >
                            <Icon
                              name="star"
                              filled={star <= editRating}
                              className={star <= editRating ? "text-warning fs-4" : "text-warning fs-4"}
                            />
                          </button>
                        ))}
                      </div>
                      {editRating > 0 && (
                        <small className="ms-2 text-muted">{editRating} / 5</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Update your review</label>
                      <textarea
                        className="form-control rounded-3"
                        rows="4"
                        placeholder="Update your experience…"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-teal fw-semibold px-4"
                        disabled={submitting}
                      >
                        {submitting ? "Updating..." : "Update Review"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary fw-semibold px-4"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>  
  );
}