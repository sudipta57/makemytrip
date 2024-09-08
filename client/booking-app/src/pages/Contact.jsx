const Contact = () => {
  return (
    <div>
      {/* Hero area Start
	==============================--> */}
      <div
        className="breadcumb-wrapper"
        // data-bg-src="assets/img/breadcumb/breadcumb-bg.jpg"
        style={{
          backgroundImage: "url('assets/img/breadcumb/breadcumb-bg.jpg')",
        }}
      >
        <div className="container z-index-common">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Contact Us</h1>
            <div className="breadcumb-menu-wrap">
              <ul className="breadcumb-menu">
                <li>
                  <a href="index-2.html">Home</a>
                </li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!--==============================
	  Hero Area End
	==============================-->

  <!--==============================
	  Contact box Area Start
	==============================--> */}
      <section className="space contact-box_wrapper">
        <div className="outer-wrap">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="contact-box">
                  <div className="contact-box_icon">
                    <i className="fas fa-map-marked-alt"></i>
                  </div>
                  <h3 className="contact-box__title h5">Address</h3>
                  <p className="contact-box__text">
                    272 Rodney St, Brooklyn, East Houston Street New York City
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="contact-box">
                  <div className="contact-box_icon">
                    <i className="fas fa-address-card"></i>
                  </div>
                  <h3 className="contact-box__title h5">Contact</h3>
                  <ul className="contact-box_list">
                    <li>
                      Mobile: <a href="#123456789">123456789</a>
                    </li>
                    <li>
                      Hotline: <a href="#123456789">123456789</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="contact-box">
                  <div className="contact-box_icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h3 className="contact-box__title h5">Office Hour</h3>
                  <ul className="contact-box_list">
                    <li>Monday - Friday: 8:30 - 20:00</li>
                    <li>Saturday & Sunday: 9:30 - 21:30</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--==============================
	  Contact box Area End
	==============================-->

  <!--==============================
	  Contact Form Area End
	==============================--> */}
      <div className="space bg-light">
        <div className="container">
          <form
            className="ajax-contact"
            action="https://html.vecurosoft.com/mail.php"
            method="POST"
          >
            <div className="row justify-content-center text-center">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                <div className="title-area">
                  <span className="sec-subtitle">Contact Us</span>
                  <h2 className="sec-title h1">Get In Touch</h2>
                  <p className="sec-text">
                    Curabitur aliquet quam id dui posuere blandit. Vivamus magna
                    justo, lacinia eget consectetur sed, convgallis at tellus.
                    Vestibulum ac diam sit.
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6 form-group">
                <input
                  type="text"
                  placeholder="Enter Your First Name"
                  name="fname"
                  id="fname"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <input
                  type="text"
                  placeholder="Enter Your Last Name"
                  name="lname"
                  id="lname"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  id="email"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <input
                  type="number"
                  placeholder="Phone No"
                  name="number"
                  id="number"
                  className="form-control"
                />
              </div>

              <div className="form-group col-12">
                <textarea
                  placeholder="Write Your Comment"
                  name="message"
                  id="message"
                  className="form-control"
                ></textarea>
              </div>
              <div className="col-md-auto pt-lg-3">
                <button className="vs-btn style4" type="submit">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
