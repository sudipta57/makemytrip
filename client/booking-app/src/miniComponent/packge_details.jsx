import { useState } from "react";
import { Link } from "react-router-dom";
import { tourPackages as packages } from "../component/HeroSection";

// const packages = [
//   {
//     id: 1,
//     imgSrc: "/public/assets/img/tours/tour-1-7.jpg",
//     title: "Discover Destinations",
//     location: "Las Vegas, Nevada",
//     days: 4,
//     people: 3,
//     price: 279,
//     rating: 3,
//   },
//   {
//     id: 2,
//     imgSrc: "/public/assets/img/tours/tour-1-2.jpg",
//     title: "Explore Our World",
//     location: "Las Vegas, Nevada",
//     days: 4,
//     people: 3,
//     price: 199,
//     rating: 3,
//   },
//   {
//     id: 3,
//     imgSrc: "/public/assets/img/tours/tour-1-3.jpg",
//     title: "Guided Adventures",
//     location: "Las Vegas, Nevada",
//     days: 2,
//     people: 4,
//     price: 399,
//     rating: 3,
//   },
//   {
//     id: 4,
//     imgSrc: "/public/assets/img/tours/tour-1-1.jpg",
//     title: "Peek Mountain View",
//     location: "Las Vegas, Nevada",
//     days: 4,
//     people: 3,
//     price: 299,
//     rating: 3,
//   },
//   {
//     id: 5,
//     imgSrc: "/public/assets/img/tours/tour-1-4.jpg",
//     title: "Relax With Beach View",
//     location: "Las Vegas, Nevada",
//     days: 4,
//     people: 3,
//     price: 259,
//     rating: 5,
//   },
//   {
//     id: 6,
//     imgSrc: "/public/assets/img/tours/tour-1-5.jpg",
//     title: "Relax With Beach View",
//     location: "Las Vegas, Nevada",
//     days: 4,
//     people: 3,
//     price: 299,
//     rating: 3,
//   },
//   {
//     id: 7,
//     imgSrc: "/public/assets/img/tours/tour-1-6.jpg",
//     title: "The Expedition Begins",
//     location: "Las Vegas, Nevada",
//     days: 4,
//     people: 3,
//     price: 209,
//     rating: 3,
//   },
//   {
//     id: 8,
//     imgSrc: "/public/assets/img/tours/tour-1-9.jpg",
//     title: "See World Differently",
//     location: "Las Vegas, Nevada",
//     days: 4,
//     people: 3,
//     price: 199,
//     rating: 3,
//   },
//   {
//     id: 9,
//     imgSrc: "/public/assets/img/tours/tour-1-8.jpg",
//     title: "Wanderlust Tours",
//     location: "Las Vegas, Nevada",
//     days: 4,
//     people: 3,
//     price: 299,
//     rating: 5,
//   },
// ];

const PackageDetails = () => {
  const [filter, setFilter] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([10, 75]);

  const filteredPackages = packages
    .filter((pkg) => {
      if (searchTerm) {
        return pkg.title.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .filter((pkg) => pkg.price >= priceRange[0] && pkg.price <= priceRange[1])
    .sort((a, b) => {
      if (filter === "name") {
        return a.title.localeCompare(b.title);
      } else if (filter === "date") {
        // Implement date sorting logic
      } else if (filter === "lowToHigh") {
        return a.price - b.price;
      } else if (filter === "highToLow") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <>
      <div
        className="breadcumb-wrapper"
        style={{
          backgroundImage:
            "url('/public/assets/img/breadcumb/breadcumb-bg.jpg')",
        }}
      >
        <div className="container z-index-common">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Tours</h1>
            <div className="breadcumb-menu-wrap">
              <ul className="breadcumb-menu">
                <li>
                  <a href="index-2.html">Home</a>
                </li>
                <li>Tours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="space-bottom">
        <div className="outer-wrap">
          <div className="filter-menu1 filter-menu-active wow fadeInUp wow-animated">
            <button className="tab-button" onClick={() => setFilter("name")}>
              <i className="fas fa-sort-alpha-up"></i> Name (A - Z)
            </button>
            <button className="tab-button" onClick={() => setFilter("date")}>
              <i className="fas fa-calendar-alt"></i> Date
            </button>
            <button
              className="tab-button"
              onClick={() => setFilter("lowToHigh")}
            >
              <i className="fas fa-upload"></i> Price Low to High
            </button>
            <button
              className="tab-button"
              onClick={() => setFilter("highToLow")}
            >
              <i className="fas fa-download"></i> Price High to Low
            </button>
          </div>

          <div className="container">
            <div className="shadow-content1">
              <div className="row">
                <div className="col-lg-9">
                  <div className="row filter-active tours-active">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="col-xl-4 col-lg-6 col-sm-6 filter-item"
                      >
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
                            <p className="package-text">{pkg.location}</p>
                            <div className="package-meta">
                              <a href="#">
                                <i className="fas fa-calendar-alt"></i> Days:{" "}
                                {pkg.days}
                              </a>
                              <a href="#">
                                <i className="fas fa-user"></i> People:{" "}
                                {pkg.people}
                              </a>
                            </div>
                            <div className="package-footer">
                              <span className="package-price">
                                ${pkg.price}
                              </span>
                              <Link
                                to={`/tour-details/${pkg.id}`}
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

                  <div className="vs-pagination pt-lg-2">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fas fa-chevron-left"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-chevron-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="sidebar-area tours-sidebar">
                    <div className="widget">
                      <h3 className="widget_title">Plan Your Trip</h3>
                      <p className="widget_text">
                        Donec rutrum congue leo elit In a eget malesuadga
                        blandit.
                      </p>
                      <form className="booking-form">
                        <div className="form-group">
                          <i className="fas fa-search"></i>
                          <input
                            type="text"
                            placeholder="Search Tour"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <i className="fas fa-compass"></i>
                          <input type="text" placeholder="Where To?" />
                        </div>
                        <div className="form-group">
                          <i className="fas fa-calendar-alt"></i>
                          <select className="form-select" name="month">
                            <option value="" disabled hidden>
                              Select Month
                            </option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <i className="fas fa-thumbtack"></i>
                          <select className="form-select" name="type">
                            <option value="" disabled hidden>
                              Select Type
                            </option>
                            <option value="Adventure">Adventure</option>
                            <option value="Combining">Combining</option>
                            <option value="Sporting">Sporting</option>
                            <option value="Domestic">Domestic</option>
                          </select>
                        </div>
                        <div className="price_slider_wrapper">
                          <h3 className="widget_title">Filter By Price</h3>
                          <input
                            type="range"
                            min="10"
                            max="95"
                            value={priceRange[1]}
                            onChange={(event) => {
                              const value = event.target.value;
                              setPriceRange([10, parseInt(value)]);
                            }}
                          />
                          <div className="price_label">
                            Price:{" "}
                            <span className="from">${priceRange[0]}</span> —{" "}
                            <span className="to">${priceRange[1]}</span>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="chekbox-area">
                            <input
                              type="radio"
                              id="popular"
                              name="fav_language"
                              value="popular"
                              defaultChecked
                            />
                            <label htmlFor="popular">Popular</label>
                          </div>
                          <div className="chekbox-area">
                            <input
                              type="radio"
                              id="trendy"
                              name="fav_language"
                              value="trendy"
                            />
                            <label htmlFor="trendy">Trendy</label>
                          </div>
                          <div className="chekbox-area">
                            <input
                              type="radio"
                              id="latest"
                              name="fav_language"
                              value="latest"
                            />
                            <label htmlFor="latest">Latest</label>
                          </div>
                        </div>
                        <button className="vs-btn style4 w-100">Search</button>
                      </form>
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

export default PackageDetails;
