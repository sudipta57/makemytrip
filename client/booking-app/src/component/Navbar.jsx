import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setLogin } from "../redux/reducers/user";
const Navbar = () => {
  const { login } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("authtoken");
    dispatch(setLogin(false));
    navigate("/login");
  };

  return (
    <>
      {/* <!--==============================
    Mobile Menu
  ============================== --> */}
      <div className="vs-menu-wrapper">
        <div className="vs-menu-area text-center">
          <button className="vs-menu-toggle">
            <i className="fal fa-times"></i>
          </button>
          <div className="mobile-logo">
            <a href="index-2.html">
              <img src="/public/assets/img/logo.svg" alt="Travolo" />
            </a>
          </div>
          <div className="vs-mobile-menu">
            <ul>
              <li
                style={{
                  padding: "20px",
                }}
              >
                <i
                  className="fa-solid fa-plane homenav"
                  style={{ fontSize: "40px", color: "white" }}
                ></i>
                <a href="#">Flight</a>
              </li>
              <li
                style={{
                  padding: "20px",
                }}
              >
                <i
                  className="fa-solid fa-hotel homenav"
                  style={{ fontSize: "40px", color: "white" }}
                ></i>
                <a href="#">Hotels</a>
              </li>
              <li
                style={{
                  padding: "20px",
                }}
              >
                <i
                  className="fa-solid fa-house homenav"
                  style={{ fontSize: "40px", color: "white" }}
                ></i>
                <a href="#">Homestays</a>
              </li>
              <li
                style={{
                  padding: "20px",
                }}
              >
                <i
                  className="fa-solid fa-suitcase homenav"
                  style={{ fontSize: "40px", color: "white" }}
                ></i>
                <a href="#">Holiday plans</a>
              </li>
              <li
                style={{
                  padding: "20px",
                }}
              >
                <i
                  className="fa-solid fa-train homenav"
                  style={{ fontSize: "40px", color: "white" }}
                ></i>
                <a href="#">Train</a>
              </li>
            </ul>
            <ul>
              <li>
                <div className="header-btn">
                  <Link to={"/login"}>
                    <button>
                      <i className="fa-solid fa-right-to-bracket"></i>
                    </button>
                  </Link>
                  <button>
                    <Link to={"/signup"}>
                      <i className="fa-solid fa-user"></i>
                    </Link>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <!--==============================
      Header Area
    ==============================--> */}
      <header className="vs-header header-layout5 ">
        <div className="header-middle">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="vs-logo">
                  <Link to={"/"}>
                    <img src="/public/assets/img/logo.svg" alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="col-auto">
                <div className="items d-none d-lg-flex">
                  <div className="item2">
                    <div className="item2__icon">
                      <img
                        src="/public/assets/img/icons/loc-icon-1.svg"
                        alt="phone icon 1"
                      />
                    </div>
                    <div className="item2__text">
                      <a href="tel:+0207388561922">
                        Fifth Avenue 5501, Broadway, New York Morris Street.
                      </a>
                    </div>
                  </div>
                  <div className="item2">
                    <div className="item2__icon">
                      <img
                        src="/public/assets/img/icons/email-icon-1.svg"
                        alt="email icon 1"
                      />
                    </div>
                    <div className="item2__text">
                      <span>Envelop:</span>
                      <a href="mailto:info@travolo.com">info@travolo.com</a>
                    </div>
                  </div>
                  <div className="item2 d-none d-xl-flex">
                    <div className="item2__icon">
                      <img
                        src="/public/assets/img/icons/phone-icon-1.svg"
                        alt="phone icon 1"
                      />
                    </div>
                    <div className="item2__text">
                      <span>Phone:</span>
                      <a href="tel:+0207388561922">020 (7388) 5619 22</a>
                    </div>
                  </div>
                </div>
                <button className="vs-menu-toggle d-inline-block d-lg-none">
                  <i className="fal fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky-wrapper d-none d-lg-block">
          <div className="sticky-active">
            <div className="container position-relative z-index-common">
              <div className="header-box">
                <div className="row align-items-center">
                  <div className="col">
                    <nav className="main-menu  menu-style1 d-none d-lg-block">
                      <ul>
                        <li
                          style={{
                            padding: "20px",
                            cursor: "pointer",
                          }}
                        >
                          <Link to={"/"}>
                            <i
                              className="fa-solid fa-hotel"
                              style={{ fontSize: "40px", color: "white" }}
                            ></i>
                            <a>Hotel</a>
                          </Link>
                        </li>
                        <li
                          style={{
                            padding: "20px",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fa-solid fa-house"
                            style={{ fontSize: "40px", color: "white" }}
                          ></i>
                          <a>Homestays</a>
                        </li>
                        <li
                          style={{
                            padding: "20px",
                            cursor: "pointer",
                          }}
                        >
                          <Link to="/holiday">
                            <i
                              className="fa-solid fa-suitcase"
                              style={{ fontSize: "40px", color: "white" }}
                            ></i>
                            <a>Holiday Plan</a>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="col-auto">
                    <div className="header-right">
                      {login ? (
                        <ul>
                          <li>
                            <div className="header-btns">
                              <>
                                <Link to={"/order"}>
                                  <button>
                                    <i className="fa-solid fa-house-laptop"></i>
                                  </button>
                                </Link>
                                <button onClick={handleLogout}>
                                  <i className="fa-solid fa-right-to-bracket"></i>
                                </button>
                              </>
                            </div>
                          </li>
                        </ul>
                      ) : (
                        <ul>
                          <li>
                            <div className="header-btns">
                              <Link to={"/login"}>
                                <button>
                                  <i className="fa-solid fa-right-to-bracket"></i>
                                </button>
                              </Link>
                              <Link to={"/signup"}>
                                <button>
                                  <i className="fa-solid fa-user"></i>
                                </button>
                              </Link>
                            </div>
                          </li>
                          <li>
                            <Link to={"contact"} className="vs-btn style7">
                              Get in Touch
                              <i>
                                <svg
                                  width="5"
                                  height="8"
                                  viewBox="0 0 5 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.85355 4.35355C5.04882 4.15829 5.04882 3.84171 4.85355 3.64645L1.67157 0.464466C1.47631 0.269204 1.15973 0.269204 0.964466 0.464466C0.769204 0.659728 0.769204 0.976311 0.964466 1.17157L3.79289 4L0.964466 6.82843C0.769204 7.02369 0.769204 7.34027 0.964466 7.53553C1.15973 7.7308 1.47631 7.7308 1.67157 7.53553L4.85355 4.35355ZM4 4.5H4.5V3.5H4V4.5Z"
                                    fill="white"
                                  />
                                </svg>
                              </i>
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
