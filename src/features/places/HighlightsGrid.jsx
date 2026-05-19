import Icon from "../../components/common/Icon";

export default function HighlightsGrid({ features }) {
  return (
    <section className="mb-5 p-4 p-sm-5 bg-light rounded-3 border">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h5 fw-semibold text-dark mb-0">Accessibility Features</h2>
        <span className="badge bg-teal-subtle text-teal border border-teal rounded-pill small">
          {features.length} confirmed
        </span>
      </div>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-8 g-3">
        {features.map(({ icon, label }) => (
          <div key={icon} className="col">
            <div className="d-flex flex-column align-items-center text-center p-3 bg-white rounded-3 border hover-border-teal hover-shadow-sm transition-all">
              <div className="d-flex align-items-center justify-content-center rounded-circle bg-teal bg-opacity-10" style={{ width: '2.5rem', height: '2.5rem' }}>
                <Icon name={icon} className="text-teal" style={{ fontSize: '1.25rem' }} />
              </div>
              <span className="small fw-medium text-secondary mt-2">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}