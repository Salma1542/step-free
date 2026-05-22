import { useState } from "react";
import styles from "./ExplorePage.module.css";
import ExploreSearch from "../../features/explore/components/ExploreSearch/ExploreSearch";
import CategoryFilter from "../../features/explore/components/CategoryFilter/CategoryFilter";
import PlacesList from "../../features/explore/components/PlacesList/PlacesList";
import ExploreMap from "../../features/explore/components/ExploreMap/ExploreMap";

import terraceBistro from "../../assets/images/TheTerraceBistro.png";
import eliteCare from "../../assets/images/EliteCareCenter.jpg";
import urbanMall from "../../assets/images/UrbanHeightsMall.jpg";
import cairoHotel from "../../assets/images/CairoGrandHotel.jpg";
import brewCafe from "../../assets/images/BrewCoCafe.jpg";
import nileBank from "../../assets/images/NileBankBranch.jpg";

function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const places = [
    { id: 1, name: "The Terrace Bistro", image: terraceBistro, type: "Restaurant", area: "New Cairo", distance: "0.8 km", tags: ["Ramp", "Elevator"], lat: 30.0500, lng: 31.2400 },
    { id: 2, name: "Elite Care Center", image: eliteCare, type: "Hospital", area: "Heliopolis", distance: "1.2 km", tags: ["Ramp"], lat: 30.0600, lng: 31.2500 },
    { id: 3, name: "Urban Heights Mall", image: urbanMall, type: "Mall", area: "Maadi", distance: "2.5 km", tags: ["Elevator", "Wide Entrance"], lat: 30.0350, lng: 31.2200 },
    { id: 4, name: "Cairo Grand Hotel", image: cairoHotel, type: "Hotel", area: "Maadi", distance: "1.8 km", tags: ["Ramp", "Elevator", "Wide Entrance"], lat: 30.0450, lng: 31.2300 },
    { id: 5, name: "Brew & Co Cafe", image: brewCafe, type: "Cafe", area: "New Cairo", distance: "0.5 km", tags: ["Wide Entrance"], lat: 30.0550, lng: 31.2450 },
    { id: 6, name: "Nile Bank Branch", image: nileBank, type: "Bank", area: "Heliopolis", distance: "1.1 km", tags: ["Ramp", "Elevator"], lat: 30.0480, lng: 31.2380 },
  ];

  const filteredPlaces = places.filter((place) => {
    const q = search.toLowerCase();
    const matchesSearch = q === "" || place.name.toLowerCase().includes(q) || place.area.toLowerCase().includes(q);
    const matchesCategory = category === "All" || place.type === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="explore-page container">
      <h1 className={styles.exploreH1}>Explore accessible destinations</h1>

      <ExploreSearch search={search} setSearch={setSearch} />
      <CategoryFilter category={category} setCategory={setCategory} />

      <div className="row mt-4">
        <div className="col-lg-7 mb-4">
          <ExploreMap
            places={filteredPlaces}
            setSelectedPlace={setSelectedPlace}
            selectedPlace={selectedPlace}
          />
        </div>
        <div className="col-lg-5">
          <PlacesList
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
          />
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;