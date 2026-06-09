import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/places";

export const useFetchPlaces = (category = "All", search = "") => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location permission denied");
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = API_URL;
        const params = new URLSearchParams();

        if (category !== "All") {
          params.append("category", category);
        }

        if (search) {
          params.append("search", search);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await axios.get(url);
        
        const normalizedPlaces = response.data.data.map(place => ({
          ...place,
          lat: place.lat || place.latitude,
          lng: place.lng || place.longitude,
        }));

        setPlaces(normalizedPlaces);
      } catch (err) {
        setError(err.message);
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [category, search]);

  return { places, loading, error, userLocation };
};