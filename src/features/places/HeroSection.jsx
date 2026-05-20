import Icon from "../../components/common/Icon";

export default function HeroSection({ place }) {
  return (
    <div className="row g-3 g-lg-4 mb-4 mb-lg-5">
      <div className="col-12 col-lg-7">
        <div
          className="position-relative overflow-hidden rounded-4 shadow-soft hover-lift"
          style={{ minHeight: "380px", maxHeight: "620px" }}
        >
          <img
            src={place.heroSrc}
            alt={place.heroAlt}
            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
            style={{ transition: "transform 0.5s" }}
            onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.35), transparent)",
              zIndex: 10,
            }}
          />
          <div
            className="position-absolute bottom-0 start-0 end-0 p-3 p-sm-4 p-lg-5"
            style={{ zIndex: 20 }}
          >
            <h1 className="text-white fw-extrabold display-4 display-lg-3 mb-2">
              {place.name}
            </h1>
            <p className="text-white-50 mb-0 d-flex align-items-center gap-2">
              <span>{place.district}</span>
              <span
                className="d-inline-block bg-teal rounded-circle"
                style={{ width: 6, height: 6 }}
              />
              <span className="badge bg-teal text-white">
                Fully Accessible
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <div className="d-flex flex-column gap-3 gap-lg-4 h-100">
          <div
            className="position-relative overflow-hidden rounded-4 shadow hover-lift flex-grow-1"
            style={{ minHeight: "180px" }}
          >
            <img
              src={place.secondarySrc1}
              alt={place.secondaryAlt1}
              className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
              style={{ transition: "transform 0.5s" }}
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
                zIndex: 10,
              }}
            />
            <span
              className="position-absolute bottom-0 start-0 m-3 badge bg-dark bg-opacity-50 text-white d-flex align-items-center gap-1"
              style={{ zIndex: 20 }}
            >
              <Icon name="elevator" className="me-1" />
              Accessible Elevator
            </span>
          </div>

          <div
            className="position-relative overflow-hidden rounded-4 shadow hover-lift flex-grow-1"
            style={{ minHeight: "180px" }}
          >
            <img
              src={place.secondarySrc2}
              alt={place.secondaryAlt2}
              className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
              style={{ transition: "transform 0.5s" }}
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
                zIndex: 10,
              }}
            />
            <span
              className="position-absolute bottom-0 start-0 m-3 badge bg-dark bg-opacity-50 text-white d-flex align-items-center gap-1"
              style={{ zIndex: 20 }}
            >
              <Icon name="local_parking" className="me-1" />
              Reserved Accessible Parking
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}