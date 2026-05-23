import styles from './ReviewsPage.module.css'

function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      user: 'Sara Khalifa',
      place: 'Cairo Mall',
      rating: 5,
      comment: 'Amazing accessibility and ramps.',
    },
    {
      id: 2,
      user: 'Ali Hassan',
      place: 'Smart Village',
      rating: 4,
      comment: 'Good experience overall.',
    },
    {
      id: 3,
      user: 'Mona Ahmed',
      place: 'City Center',
      rating: 2,
      comment: 'Needs better wheelchair access.',
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Reviews Management</h1>
          <p>Monitor all users reviews and reports.</p>
        </div>
      </div>

      <div className={styles.reviewsGrid}>
        {reviews.map((review) => (
          <div
            key={review.id}
            className={styles.card}
          >
            <div className={styles.top}>
              <h3>{review.user}</h3>
              <span>{'⭐'.repeat(review.rating)}</span>
            </div>

            <h4>{review.place}</h4>

            <p>{review.comment}</p>

            <div className={styles.actions}>
              <button>View</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewsPage