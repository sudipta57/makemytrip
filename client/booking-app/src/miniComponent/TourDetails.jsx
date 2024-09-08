import { useParams } from "react-router-dom";
import { tourPackages } from "../component/HeroSection";

const TourDetails = () => {
  const { tourid } = useParams();
  const tour = tourPackages.find((pkg) => {
    if (pkg.id === parseInt(tourid)) {
      return pkg;
    }
  });
  return (
    <>
      <div
        className="breadcumb-wrapper"
        // data-bg-src="assets/img/breadcumb/breadcumb-bg.jpg"
        style={{
          backgroundImage:
            "url('/public/assets/img/breadcumb/breadcumb-bg.jpg')",
        }}
      >
        <div className="container z-index-common">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Tour Booking</h1>
            <div className="breadcumb-menu-wrap">
              <ul className="breadcumb-menu">
                <li>
                  <a href="index-2.html">Home</a>
                </li>
                <li>Tours</li>
                <li>{tour.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section className="space-bottom">
        <div className="outer-wrap">
          <div className="filter-menu1 filter-menu-active wow fadeInUp wow-animated">
            <button className="tab-button active" data-filter=".tab-content1">
              <i className="fas fa-info-circle"></i>
              Information
            </button>
            <button className="tab-button" data-filter=".tab-content2">
              <i className="fas fa-calendar"></i> Tour Plan
            </button>
          </div>
          <div className="container">
            <div className="shadow-content1">
              <div className="row">
                <div className="col-lg-12">
                  <div className="filter-active tour-booking-active">
                    <div className="filter-item tab-content1">
                      <div className="info-image">
                        <img src={tour.imgSrc} alt="tours-img" />
                      </div>
                      <div className="tour-review">
                        <ul>
                          {Array.from({ length: tour.reviewStars }).map(
                            (_, i) => (
                              <li key={i}>
                                <i className="fas fa-star"></i>
                              </li>
                            )
                          )}
                          <li>({tour.reviewStars} Review)</li>
                        </ul>
                      </div>
                      <div className="row justify-content-between align-items-center">
                        <div className="col-md-6">
                          <h2 className="tab-title">{tour.title}</h2>
                        </div>
                        <div className="col-auto">
                          <p className="tour-price">
                            <strong>${tour.price}</strong> / Per Person
                          </p>
                        </div>
                      </div>
                      <p>
                        Praesent sapien massa, convallis a pellentesque nec,
                        egestas non nisi. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Donec sollicitudin molestie
                        porttitor lectus nibh. Nulla quis lorem ut libero
                        malesuada feugiat malesuada. Nulla porttitor lectus
                        nibh. Nulla quis lorem ut libero malesuada feugiat
                        porttitor accumsan tincidunt. Sed porttitor lectus nibh.
                        Nulla quis lorem ut libero malesuada feugiat. Nulla quis
                        lorem ut libero malesuada feugiat. Curabitur porttitor
                        lectus nibh. Nulla quis lorem ut libero malesuada
                        feugiat aliquet quam id dui posuere blandit. Nulla quis
                        lorem ut libero malesuada feugiat malesuada. Nulla
                        porttitor lectus nibh.
                      </p>
                      <table className="infolist">
                        <tr>
                          <td className="info-heading">Destination</td>
                          <td className="info">{tour.destination}</td>
                        </tr>
                        <tr>
                          <td className="info-heading">Departure</td>
                          <td className="info">{tour.departure}</td>
                        </tr>
                        <tr>
                          <td className="info-heading">Departure Time</td>
                          <td className="info">{tour.departureTime}</td>
                        </tr>
                        <tr>
                          <td className="info-heading">Age Restriction</td>
                          <td className="info">{tour.ageRestriction}</td>
                        </tr>
                        <tr>
                          <td className="info-heading">Dress Code</td>
                          <td className="info">{tour.dressCode}</td>
                        </tr>
                        <tr>
                          <td className="info-heading">Service Included</td>
                          <td>
                            <table className="sub-infolist">
                              <tr>
                                {tour.serviceIncluded?.map((service, i) => (
                                  <td className="info" key={i}>
                                    {service}
                                  </td>
                                ))}
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td className="info-heading">Service Not Included</td>
                          <td>
                            <table className="sub-infolist">
                              <tr>
                                {tour.serviceNotIncluded?.map((service, i) => (
                                  <td className="info" key={i}>
                                    {service}
                                  </td>
                                ))}
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td className="info-heading">Return Time</td>
                          <td className="info">{tour.returnTime}</td>
                        </tr>
                      </table>
                    </div>
                    <div className="filter-item tab-content2">
                      <h2 className="tab-title">Tour Plan </h2>
                      <div className="tour-plan">
                        <span className="tour-card1">01</span>
                        <h4 className="tp-title">Day 1: Departure</h4>
                        <p className="tp-text">
                          Cras ultricies ligula sed magna dictum porta. Lorem
                          ipsum dolor sit amet, consectetur adipiscing elit.
                          Mauris blandit aliquet elit, eget tincidunt nibh
                          pulvinar a. Pellentesque in ipsum id orci porta
                          dapibus. Curabitur aliquet quam id dui posuere
                          blangdit. Mauris blandit aliquet elit, eget tincidunt
                          nibh pulvinar.
                        </p>
                        <ul className="tp-list">
                          <li>5 Star Accgommodation</li>
                          <li>Airport Transfer</li>
                          <li>Breakfast</li>
                          <li>Personal Guide</li>
                        </ul>
                      </div>
                      <div className="tour-plan">
                        <span className="tour-card1">02</span>
                        <h4 className="tp-title">
                          Day 2: Visiting The Yosemite National Park, The
                          Disneyland Resort
                        </h4>
                        <p className="tp-text">
                          Cras ultricies ligula sed magna dictum porta. Lorem
                          ipsum dolor sit amet, consectetur adipiscing elit.
                          Mauris blandit aliquet elit, eget tincidunt nibh
                          pulvinar a. Pellentesque in ipsum id orci porta
                          dapibus. Curabitur aliquet quam id dui posuere
                          blangdit. Mauris blandit aliquet elit, eget tincidunt
                          nibh pulvinar.
                        </p>
                        <ul className="tp-list">
                          <li>5 Star Accgommodation</li>
                          <li>Airport Transfer</li>
                          <li>Breakfast</li>
                          <li>Personal Guide</li>
                        </ul>
                      </div>
                      <div className="tour-plan">
                        <span className="tour-card1">03</span>
                        <h4 className="tp-title">Day 3: Historical Tour</h4>
                        <p className="tp-text">
                          Cras ultricies ligula sed magna dictum porta. Lorem
                          ipsum dolor sit amet, consectetur adipiscing elit.
                          Mauris blandit aliquet elit, eget tincidunt nibh
                          pulvinar a. Pellentesque in ipsum id orci porta
                          dapibus. Curabitur aliquet quam id dui posuere
                          blangdit. Mauris blandit aliquet elit, eget tincidunt
                          nibh pulvinar.
                        </p>
                        <ul className="tp-list">
                          <li>5 Star Accgommodation</li>
                          <li>Airport Transfer</li>
                          <li>Breakfast</li>
                          <li>Personal Guide</li>
                        </ul>
                      </div>
                      <div className="tour-plan">
                        <span className="tour-card1">04</span>
                        <h4 className="tp-title">Day 4: Rest And Return</h4>
                        <p className="tp-text">
                          Cras ultricies ligula sed magna dictum porta. Lorem
                          ipsum dolor sit amet, consectetur adipiscing elit.
                          Mauris blandit aliquet elit, eget tincidunt nibh
                          pulvinar a. Pellentesque in ipsum id orci porta
                          dapibus. Curabitur aliquet quam id dui posuere
                          blangdit. Mauris blandit aliquet elit, eget tincidunt
                          nibh pulvinar.
                        </p>
                        <ul className="tp-list">
                          <li>5 Star Accgommodation</li>
                          <li>Airport Transfer</li>
                          <li>Breakfast</li>
                          <li>Personal Guide</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourDetails;
