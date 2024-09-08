import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSelectedHotel } from "../redux/reducers/booking";

export const TourPackageComponent = ({ tourPackages }) => {
  return (
    <div>
      <section
        className="space bg-light shape-mockup-wrap"
        data-bg-src="assets/img/shape/Bg.png"
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div
              className="col-xl-6 col-lg-8 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="title-area">
                <span className="sec-subtitle">Awesome Tours</span>
                <h2 className="sec-title h1">Best Holiday Package</h2>
                <p className="sec-text">
                  Curabitur aliquet quam id dui posuere blandit. Vivamus magna
                  justo, lacinia eget consectetur sed, convallis at tellus.
                  Vestibulum ac diam sit.
                </p>
              </div>
            </div>
          </div>
          <div
            className="row vs-carousel"
            data-slide-show="4"
            data-arrows="false"
            data-lg-slide-show="3"
            data-md-slide-show="2"
            data-sm-slide-show="1"
          >
            {tourPackages.map((pkg) => (
              <div key={pkg.id} className="col-xl-3 col-lg-6 col-sm-6">
                <div className="package-style1">
                  <div className="package-img">
                    <a href={pkg.bookingLink}>
                      <img
                        className="w-100"
                        src={pkg.imgSrc}
                        alt="Package Image"
                      />
                    </a>
                  </div>
                  <div className="package-content">
                    <div className="package-review">
                      {[...Array(pkg.reviewStars)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                      {[...Array(5 - pkg.reviewStars)].map((_, i) => (
                        <i key={i} className="far fa-star"></i>
                      ))}
                    </div>
                    <h3 className="package-title">
                      <a href={pkg.bookingLink}>{pkg.title}</a>
                    </h3>
                    <p className="package-text">{pkg.destination}</p>
                    <div className="package-meta">
                      <a href="#">
                        <i className="fas fa-calendar-alt"></i> Days: {pkg.days}
                      </a>
                      <a href="#">
                        <i className="fas fa-user"></i> People: {pkg.people}
                      </a>
                    </div>
                    <div className="package-footer">
                      <span className="package-price">${pkg.price}</span>
                      <Link
                        to={`tour-details/${pkg.id}`}
                        className="vs-btn style4"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center pt-lg-2">
            <Link to={"/package-details/"} className="vs-btn">
              View More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export const HotelComponent = () => {
  const { hotelData } = useSelector((state) => state.hoteldata);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (hotel) => {
    dispatch(setSelectedHotel(hotel));
    navigate(
      `/hotelcomponent/hotel-details/${hotel.hotel_id}/${hotel.checkin_date}/${hotel.checkout_date}/${hotel.adults_number}/${hotel.children_ages}`
    );
  };

  return (
    <div>
      <section
        className="space bg-light shape-mockup-wrap"
        data-bg-src="assets/img/shape/Bg.png"
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div
              className="col-xl-6 col-lg-8 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="title-area">
                <span className="sec-subtitle">Awesome Hotels</span>
                <h2 className="sec-title h1">Best Hotel Deals</h2>
                <p className="sec-text">
                  Curabitur aliquet quam id dui posuere blandit. Vivamus magna
                  justo, lacinia eget consectetur sed, convallis at tellus.
                  Vestibulum ac diam sit.
                </p>
              </div>
            </div>
          </div>
          <div
            className="row vs-carousel"
            data-slide-show="4"
            data-arrows="false"
            data-lg-slide-show="3"
            data-md-slide-show="2"
            data-sm-slide-show="1"
          >
            {hotelData.map((hotel) => {
              return (
                <div
                  key={hotel.hotel_id}
                  className="col-xl-3 col-lg-6 col-sm-6"
                >
                  <div className="package-style1">
                    <div className="package-img">
                      <a href="#">
                        <img
                          style={{
                            height: "200px",
                            width: "300px",
                            objectFit: "cover",
                          }}
                          className="w-100"
                          src={hotel.hotelImage}
                          alt="Hotel Image"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <div className="package-content">
                      <div className="package-review">
                        <span>{hotel.review_total} reviews</span>
                        <div className="stars">
                          {[...Array(Math.floor(hotel.review_score))].map(
                            (_, i) => (
                              <i key={i} className="fas fa-star"></i>
                            )
                          )}
                          {hotel.review_score % 1 !== 0 && (
                            <i className="fas fa-star-half-alt"></i>
                          )}
                        </div>
                      </div>
                      <h3 className="package-title">
                        <a href="#">{hotel.name}</a>
                      </h3>
                      <p className="package-text">{hotel.address}</p>

                      <div className="package-meta">
                        <a href="#">
                          <i className="fas fa-dollar-sign"></i>{" "}
                          {hotel.price_per_night}
                        </a>
                        <a href="#">
                          <i className="fas fa-info-circle"></i> per night
                        </a>
                      </div>
                      <div className="package-footer">
                        <button
                          onClick={() => handleSubmit(hotel)}
                          className="vs-btn style4"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center pt-lg-2">
            <Link to={"/hotel-details/"} className="vs-btn">
              View More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
