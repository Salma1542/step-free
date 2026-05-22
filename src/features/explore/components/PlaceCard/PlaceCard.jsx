
import styles from "./PlaceCard.module.css";

function PlaceCard({ place, isSelected, onClick }) {
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <img
      src={place.image}
        alt={place.name}
        className={styles.img}
      />

      <div className={styles.info}>
        <div className={styles.cardHeader}>
          <h5 className={styles.name}>{place.name}</h5>
          <small className={styles.distance}>{place.distance}</small>
        </div>

        <p className={styles.type}>{place.type} · {place.area}</p>

        <div className={styles.tags}>
          {place.tags.map((tag, i) => (
            <span key={i} className={styles.tag}>
              <i className="ti ti-check" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
