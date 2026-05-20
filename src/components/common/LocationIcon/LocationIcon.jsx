import styles from "./LocationIcon.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationButton = () => {
  return (
    <button className={styles.floatBtn}>
      <FaMapMarkerAlt />
    </button>
  );
};

export default LocationButton;