import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer
        className="footer-wrapper footer-layout1"
        // data-bg-src="/public/assets/img/bg/footer-bg.jpg"
        style={{
          backgroundImage: "url('/public/assets/img/bg/footer-bg.jpg')",
        }}
      >
        <div className="footer-top">
          <div className="shadow-color"></div>
          <div className="container">
            <div className="cta-style1">
              <div className="row g-5 align-items-center justify-content-between">
                <div className="col-lg-6">
                  <div className="cta-content">
                    <h2 className="cta-title">Ready to get started?</h2>
                    <p className="cta-text">
                      It only takes a few minutes to register your FREE Travolo
                      account.
                    </p>
                    <Link to={"/signup"} className="vs-btn style2">
                      Open An Account
                    </Link>
                  </div>
                </div>
                <div className="col-md-5 col-sm-6">
                  <div className="cta-image d-lg-block d-none">
                    <img
                      src="/public/assets/img/newsletter.png"
                      alt="CTA Image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="widget-area">
          <div className="container">
            <div className="row g-5 justify-content-between">
              <div className="col-md-6 col-xl-3">
                <div className="widget footer-widget">
                  <div className="vs-widget-about">
                    <div className="footer-logo">
                      <a href="index-2.html">
                        <img
                          src="/public/assets/img/white-logo.svg"
                          alt="Travolo"
                          className="logo"
                        />
                      </a>
                    </div>
                    <p className="footer-text">
                      Curabitur aliquet quam id dui bandit posuere blandit.
                      Vivamfdsus magna justo blandit aliquet.
                    </p>
                    <div className="social-style1">
                      <a href="#" target="_blank">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" target="_blank">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" target="_blank">
                        <i className="fab fa-pinterest-p"></i>
                      </a>
                      <a href="#" target="_blank">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-2">
                <div className="widget widget_nav_menu footer-widget">
                  <h3 className="widget_title">Useful Links</h3>
                  <div className="menu-all-pages-container">
                    <ul className="menu">
                      <li>
                        <a href="index-2.html">
                          <i className="far fa-angle-right"></i> Home
                        </a>
                      </li>
                      <li>
                        <a href="destinations.html">
                          <i className="far fa-angle-right"></i> Destinations
                        </a>
                      </li>
                      <li>
                        <a href="tours.html">
                          <i className="far fa-angle-right"></i> Tour
                        </a>
                      </li>
                      <li>
                        <a href="shop.html">
                          <i className="far fa-angle-right"></i> Shop
                        </a>
                      </li>
                      <li>
                        <a href="blog.html">
                          <i className="far fa-angle-right"></i> Blog
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3">
                <div className="widget footer-widget">
                  <h4 className="widget_title">Our Instagram</h4>
                  <div className="sidebar-gallery">
                    <a
                      href="/public/assets/img/footer/insta1.jpg"
                      className="popup-image"
                    >
                      <img
                        src="/public/assets/img/footer/insta1.jpg"
                        alt="Gallery Image"
                        className="w-100"
                      />
                    </a>
                    <a
                      href="/public/assets/img/footer/insta2.jpg"
                      className="popup-image"
                    >
                      <img
                        src="/public/assets/img/footer/insta2.jpg"
                        alt="Gallery Image"
                        className="w-100"
                      />
                    </a>
                    <a
                      href="/public/assets/img/footer/insta3.jpg"
                      className="popup-image"
                    >
                      <img
                        src="/public/assets/img/footer/insta3.jpg"
                        alt="Gallery Image"
                        className="w-100"
                      />
                    </a>
                    <a
                      href="/public/assets/img/footer/insta4.jpg"
                      className="popup-image"
                    >
                      <img
                        src="/public/assets/img/footer/insta4.jpg"
                        alt="Gallery Image"
                        className="w-100"
                      />
                    </a>
                    <a
                      href="/public/assets/img/footer/insta5.jpg"
                      className="popup-image"
                    >
                      <img
                        src="/public/assets/img/footer/insta5.jpg"
                        alt="Gallery Image"
                        className="w-100"
                      />
                    </a>
                    <a
                      href="/public//assets/img/footer/insta6.jpg"
                      className="popup-image"
                    >
                      <img
                        src="/public/assets/img/footer/insta6.jpg"
                        alt="Gallery Image"
                        className="w-100"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3">
                <div className="widget footer-widget">
                  <h4 className="widget_title">Subscribe</h4>
                  <form className="newsletter-form">
                    <p className="form_text">
                      Subscribe Our Newsletter For Getting Quick Updates
                    </p>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Your Email Address"
                    />
                    <button type="submit" className="vs-btn">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright-wrap">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-auto">
                <p className="copyright-text">
                  Copyright <i className="fal fa-copyright"></i>
                  <script>document.write(new Date().getFullYear())</script>{" "}
                  <a href="index-2.html">Travolo</a>. All Rights Reserved By{" "}
                  <a href="https://themeforest.net/user/vecuro">Vecuro</a>
                </p>
              </div>
              <div className="col-auto d-none d-lg-block">
                <div className="copyright-menu">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Privacy</a>
                    </li>
                    <li>
                      <a href="#">Terms & Conditions</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
