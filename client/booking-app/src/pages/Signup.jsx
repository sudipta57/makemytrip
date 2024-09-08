import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from "../redux/reducers/user";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    username: "",
    password: "",
    email: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const regex = /^(?=.*\d).{6,}$/;
    if (!regex.test(formdata.password)) {
      return toast.error(
        "Password must contain at least one number and be at least 6 characters long"
      );
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/signup",
        formdata
      );

      Cookies.set("authtoken", res.data.authtoken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      dispatch(setLogin(true));
      setformdata({
        username: "",
        password: "",
        email: "",
      });
      navigate("/");
      return toast.success(res.data.message);
    } catch (error) {
      return toast.error(error.response.data.message || "something went wrong");
    }
  };
  return (
    <>
      {/* <!-- Hero Area Start --> */}
      <div
        className="breadcumb-wrapper"
        style={{
          backgroundImage: "url('/assets/img/breadcumb/breadcumb-bg.jpg')",
        }}
      >
        <div className="container z-index-common">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Sign Up</h1>
            <div className="breadcumb-menu-wrap">
              <ul className="breadcumb-menu">
                <li>
                  <a href="index-2.html">Home</a>
                </li>
                <li>Sign Up</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Hero Area End -->

  <!-- Sign Up Area Start --> */}
      <div className="signup-wrapper  space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 ">
              <form
                action="#"
                className="signup-form bg-smoke"
                onSubmit={handlesubmit}
              >
                <h2 className="form-title text-center mb-lg-35">
                  Create an account
                </h2>
                <div className="form-group">
                  <label htmlFor="signUpUserName" className="sr-only">
                    Username
                  </label>
                  <input
                    value={formdata.username}
                    onChange={handlechange}
                    type="text"
                    className="form-control"
                    placeholder="Username*"
                    id="signUpUserName"
                    name="username"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signUpUserEmail" className="sr-only">
                    Email address
                  </label>
                  <input
                    value={formdata.email}
                    onChange={handlechange}
                    type="email"
                    className="form-control"
                    placeholder="Email address*"
                    id="signUpUserEmail"
                    name="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signUpUserPass" className="sr-only">
                    Password
                  </label>
                  <input
                    value={formdata.password}
                    onChange={handlechange}
                    type="password"
                    className="form-control"
                    placeholder="Password*"
                    id="signUpUserPass"
                    name="password"
                    required
                  />
                </div>
                <div className="form-group">
                  <input type="checkbox" name="signUpTerms" id="signUpTerms" />
                  <label htmlFor="signUpTerms">
                    I have read and agree to the website terms and conditions
                  </label>
                </div>
                <div className="form-group mb-0 text-center">
                  <button className="vs-btn w-100 style4" type="submit">
                    Register
                  </button>
                  <div className="bottom-links link-inherit pt-3">
                    <span>
                      Already have account?{" "}
                      <Link to={"/login"} className="text-theme">
                        <>Sign in</>
                      </Link>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Sign Up Area End --> */}
    </>
  );
};

export default Signup;
