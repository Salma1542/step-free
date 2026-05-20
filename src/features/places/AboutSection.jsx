import { useState } from "react";
import Icon from "../../components/common/Icon";

export default function AboutSection({ description, features }) {
  const [expanded, setExpanded] = useState(false);
  const previewLength = 200;
  const preview = description.slice(0, previewLength);

  return (
    <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 p-lg-5">
      <h3 className="card-title h4 fw-bold mb-3">About This Location</h3>
      <p className="card-text text-secondary lh-lg" style={{ fontSize: "0.95rem" }}>
        {expanded ? description : preview + (description.length > previewLength ? "…" : "")}
      </p>
      {description.length > previewLength && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="btn btn-link text-teal fw-semibold p-0"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      <hr className="my-4" />

      <div className="row g-3">
        {features.map((feature, idx) => (
          <div key={idx} className="col-12 col-sm-6">
            <div className="d-flex align-items-start gap-3 p-3 rounded-3 hover-bg-light">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-light"
                style={{ width: 40, height: 40 }}
              >
                <Icon name={feature.icon} className="fs-5 text-secondary" />
              </div>
              <div>
                <p className="fw-semibold mb-0 lh-sm">{feature.label}</p>
                <small className="text-muted">{feature.subtext || "Accessibility feature"}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}