import styles from './AdminPlacesPage.module.css'

function AdminPlacesPage() {
  const places = [
    {
      id: 1,
      name: 'Cairo Mall',
      city: 'Cairo',
      accessibility: 'Accessible',
      rating: '4.8',
    },
    {
      id: 2,
      name: 'Smart Village',
      city: 'Giza',
      accessibility: 'Partial',
      rating: '4.5',
    },
    {
      id: 3,
      name: 'City Center',
      city: 'Alexandria',
      accessibility: 'Not Accessible',
      rating: '3.9',
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Places Management</h1>
          <p>Manage accessible places on the platform.</p>
        </div>

        <button>Add Place</button>
      </div>

      <div className={styles.grid}>
        {places.map((place) => (
          <div
            key={place.id}
            className={styles.card}
          >
            <div className={styles.top}>
              <span>📍</span>
              <h2>{place.name}</h2>
            </div>

            <p>City: {place.city}</p>
            <p>Accessibility: {place.accessibility}</p>
            <p>Rating: ⭐ {place.rating}</p>

            <div className={styles.actions}>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPlacesPage