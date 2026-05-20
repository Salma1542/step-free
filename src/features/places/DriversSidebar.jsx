import DriverCard from "../driver/DriverCard";
import Icon from "../../components/common/Icon";

export default function DriversSidebar({ drivers }) {
  return (
    <>
      <div className="card bg-teal text-white border-0 rounded-4 p-3 p-sm-4 shadow hover-lift mb-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 bg-white bg-opacity-25"
            style={{ width: 44, height: 44 }}
          >
            <Icon name="directions_car" filled className="fs-4" />
          </div>
          <h3 className="h5 fw-bold mb-0">Accessible Rides</h3>
        </div>
        <p className="text-white-50 mb-0">
          Wheelchair-accessible vehicles ready to take you directly to this venue.
        </p>
      </div>

      <div className="d-flex flex-column gap-3 gap-lg-4">
        {drivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} className="hover-lift" />
        ))}

        <div className="card border-0 rounded-4 overflow-hidden shadow-card hover-lift">
          <div className="position-relative" style={{ height: 200 }}>
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&h=300&fit=crop"
              alt="Map"
              className="w-100 h-100 object-fit-cover opacity-50"
              loading="lazy"
            />
            <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center gap-2">
              <div
                className="bg-white rounded-circle shadow d-flex align-items-center justify-content-center"
                style={{ width: 56, height: 56 }}
              >
                <Icon name="location_on" filled className="text-teal fs-3" />
              </div>
              <span className="badge bg-white bg-opacity-75 text-dark px-3 py-2 rounded-pill shadow-sm">
                View on map
              </span>
            </div>
          </div>
          <div className="card-body text-center py-3">
            <p className="fw-medium mb-0">Grand Central District</p>
            <small className="text-muted">0.8 mi from city center</small>
          </div>
        </div>
      </div>
    </>
  );
}