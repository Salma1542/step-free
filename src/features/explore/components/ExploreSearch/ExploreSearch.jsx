import styles from "./ExploreSearch.module.css";

function ExploreSearch({ search, setSearch }) {
  return (
    <div
      className={styles.searchBox}
      data-aos="fade-left"
      data-aos-duration="900"
      data-aos-easing="ease-in-out"
    >
      <i className={`ti ti-search ${styles.icon}`} aria-hidden="true" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Where do you want to go? (e.g., New Cairo, Heliopolis)"
        className={styles.input}
      />
    </div>
  );
}

export default ExploreSearch;