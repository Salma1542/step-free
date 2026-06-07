import styles from "./LocationIcon.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LocationButton = () => {
  const navigate = useNavigate();

  const handleLocationClick = () => {
    navigate("/explore");
  };

  return (
    <button 
      className={styles.floatBtn} 
      title="My Location" 
      aria-label="Show my location"
      onClick={handleLocationClick}
    >
      <FaMapMarkerAlt />
    </button>
  );
};

export default LocationButton;