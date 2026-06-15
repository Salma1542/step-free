import styles from "./LocationIcon.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const LocationButton = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLocationClick = () => {
    if (user) {
      navigate("/explore");
    } else {
      navigate("/login");
    }
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