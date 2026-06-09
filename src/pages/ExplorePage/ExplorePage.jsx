import { useState, useCallback, useMemo } from "react";
import styles from "./ExplorePage.module.css";
import { useFetchPlaces } from "../../hooks/useFetchPlaces";
import ExploreSearch from "../../features/explore/components/ExploreSearch/ExploreSearch";
import CategoryFilter from "../../features/explore/components/CategoryFilter/CategoryFilter";
import PlacesList from "../../features/explore/components/PlacesList/PlacesList";
import ExploreMap from "../../features/explore/components/ExploreMap/ExploreMap";

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [sortByDistance, setSortByDistance] = useState(false);

  const { places, loading, error, userLocation } = useFetchPlaces(category, search);

  const memoizedPlaces = useMemo(() => places, [places]);

  const displayedPlaces = useMemo(() => {
    if (!sortByDistance || !userLocation) {
      return memoizedPlaces;
    }
    
    return [...memoizedPlaces].map((place) => ({
      ...place,
      calculatedDistance: getDistance(
        userLocation.lat,
        userLocation.lng,
        place.lat,
        place.lng
      ),
    })).sort((a, b) => a.calculatedDistance - b.calculatedDistance);
  }, [memoizedPlaces, userLocation, sortByDistance]);

  const handleSetSelectedPlace = useCallback((place) => {
    setSelectedPlace(place);
  }, []);

  if (error) {
    return (
      <div className="explore-page container">
        <h1 className={styles.exploreH1}>Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="explore-page container">
      <h1 className={styles.exploreH1}>
        Explore accessible destinations
      </h1>

      <ExploreSearch
        search={search}
        setSearch={setSearch}
      />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />

      <div className="row mt-4">
        <div className="col-lg-7 mb-4">
          <ExploreMap
            places={displayedPlaces}
            selectedPlace={selectedPlace}
            setSelectedPlace={handleSetSelectedPlace}
            loading={loading}
            userLocation={userLocation}
            sortByDistance={sortByDistance}
            setSortByDistance={setSortByDistance}
          />
        </div>

        <div className="col-lg-5">
          <PlacesList
            places={displayedPlaces}
            selectedPlace={selectedPlace}
            setSelectedPlace={handleSetSelectedPlace}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;