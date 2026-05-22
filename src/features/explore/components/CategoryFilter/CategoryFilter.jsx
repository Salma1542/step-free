import { useState } from "react";
import styles from "./CategoryFilter.module.css";

const categories = [
  { label: "All", icon: "ti-layout-grid" },
  { label: "Restaurant", icon: "ti-tools-kitchen-2" },
  { label: "Hospital", icon: "ti-building-hospital" },
  { label: "Mall", icon: "ti-building-store" },
  { label: "Hotel", icon: "ti-bed" },
  { label: "Cafe", icon: "ti-coffee" },
  { label: "Bank", icon: "ti-building-bank" },
];

function CategoryFilter({ category, setCategory }) {
  const [open, setOpen] = useState(false);

  const activeItem = categories.find((c) => c.label === category);

  const handleSelect = (label) => {
    setCategory(label);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>

      {/* Desktop Categories */}
      <div className={styles.desktopList}>
        {categories.map((cat, index) => (
          <button
            key={cat.label}
            onClick={() => setCategory(cat.label)}
            className={`${styles.catBtn} ${
              category === cat.label ? styles.active : ""
            }`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <i className={`ti ${cat.icon}`} aria-hidden="true" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mobile Filter */}
      <div className={styles.mobileFilter}>
        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
        >
          <i className={`ti ${activeItem?.icon}`} aria-hidden="true" />
          {category}
          <i
            className={`ti ${
              open ? "ti-chevron-up" : "ti-chevron-down"
            }`}
            aria-hidden="true"
          />
        </button>

        {open && (
          <div className={styles.dropdown}>
            {categories.map((cat, index) => (
              <button
                key={cat.label}
                onClick={() => handleSelect(cat.label)}
                className={`${styles.catBtn} ${
                  category === cat.label ? styles.active : ""
                }`}
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <i className={`ti ${cat.icon}`} aria-hidden="true" />
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default CategoryFilter;